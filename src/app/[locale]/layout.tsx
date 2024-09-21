import "../globals.css";
import clsx from "clsx";
import { GeistSans } from "geist/font/sans";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";

import Footer from "@/components/footer";
import { Header } from "@/components/header";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Batch Management System",
    description: "Manage incoming and outgoing batches with ease. Developed for Richter Glutenfreie Backwaren.",
};

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();

    return (
        <html lang={locale} className={clsx(GeistSans.className, "h-full")} suppressHydrationWarning>
            <body className="bg-background text-foreground h-full relative">
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        <Header />
                        <div className="h-[80vh]">{children}</div>
                        <Footer />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
