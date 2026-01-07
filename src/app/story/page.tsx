export default function StoryPage() {
    return (
        <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-[6vw] font-heading uppercase tracking-tighter mb-4">The Manifest</h1>
            <div className="w-24 h-[1px] bg-black mb-8" />
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 mb-12 max-w-md">
                Exploring the intersection of brutalist architecture and functional high-fashion.
            </p>
            <div className="border border-black p-12 bg-neutral-50">
                <h2 className="text-xl font-heading uppercase mb-2">Coming Soon: Drop 02</h2>
                <p className="font-mono text-[10px] uppercase tracking-widest opacity-40">System Node: Offline</p>
            </div>
        </main>
    );
}
