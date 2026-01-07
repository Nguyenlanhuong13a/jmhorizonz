export default function CatchAllPage() {
    return (
        <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
            <h1 className="font-heading uppercase tracking-tighter mb-4 opacity-10" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>404</h1>
            <h2 className="text-2xl font-heading uppercase mb-2">Protocol Broken</h2>
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-12">The requested access point does not exist or has been archived.</p>

            <div className="border border-black p-12 bg-neutral-50 max-w-md">
                <h2 className="text-xl font-heading uppercase mb-2">Coming Soon: Drop 02</h2>
                <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-8">Neural node synchronization in progress.</p>
                <button
                    onClick={() => window.location.href = '/shop'}
                    className="w-full border border-black py-4 bg-black text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                    Return to Grid Central
                </button>
            </div>
        </main>
    );
}
