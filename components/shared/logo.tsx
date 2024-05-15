import Image from "next/image";

export default function MainHeader() {
    return (
        <div className="md:flex">
            <Image
                src="/images/logo-black.png"
                alt="The swift cart logo black"
                className="dark:hidden"
                width={40}
                height={56}
                priority
            />
            <Image
                src="/images/logo-white.png"
                alt="The swift cart logo white"
                className="hidden dark:block"
                width={40}
                height={56}
                priority
            />
        </div>
    )
}

