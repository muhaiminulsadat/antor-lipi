"use client";

import {Folder, FileText, Clock} from "lucide-react";
import Link from "next/link";
import {formatDistanceToNow} from "date-fns";

export default function CollectionFolder({name, entries, collection}) {
  const timeAgo = collection?.createdAt
    ? formatDistanceToNow(new Date(collection.createdAt), {addSuffix: true})
    : "recently";

  return (
    <Link
      href={`/collection/${name === "Unorganized" ? "unorganized" : (collection?._id ?? "unorganized")}`}
      className="group block"
    >
      <div className="relative flex flex-col max-w-md cursor-pointer">
        {/* Folder Tab */}
        <div className="w-20 h-4 rounded-tl-lg rounded-tr-2xl bg-primary/30 group-hover:bg-primary/50 transition-all duration-300 ml-3" />

        {/* Folder Body */}
        <div className="relative rounded-tr-2xl rounded-bl-2xl rounded-br-2xl rounded-tl-none border border-border/50 bg-card/60 backdrop-blur-sm group-hover:border-primary/40 group-hover:bg-card/80 group-hover:shadow-lg group-hover:shadow-primary/5 group-hover:-translate-y-0.5 transition-all duration-300 p-4 flex flex-col gap-3">
          {/* Folder Icon + Name */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center shrink-0">
              <Folder size={15} className="text-primary" />
            </div>
            <h3 className="font-serif text-base font-medium text-foreground group-hover:text-primary transition-colors duration-300 truncate">
              {name}
            </h3>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/40" />

          {/* Latest Entries */}
          <div className="flex flex-col gap-1.5">
            {entries?.length > 0 ? (
              entries.slice(0, 2).map((entry, i) => (
                <div key={i} className="flex items-center gap-2">
                  <FileText
                    size={11}
                    className="text-muted-foreground/50 shrink-0"
                  />
                  <span className="text-xs text-muted-foreground truncate">
                    {entry.title}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground/40 italic">
                No entries yet...
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1.5">
              <Clock size={11} className="text-muted-foreground/40" />
              <span className="text-[10px] text-muted-foreground/50">
                {timeAgo}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground/50 bg-muted/40 px-2 py-0.5 rounded-full">
              {entries?.length ?? 0}{" "}
              {entries?.length === 1 ? "entry" : "entries"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
