"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export default function MainHeader() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const logoSrc = isDark ? "/images/logo-white.png" : "/images/logo-black.png";
    const logoAlt = isDark ? "The swift cart logo white" : "The swift cart logo black";

    return (
        <div className="md:flex">
            <Image
                src={logoSrc}
                alt={logoAlt}
                width={40}
                height={56}
                priority
            />
        </div>
    )
}

