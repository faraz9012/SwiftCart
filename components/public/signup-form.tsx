'use client';

import Link from "next/link";

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

const formSchema = z.object({
    email: z.string().email({
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
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    return (
        <>
            <div className="mx-auto grid p-4 gap-6">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Register</h1>
                    <p className="text-balance text-muted-foreground">
                        Enter your email below to login to your account
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="on">
                        <div className="grid gap-4">
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
                            <div className="md:flex md:justify-start md:items-center text-sm ">
                            <span>Having trouble logging in?&nbsp;</span>
                                <Link
                                    href="/forgot-password"
                                    className="underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                </Form>

                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </>
    )
}