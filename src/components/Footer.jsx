import {HeartIcon} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-8 flex items-center justify-center bg-primary/5">
      <p className="flex items-center gap-1.5 text-base text-muted-foreground/70 font-bold tracking-wide">
        Made with
        <HeartIcon size={14} className="text-primary fill-primary" />
        by <span className="text-foreground/80">Sadat the Handsome</span>
      </p>
    </footer>
  );
}
