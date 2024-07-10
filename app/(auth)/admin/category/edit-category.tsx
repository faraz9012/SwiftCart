import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,SheetDescription } from "@/components/ui/sheet";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FileUpload } from "@/components/shared/file-upload";
import { Category } from "./columns";
import { Edit } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "This field is required." }),
  desc: z.string(),
  slug: z.string().min(1, {message: "This field can't be empty"}),
  image: z.string(),
  parentCategoryId: z.number().default(0),
  published: z.boolean().default(false),
});

export default function EditCategoryButton({ categoryToEdit }: { categoryToEdit: Category }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: categoryToEdit.name,
      slug: categoryToEdit.slug,
      desc: categoryToEdit.description,
      image: categoryToEdit.image,
      parentCategoryId: categoryToEdit.parentCategoryId,
      published: categoryToEdit.published === 0 ? true : false,
    },
  });

  const resetFormValues = () => {
    form.reset();
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // const response = await createCategory(values);
    // if (response) {
    //  if (response.success) {
    //    toast.success(response.message);
    //  } else {
    //    toast.error(response?.message);
    //  }
    // }
  }

  return (
    <Sheet>
      <SheetTrigger asChild onClick={resetFormValues}>
        <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3">
          <Edit className="size-4" />
        </div>
      </SheetTrigger>
      <SheetContent side="fullScreen">
        <SheetHeader>
          <SheetTitle>Edit: {categoryToEdit.name}</SheetTitle>
          <SheetDescription>Make changes to your category here. Click save when you're done.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4" autoComplete="on">
            <div className="grid gap-4">
              <div className="grid lg:grid-cols-1 gap-2">
                <div className="grid gap-2">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Electronics" {...field} autoComplete="name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid gap-2">
                  <FormField control={form.control} name="slug" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Electronics" {...field} autoComplete="slug" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid lg:grid-cols-2 gap-2">
                  <div className="grid">
                    <FormField control={form.control} name="desc" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Description about the category" className="resize-none" {...field} autoComplete="desc" rows={5} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                </div>
                <div className="grid text-center">
                  <FormField control={form.control} name="image" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload image</FormLabel>
                      <FormControl>
                        <FileUpload id="categoryImageUpload" field={field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid">
                  <FormField control={form.control} name="published" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex justify-between">Publish</FormLabel>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <Button type="submit" className="w-full lg:w-2/4 mx-auto">Create</Button>
              </div>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
