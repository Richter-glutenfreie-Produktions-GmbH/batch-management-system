import { type NextRequest } from "next/server";

import { handleI18nRouting } from "@/utils/i18n/middleware";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
    let response = await handleI18nRouting(request);
    await updateSession(request);
    return response;
}

export const config = {
    matcher: ["/", "/(de|en)/:path*"],
};
