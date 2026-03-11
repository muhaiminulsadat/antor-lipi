"use client";

import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";

export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();

  const href = pathname.includes("collection");
  const label = pathname.includes("collection")
    ? "Back to Dashboard"
    : "Go Back";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => (href ? router.push("/dashboard") : router.back())}
      className="rounded-full gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground mb-6"
    >
      <ArrowLeft size={14} />
      {label}
    </Button>
  );
}
