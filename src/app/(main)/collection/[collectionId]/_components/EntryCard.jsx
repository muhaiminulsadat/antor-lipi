import {formatDistanceToNow} from "date-fns";
import {FileText} from "lucide-react";
import Link from "next/link";


const EntryCard = ({entries}) => {

  
  return (
    <div>
      {entries?.length > 0 ? (
        <div className="flex flex-col gap-3">
          {entries.map((entry) => (
            <Link
              key={entry._id}
              href={`/journal/${entry._id}`}
              className="group flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/40 hover:bg-card/80 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <FileText size={13} className="text-primary" />
              </div>
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                  {entry.title}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-muted-foreground/50 capitalize">
                    {entry.mood}
                  </span>
                  <span className="text-[10px] text-muted-foreground/30">
                    •
                  </span>
                  <span className="text-[10px] text-muted-foreground/50">
                    {formatDistanceToNow(new Date(entry.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-12 h-12 rounded-2xl bg-muted/40 flex items-center justify-center">
            <FileText size={20} className="text-muted-foreground/30" />
          </div>
          <p className="text-sm text-muted-foreground/50 italic">
            No entries in this collection yet.
          </p>
          <Link
            href="/journal/write"
            className="text-xs tracking-widest uppercase text-primary hover:underline underline-offset-4 transition-all"
          >
            Write your first entry
          </Link>
        </div>
      )}
    </div>
  );
};
export default EntryCard;
