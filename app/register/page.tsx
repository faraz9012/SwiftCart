import SignUp from "@/components/public/signup-form";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <div className="w-full h-dvh lg:grid lg:grid-cols-2">
      <div className="hidden bg-muted lg:block relative bg-black">
        <Image
          src="/images/register.webp"
          alt="An image of a blue and white planet with swirling clouds of white and beige. The planet is the foreground and takes up most of the image. In the background, there are many other celestial bodies, including other planets and stars."
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          priority
        />
        <div className="absolute inset-0 bg-zinc-900 opacity-65 dark:opacity-10"></div>
        <div className="absolute top-8 p-4 text-white z-20 flex items-center text-2xl font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-6 w-6"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path></svg>Swift Cart
        </div>
        <div className="absolute bottom-8 text-white z-20 p-4">
          <blockquote className="space-y-2">
            <p className="text-lg">“This library has saved me countless hours of work and helped me deliver stunning designs to my clients faster than ever before.”</p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid p-4 gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Let&apos;s create you an account</h1>
            <p className="text-balance text-muted-foreground">
              It&apos;ll just take a few seconds and you&apos;ll be all set
            </p>
          </div>
          <SignUp />
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}
