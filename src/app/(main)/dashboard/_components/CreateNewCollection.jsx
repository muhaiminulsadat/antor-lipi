"use client";

import CreateCollectionDialog from "@/components/CreateCollection";
import {Plus} from "lucide-react";
import {useState} from "react";

export default function CreateCollectionFolder() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full cursor-pointer select-none text-left"
      >
        <div className="relative flex flex-col w-full">
          {/* Folder Tab — matches CollectionFolder */}
          <div className="w-20 h-4 rounded-tl-lg rounded-tr-2xl bg-muted-foreground/20 group-hover:bg-primary/30 transition-all duration-300 ml-3" />

          {/* Folder Body — matches CollectionFolder */}
          <div className="rounded-tr-2xl rounded-bl-2xl rounded-br-2xl rounded-tl-none border border-dashed border-border/50 bg-card/60 backdrop-blur-sm group-hover:border-primary/40 group-hover:bg-primary/5 group-hover:shadow-lg group-hover:shadow-primary/5 group-hover:-translate-y-0.5 transition-all duration-300 p-4 flex flex-col items-center justify-center gap-3 min-h-[140px]">
            {/* Plus Icon */}
            <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-muted-foreground/30 bg-background text-muted-foreground group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
              <Plus
                size={18}
                className="transition-transform duration-300 group-hover:rotate-90"
              />
            </div>

            <span className="text-xs tracking-widest uppercase text-muted-foreground/50 group-hover:text-primary transition-colors duration-300">
              New Collection
            </span>
          </div>
        </div>
      </button>

      <CreateCollectionDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
