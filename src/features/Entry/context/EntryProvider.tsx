import { useState, useCallback, useEffect } from "react";
import { EntryContext } from "./EntryContext";
import { Entry } from "@/features/Entry/types/Entry";
import { entityService } from "@/features/Entry/services/entity.service";
import { CreateEntrySchema, Pagination, UpdateEntrySchema } from "../services";

export const EntryProvider = ({ children }: { children: React.ReactNode }) => {
    const [entries, setEntries] = useState<{
        data: Entry[];
        pagination: Pagination;
    }>({
        data: [],
        pagination: { limit: 10, page: 1, total: 100, totalPages: 10 },
    });
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getEntries = async (page: number = 1, reset: boolean = true) => {
        if (page === 1) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }
        setError(null);

        try {
            const data = await entityService.getEntries({ page });

            if (reset || page === 1) {
                setEntries({ data: data.data, pagination: data.pagination });
            } else {
                setEntries((prev) => ({
                    data: [...prev.data, ...data.data],
                    pagination: data.pagination,
                }));
            }
        } catch (err: any) {
            setError(err?.message || "Failed to fetch entries");
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };
    const loadMoreEntries = async () => {
        const currentPage = entries.pagination.page;
        const totalPages = entries.pagination.totalPages;

        if (currentPage < totalPages && !loadingMore) {
            await getEntries(currentPage + 1, false);
        }
    };

    const createEntry = async (entry: CreateEntrySchema) => {
        setLoading(true);
        setError(null);
        try {
            const newEntry = await entityService.createEntry(entry);
            setEntries((prev) => ({
                ...prev,
                data: [newEntry, ...prev.data],
            }));
        } catch (err: any) {
            setError(err?.message || "Failed to create entry");
        } finally {
            setLoading(false);
        }
    };
    const updateEntry = async (entry: UpdateEntrySchema) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await entityService.updateEntry({ ...entry });
            setEntries((prev) => ({
                ...prev,
                data: prev.data.map((e) => (e.id === entry.id ? updated : e)),
            }));
        } catch (err: any) {
            setError(err?.message || "Failed to update entry");
        } finally {
            setLoading(false);
        }
    };

    const deleteEntry = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await entityService.deleteEntry({ id });
            setEntries((prev) => ({
                ...prev,
                data: prev.data.filter((e) => e.id !== id),
            }));
        } catch (err: any) {
            setError(err?.message || "Failed to delete entry");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getEntries();
    }, []);

    return (
        <EntryContext.Provider
            value={{
                entries,
                loading,
                loadingMore,
                error,
                getEntries,
                createEntry,
                updateEntry,
                deleteEntry,
                loadMoreEntries,
                hasMore:
                    entries.pagination.page < entries.pagination.totalPages,
            }}
        >
            {children}
        </EntryContext.Provider>
    );
};
