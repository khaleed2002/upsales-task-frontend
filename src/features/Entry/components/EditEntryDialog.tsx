import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { UpdateEntrySchema, updateEntrySchema } from "../services";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { entryTypes, Entry } from "../types/Entry";
import { useContext, useState } from "react";
import { EntryContext } from "../context/EntryContext";
import { Pencil } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface EditEntryDialogProps {
    entry: Entry; // Pass the full entry object to pre-fill the form
}

const EditEntryDialog = ({ entry }: EditEntryDialogProps) => {
    const entryCtx = useContext(EntryContext);
    const [open, setOpen] = useState(false);

    // Note: Assuming your UpdateEntrySchema is similar to CreateEntrySchema
    const form = useForm<UpdateEntrySchema>({
        resolver: zodResolver(updateEntrySchema),
        // Pre-fill the form with the existing entry data
        defaultValues: {
            id: entry.id,
            title: entry.title,
            type: entry.type,
            director: entry.director,
            budget: entry.budget,
            location: entry.location,
            duration: entry.duration,
            yearTime: entry.yearTime,
            description: entry.description || undefined,
        },
    });

    function onSubmit(values: UpdateEntrySchema) {
        if (!entryCtx) return;
        // The ID is already in the values from the defaultValues
        entryCtx.updateEntry(values);
        setOpen(false); // Close the dialog on successful submission
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="mb-2">
                    <DialogTitle className="text-2xl font-bold text-primary">
                        Edit Entry
                    </DialogTitle>
                </DialogHeader>
                {/* Reusing the same form structure */}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] px-1"
                    >
                        {/* All your FormField components go here, just like in CreateEntryDialog */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-base text-primary">
                                        Type
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex flex-col gap-4 w-full"
                                        >
                                            {entryTypes.map((entryType) => {
                                                return (
                                                    <FormItem
                                                        key={entryType}
                                                        className="flex items-center w-full"
                                                    >
                                                        <RadioGroupItem
                                                            value={entryType}
                                                            id={entryType}
                                                        />
                                                        <FormLabel
                                                            className="font-normal w-full"
                                                            htmlFor={entryType}
                                                        >
                                                            {entryType}
                                                        </FormLabel>
                                                    </FormItem>
                                                );
                                            })}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="yearTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-base text-primary">
                                        Year
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from(
                                                    { length: 200 },
                                                    (_, i) => {
                                                        const year = (
                                                            new Date().getFullYear() -
                                                            i
                                                        ).toString();
                                                        return (
                                                            <SelectItem
                                                                key={year}
                                                                value={year}
                                                            >
                                                                {year}
                                                            </SelectItem>
                                                        );
                                                    }
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="budget"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-base text-primary">
                                        Budget
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-base text-primary">
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="director"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-base text-primary">
                                        Director
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-base text-primary">
                                        Duration
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-base text-primary">
                                        Location
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditEntryDialog;
