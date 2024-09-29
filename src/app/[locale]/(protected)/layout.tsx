import { redirect } from "@/i18n/routing";

import { createClient } from "@/utils/supabase/server";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    return <>{children}</>;
}
