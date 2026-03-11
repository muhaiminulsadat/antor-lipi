export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8">
      {/* Animated quill / ink drop */}
      <div className="relative flex items-center justify-center">
        {/* Outer pulse ring */}
        <span className="absolute inline-flex h-20 w-20 rounded-full bg-primary/20 animate-ping" />
        {/* Inner glyph */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-card/60 backdrop-blur-sm border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/10">
          <span className="font-serif italic text-2xl text-primary select-none">
            A
          </span>
        </div>
      </div>

      {/* Animated dots */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary/60"
            style={{
              animation: "bounce 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Label */}
      <p className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/50">
        Loading
      </p>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
