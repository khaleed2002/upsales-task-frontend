import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EntryContext } from "../context/EntryContext";
import { Trash2 } from "lucide-react";
import { useContext } from "react";

interface DeleteEntryDialogProps {
    entryId: string;
    entryTitle: string;
}

const DeleteEntryDialog = ({ entryId, entryTitle }: DeleteEntryDialogProps) => {
    const entryCtx = useContext(EntryContext);

    if (!entryCtx) return null;

    const handleDelete = () => {
        entryCtx.deleteEntry(entryId);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the entry for{" "}
                        <span className="font-semibold">"{entryTitle}"</span>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteEntryDialog;
