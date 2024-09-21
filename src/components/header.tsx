import { CircleUser, Menu, Package2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import HeaderAuth from "./header-auth";
import { HeaderNavigationMenu } from "./header-navigation-menu";
import LanguageSwitcher from "./switches/language-switcher";
import ModeSwitcher from "./switches/mode-switcher";
import ThemeSwitcher from "./switches/theme-switcher";

export const description =
    "A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings.";

export function Header() {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <HeaderNavigationMenu />

                {/* <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Dashboard
                </Link>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Orders
                </Link>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Products
                </Link>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Customers
                </Link>
                <Link href="#" className="text-foreground transition-colors hover:text-foreground">
                    Settings
                </Link> */}
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            Dashboard
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            Orders
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            Products
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            Customers
                        </Link>
                        <Link href="#" className="hover:text-foreground">
                            Settings
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full ">
                <div className="ml-auto flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <ModeSwitcher />
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                    <HeaderAuth />
                </div>
            </div>
        </header>
    );
}
