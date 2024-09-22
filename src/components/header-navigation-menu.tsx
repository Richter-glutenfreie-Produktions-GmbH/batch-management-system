"use client";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Croissant, Fingerprint, ScrollText, Wheat } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function HeaderNavigationMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItemDynamic type="ingredients" icon={<Wheat className="h-6 w-6" />} />
                <NavigationMenuItemDynamic type="products" icon={<Croissant className="h-6 w-6" />} />
                <NavigationMenuItemDynamic type="recipes" icon={<ScrollText className="h-6 w-6" />} />
                <NavigationMenuItemDynamic type="batches" icon={<Fingerprint className="h-6 w-6" />} />
                {/* <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Documentation</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem> */}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

interface NavigationMenuItemDynamicProps {
    type: "ingredients" | "products" | "recipes" | "batches";
    icon: React.ReactNode;
}

const NavigationMenuItemDynamic: React.FC<NavigationMenuItemDynamicProps> = ({ type, icon }) => {
    const t = useTranslations("header.navigation");

    return (
        <NavigationMenuItem>
            <NavigationMenuTrigger>{t(`${type}.title`)}</NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                        <NavigationMenuLink asChild>
                            <Link
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href={`/${type}`}
                            >
                                {icon}
                                <div className="mb-2 mt-4 text-lg font-medium">{t(`${type}.overview.title`)}</div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                    {t(`${type}.overview.description`)}
                                </p>
                            </Link>
                        </NavigationMenuLink>
                    </li>
                    <ListItem href={`/${type}/list`} title={t(`${type}.list.title`)}>
                        {t(`${type}.list.description`)}
                    </ListItem>
                    <ListItem href={`/${type}/create`} title={t(`${type}.create.title`)}>
                        {t(`${type}.create.description`)}
                    </ListItem>
                    <ListItem href={`/${type}/edit`} title={t(`${type}.edit.title`)}>
                        {t(`${type}.edit.description`)}
                    </ListItem>
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
    );
};

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
    ({ className, href, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <Link
                        ref={ref}
                        href={href!}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className,
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                    </Link>
                </NavigationMenuLink>
            </li>
        );
    },
);
ListItem.displayName = "ListItem";
