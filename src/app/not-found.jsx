import Link from "next/link";
import {ArrowLeft} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[500px] md:h-[500px] rounded-full bg-primary/[8%] blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-sm">
        <p className="text-7xl uppercase tracking-[0.3em] text-primary">404</p>

        <h1 className="font-serif text-6xl md:text-8xl font-light text-foreground leading-none">
          Page not <br />
          <span className="italic text-primary">found.</span>
        </h1>

        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
          The page you are looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back.
        </p>

        <Link
          href="/"
          className="flex items-center gap-2 rounded-full px-8 py-2.5 text-xs tracking-widest uppercase bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 mt-2"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
