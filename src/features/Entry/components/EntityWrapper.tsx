import { EntryProvider } from "../context/EntryProvider";
import CreateEntryDialog from "./CreateEntryDialog";
import EntriesTable from "./EntriesTable";

const EntityWrapper = () => {
    return (
        <EntryProvider>
            <div className="flex-1 px-14 pt-4 flex flex-col gap-4">
                <CreateEntryDialog />
                <EntriesTable />
            </div>
        </EntryProvider>
    );
};

export default EntityWrapper;
