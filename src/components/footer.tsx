export default function Footer() {
    return (
        <div className="flex flex-col items-center">
            <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
            <footer className="w-full flex items-center justify-center mx-auto text-center text-xs">
                <p>
                    Powered by{" "}
                    <a
                        href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                        target="_blank"
                        className="font-bold hover:underline"
                        rel="noreferrer"
                    >
                        Supabase
                    </a>{" "}
                    and{" "}
                    <a href="https://nextjs.org" target="_blank" className="font-bold hover:underline" rel="noreferrer">
                        Next.js
                    </a>
                </p>
            </footer>
        </div>
    );
}
