import { signOutAction } from "@/app/actions";
import { Link } from "@/i18n/routing";
import { CircleUser, Menu, Package2 } from "lucide-react";

import { createClient } from "@/utils/supabase/server";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function AuthButton() {
    const {
        data: { user },
    } = await createClient().auth.getUser();

    return user ? (
        <div className="flex items-center gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <CircleUser className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <form action={signOutAction}>
                <Button type="submit" variant={"outline"}>
                    Sign out
                </Button>
            </form>
        </div>
    ) : (
        <div className="flex gap-4">
            <Button asChild variant={"outline"}>
                <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild variant={"default"}>
                <Link href="/sign-up">Sign up</Link>
            </Button>
        </div>
    );
}
