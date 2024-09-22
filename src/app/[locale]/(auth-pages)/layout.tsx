export default async function Layout({ children }: { children: React.ReactNode }) {
    return <div className="flex gap-12 items-center justify-center h-full">{children}</div>;
}
