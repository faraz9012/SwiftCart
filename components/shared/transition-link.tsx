"use client";
import Link, { LinkProps } from 'next/link';
import React, { ReactNode, forwardRef } from 'react';
import { useRouter } from "next/navigation";

interface TransitionLinkProps extends LinkProps {
    children: ReactNode;
    href: string;
    className: string;
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
    ({ children, href, className, ...props }, ref) => {
        const router = useRouter();

        const handleTransition = async (
            e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
        ) => {
            e.preventDefault();

            const body = document.querySelector("body");
            body?.classList.add("page-transition");
            await sleep(400);

            router.push(href);

            await sleep(400);

            body?.classList.remove("page-transition");
        };

        return (
            <Link
                href={href}
                {...props}
                className={className}
                onClick={handleTransition}
                ref={ref}
            >
                {children}
            </Link>
        );
    }
);

TransitionLink.displayName = 'TransitionLink';

export default TransitionLink;
