import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { CreateEntrySchema, createEntrySchema } from "../services";
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
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { entryTypes } from "../types/Entry";
import { useContext, useState } from "react";
import { EntryContext } from "../context/EntryContext";
const CreateEntryDialog = () => {
    const entryCtx = useContext(EntryContext);
    const [open, setOpen] = useState(false);
    const form = useForm<CreateEntrySchema>({
        resolver: zodResolver(createEntrySchema),
        defaultValues: {
            budget: "0$",
            description: "",
            director: "",
            duration: "",
            location: "",
            title: "",
            type: "MOVIE",
            yearTime: new Date().getFullYear().toString(),
        },
    });
    function onSubmit(values: CreateEntrySchema) {
        if (!entryCtx) return;
        entryCtx.createEntry(values);
        form.reset();
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer w-fit">Add Entry</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="mb-2">
                    <DialogTitle className="text-2xl font-bold text-primary">
                        Create New Entry
                    </DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground">
                        Fill in the details below to add a new entry to your
                        table.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] px-1"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-base text-primary">
                                        Title
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
                                <Button>Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Add</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
export default CreateEntryDialog;
