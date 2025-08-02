import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useContext } from "react";
import { EntryContext } from "../context/EntryContext";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

import EditEntryDialog from "./EditEntryDialog";
import DeleteEntryDialog from "./DeleteEntryDialog";

const EntriesTable = () => {
    const entryCtx = useContext(EntryContext);

    const { entries, loading, loadingMore, error, loadMoreEntries, hasMore } =
        entryCtx;
    const { handleScroll } = useInfiniteScroll({
        loading: loadingMore,
        hasMore,
        onLoadMore: loadMoreEntries,
        threshold: 100,
    });
    return (
        <div
            className="relative h-[400px] w-full overflow-y-auto border rounded-md"
            onScroll={handleScroll}
        >
            <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Director</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Year/Time</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading && entries.data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center h-32">
                                Loading...
                            </TableCell>
                        </TableRow>
                    ) : error ? (
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                className="text-center text-red-500 h-32"
                            >
                                {error}
                            </TableCell>
                        </TableRow>
                    ) : entries.data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center h-32">
                                No entries found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        <>
                            {entries.data.map((entry) => (
                                <TableRow key={entry.id}>
                                    <TableCell className="font-medium">
                                        {entry.title}
                                    </TableCell>
                                    <TableCell>{entry.type}</TableCell>
                                    <TableCell>{entry.director}</TableCell>
                                    <TableCell>{entry.budget}</TableCell>
                                    <TableCell>{entry.location}</TableCell>
                                    <TableCell>{entry.duration}</TableCell>
                                    <TableCell>{entry.yearTime}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <EditEntryDialog entry={entry} />
                                            <DeleteEntryDialog
                                                entryId={entry.id}
                                                entryTitle={entry.title}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {loadingMore && (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="text-center py-4"
                                    >
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                            <span>Loading more...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                            {!hasMore && entries.data.length > 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="text-center py-4 text-muted-foreground"
                                    >
                                        No more entries to load
                                    </TableCell>
                                </TableRow>
                            )}
                        </>
                    )}
                </TableBody>
            </Table>
            {/* <ScrollBar orientation="horizontal" /> */}
        </div>
    );
};
export default EntriesTable;
