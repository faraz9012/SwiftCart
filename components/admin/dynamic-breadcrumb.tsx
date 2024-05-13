"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";

export default function DynamicBreadcrumb() {
    
    const pathname = usePathname();
    const [segments, setSegments] = useState([] as string[]);
    useEffect(()=>{
       var segment = pathname.split("/").filter((item) => item !== "");
           setSegments(segment);
    }, [pathname]);
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
                        <span key={segment} className="inline-flex items-center gap-1.5">
                            <BreadcrumbItem >
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
                        </span>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
            )}
        </>
    )
}