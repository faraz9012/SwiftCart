'use client';

import Link from "next/link";
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Register } from "@/lib/auth-actions/auth-action";
import { toast } from "sonner";

const formSchema = z.object({
    firstName: z.string().min(1, {
        message: "First name is required."
    }),
    lastName: z.string().min(1, {
        message: "Last name is required."
    }),
    email: z.string().min(1, {
        message: "email is required."
    })
        .email({
            message: "Not a valid email",
        }),
    password: z.string().min(1, {
        message: "Password is required."
    }),
})

export default function SignUp() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        },
    })
    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await Register(values);
        if(response) {
            if (response.success) {
                toast.success(response.message);
                router.push("/");
    
            }
            else {
                toast.error(response?.message);
            }
        }
    }
    return (
        <>
            <div className="mx-auto grid p-4 gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Let’s create you an account</h1>
                    <p className="text-balance text-muted-foreground">
                        It'll just take a few seconds and you'll be all set
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="on">
                        <div className="grid gap-4">
                            <div className="grid lg:grid-cols-2 gap-2">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First name</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="John" {...field} autoComplete="firstName" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last name</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="Smith" {...field} autoComplete="lastName" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="admin@yourstore.com" {...field} autoComplete="email" />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                We'll never share your email with anyone else.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex justify-between">
                                                Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} autoComplete="password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>

                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Register
                            </Button>
                        </div>
                    </form>
                </Form>

                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </>
    )
}