import NextLogo from "@/components/next-logo";
import SupabaseLogo from "@/components/supabase-logo";

export default function Imprint() {
    return (
        <div className="flex flex-col gap-16 items-center justify-center h-full">
            <div className="flex gap-8 justify-center items-center">
                <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    rel="noreferrer"
                >
                    <SupabaseLogo />
                </a>
                <span className="border-l rotate-45 h-6" />
                <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
                    <NextLogo />
                </a>
            </div>
        </div>
    );
}
