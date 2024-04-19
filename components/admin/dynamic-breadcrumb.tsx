"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function DynamicBreadcrumb() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter((item) => item !== "");
    const shouldShowBreadcrumb = segments.length > 1;

    const getLinkUrl = (currentIndex: number) => {
        if (currentIndex === 0) {
            return '/admin';
        } else {
            return `/${segments.slice(0, currentIndex).join('/')}`;
        }
    };

    return (
        <>
           {shouldShowBreadcrumb &&(
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    {segments.map((segment, index) => (
                        <>
                            <BreadcrumbItem key={index}>
                                {index === segments.length - 1 ? (
                                    <BreadcrumbPage> {segment.charAt(0).toUpperCase() + segment.slice(1)}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={getLinkUrl(index)}>
                                            { segment=== 'admin' ? 'Dashboard' : segment.charAt(0).toUpperCase() + segment.slice(1)}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {index < segments.length - 1 && <BreadcrumbSeparator />}
                        </>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
            )}
        </>
    )
}