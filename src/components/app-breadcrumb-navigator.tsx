"use client";

import * as changeCase from "change-case";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbItem = {
    name: string;
    href?: string;
    isLast: boolean;
};

function generateBreadcrumb(pathname: string | null): BreadcrumbItem[] {
    if (!pathname || pathname === "/" || pathname.split("/").length <= 2) {
        return [
            {
                name: "Dashboard",
                isLast: true,
            },
        ];
    }

    let items: BreadcrumbItem[] = [];

    let slugs = pathname.split("/");

    for (let i = 2; i < slugs.length; i++) {
        items.push({
            name: changeCase.capitalCase(slugs[i]),
            href: !(slugs.length === i + 1) ? slugs.slice(0, i + 1).join("/") : undefined,
            isLast: !(slugs.length === i + 1),
        });
    }

    return items;
}

export default function AppBreadcrumbNavigator() {
    const pathname = usePathname();
    const breadcrumbItems = generateBreadcrumb(pathname);

    console.log(breadcrumbItems);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbItems.map((item) => (
                    <Fragment key={item.name}>
                        <BreadcrumbItem key={item.name} className={item.isLast ? "hidden md:block" : ""}>
                            {item.href ? (
                                <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>{item.name}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {!item.isLast && <BreadcrumbSeparator className="hidden md:block" />}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
