import { createContext } from "react";
import { Entry } from "@/features/Entry/types/Entry";
import { CreateEntrySchema, Pagination, UpdateEntrySchema } from "../services";

export type EntryContextType = {
    entries: { data: Entry[]; pagination: Pagination };
    loading: boolean;
    loadingMore: boolean;
    error: string | null;
    getEntries: () => Promise<void>;
    createEntry: (entry: CreateEntrySchema) => Promise<void>;
    updateEntry: (entry: UpdateEntrySchema) => Promise<void>;
    deleteEntry: (id: string) => Promise<void>;
    loadMoreEntries: () => Promise<void>;
    hasMore: boolean;
};

export const EntryContext = createContext<EntryContextType>({
    entries: {
        data: [],
        pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
        },
    },
    loading: false,
    loadingMore: false,
    error: null,
    getEntries: async () => {},
    createEntry: async () => {},
    updateEntry: async () => {},
    deleteEntry: async () => {},
    loadMoreEntries: async () => {},
    hasMore: false,
});
