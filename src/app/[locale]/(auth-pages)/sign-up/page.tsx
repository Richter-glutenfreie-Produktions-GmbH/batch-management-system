import { signUpAction } from "@/app/actions";
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

export default function Signup({ searchParams }: { searchParams: Message }) {
    const t = useTranslations("authPages.signUp");

    if ("message" in searchParams) {
        return (
            <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
                <FormMessage message={searchParams} />
            </div>
        );
    }

    return (
        <form className="flex flex-col mx-auto">
            <Card className="mx-auto w-96">
                <CardHeader>
                    <CardTitle className="text-2xl">{t("title")}</CardTitle>
                    <CardDescription>{t("explanation")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">{t("firstName")}</Label>
                                <Input
                                    id="first-name"
                                    name="first-name"
                                    placeholder={t("firstNamePlaceholder")}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">{t("lastName")}</Label>
                                <Input
                                    id="last-name"
                                    name="last-name"
                                    placeholder={t("lastNamePlaceholder")}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">{t("email")}</Label>
                            <Input id="email" type="email" name="email" placeholder={t("emailPlaceholder")} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">{t("password")}</Label>
                            <Input id="password" name="password" type="password" required minLength={6} />
                        </div>
                        <FormMessage message={searchParams} />
                        <SubmitButton formAction={signUpAction} pendingText={t("pendingText")} className="w-full">
                            {t("submit")}
                        </SubmitButton>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        {t("haveAccount")}{" "}
                        <Link href="/sign-in" className="underline">
                            {t("haveAccountLink")}
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
