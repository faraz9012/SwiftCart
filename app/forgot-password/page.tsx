import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full h-dvh lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid p-4 gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email and we will send you a reset link.
            </p>
          </div>
          <form className="space-y-4" autoComplete="on">
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@yourstore.com"
                autoComplete="email"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send reset link
            </Button>
          </form>
          <div className="text-center text-sm">
            Remembered your password?{" "}
            <Link href="/login" className="underline">
              Back to login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative bg-black">
        <Image
          src="/images/login.webp"
          alt="A captivating mosaic of leaves, their veins and edges forming a mesmerizing pattern."
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          priority
        />
        <div className="absolute inset-0 bg-zinc-900 opacity-65 dark:opacity-10"></div>
        <div className="absolute top-8 p-4 text-white z-20 flex items-center text-2xl font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-6 w-6"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path></svg>Swift Cart
        </div>
      </div>
    </div>
  );
}
