import { signInAction } from "@/app/actions";
import { Link, routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export async function generateStaticParams() {
    const locales = routing.locales;
    return locales.map((locale) => ({ locale }));
}

export default function Login({ searchParams }: { searchParams: Message }) {
    const t = useTranslations("authPages.signIn");

    return (
        <form className="flex flex-col mx-auto">
            <Card className="mx-auto w-96">
                <CardHeader>
                    <CardTitle className="text-2xl">{t("title")}</CardTitle>
                    <CardDescription>{t("explanation")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">{t("email")}</Label>
                            <Input id="email" type="email" name="email" placeholder={t("emailPlaceholder")} required />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">{t("password")}</Label>
                                <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                                    {t("forgotPassword")}
                                </Link>
                            </div>
                            <Input id="password" type="password" name="password" required />
                        </div>
                        <FormMessage message={searchParams} />
                        <SubmitButton pendingText={t("pendingText")} formAction={signInAction} className="w-full">
                            {t("submit")}
                        </SubmitButton>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        {t("noAccount")}{" "}
                        <Link href="/sign-up" className="underline">
                            {t("noAccountLink")}
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
