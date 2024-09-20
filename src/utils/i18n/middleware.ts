import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";

export const handleI18nRouting = createMiddleware(routing);
