"use client";

import { Check, ChevronsUpDown, CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FileUpload } from "@/components/shared/file-upload";
import { Category } from "./columns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { createCategory } from "./actions";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "This field is required."
    }),
    desc: z.string(),
    image: z.string(),
    parentCategoryId: z.number().default(0),
    published: z.boolean().default(false),
})

export default function AddCategoryButton({ categories }: { categories: Category[] }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            desc: "",
            image: "",
            parentCategoryId: 0,
            published: false
        },
    });

    const resetFormValues = () => {
        form.reset();
      };
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await createCategory(values);
        if (response) {
            if (response.success) {
                toast.success(response.message);
                resetFormValues();
            }
            else {
                toast.error(response?.message);
            }
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild onClick={resetFormValues}>
                <Button>
                    <CirclePlus className="mr-2" />
                    Add new
                </Button>
            </SheetTrigger>
            <SheetContent side="fullScreen">
                <SheetHeader>
                    <SheetTitle>Create category</SheetTitle>
                    <SheetDescription>
                        Make changes to your category here. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4" autoComplete="on">
                        <div className="grid gap-4">
                            <div className="grid lg:grid-cols-1 gap-2">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="Electronics" {...field} autoComplete="name" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid lg:grid-cols-2 gap-2">
                                    <div className="grid">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Slug</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="electronics" {...field} autoComplete="name" readOnly disabled />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid">
                                        <FormField
                                            control={form.control}
                                            name="parentCategoryId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Parent category</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    className={cn(
                                                                        "w-full justify-between",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value
                                                                        ? categories.find(
                                                                            (category) => category.id === field.value
                                                                        )?.name
                                                                        : "Select category"}
                                                                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="p-0">
                                                            <Command>
                                                                <CommandInput placeholder="Search categories..." />
                                                                <CommandEmpty>No result(s) found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    <CommandList>
                                                                        {categories.filter((item)=>item.parentCategoryId===0).map((category) => (
                                                                            <CommandItem
                                                                                value={(category.id).toString()}
                                                                                key={category.name}
                                                                                onSelect={() => {
                                                                                    form.setValue("parentCategoryId", category.id)
                                                                                }}
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        "mr-2 size-4",
                                                                                        category.id === field.value
                                                                                            ? "opacity-100"
                                                                                            : "opacity-0"
                                                                                    )}
                                                                                />
                                                                                {category.name}
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandList>
                                                                </CommandGroup>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="desc"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Description about the category"
                                                        className="resize-none"
                                                        {...field}
                                                        autoComplete="desc"
                                                        rows={5}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid text-center">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Upload image</FormLabel>
                                            <FormControl>
                                                <FileUpload id="categoryImageUpload" {...field} field={field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid">
                                <FormField
                                    control={form.control}
                                    name="published"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex justify-between">
                                                Publish
                                            </FormLabel>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>

                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full lg:w-2/4 mx-auto">
                                Create
                            </Button>
                        </div>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}
