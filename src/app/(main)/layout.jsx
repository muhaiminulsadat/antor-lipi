import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import Link from "next/link";

const layout = ({children}) => {
  return (
    <main className="min-h-screen px-4 md:px-8 pt-24 pb-12 max-w-5xl mx-auto">
      <Link href="/">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft size={14} />
          Go Back
        </Button>
      </Link>
      <div className="w-full">{children}</div>
    </main>
  );
};

export default layout;
