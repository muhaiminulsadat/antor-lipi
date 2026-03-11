import {getJournalEntryById} from "@/actions/journal.action";
import {formatDistanceToNow, format} from "date-fns";
import {Calendar, Clock, Folder} from "lucide-react";
import {notFound} from "next/navigation";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import EntryContentWrapper from "./_components/EntryContentWrapper";
import DeleteEntryButton from "./_components/DeleteEntryButton";
import EditButton from "./_components/EditButton";

const moodEmoji = {
  happy: "😊",
  sad: "😢",
  anxious: "😰",
  calm: "😌",
  angry: "😠",
  grateful: "🙏",
  excited: "🤩",
  tired: "😴",
};

const JournalEntryPage = async ({params}) => {
  const {journalId} = await params;
  const {data: entry, success} = await getJournalEntryById(journalId);

  if (!success || !entry) return notFound();

  const timeAgo = formatDistanceToNow(new Date(entry.createdAt), {
    addSuffix: true,
  });
  const fullDate = format(new Date(entry.createdAt), "MMMM d, yyyy");
  const fullTime = format(new Date(entry.createdAt), "h:mm a");
  const emoji = moodEmoji[entry.mood?.toLowerCase()] ?? "📝";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="flex flex-wrap items-center gap-2">
          {entry.mood && (
            <Badge
              variant="secondary"
              className="rounded-full px-3 py-1 text-[11px] tracking-wide capitalize gap-1.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15"
            >
              {emoji} {entry.mood}
            </Badge>
          )}
          {entry.moodScore && (
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-[11px] tracking-wide border-border/60 text-muted-foreground gap-1"
            >
              Score: {entry.moodScore}
              <span className="text-muted-foreground/40">/10</span>
            </Badge>
          )}
          {entry.collectionId && (
            <Link href={`/collections/${entry.collectionId}`}>
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-[11px] tracking-wide border-primary/20 text-primary/70 bg-primary/5 hover:bg-primary/10 transition-colors gap-1.5 cursor-pointer"
              >
                <Folder size={10} />
                View Collection
              </Badge>
            </Link>
          )}
        </div>

        <div className="flex gap-3">
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-foreground leading-snug">
            {entry.title}
          </h1>
          <div className="flex items-center gap-2">
            <EditButton entryId={journalId} />
            <DeleteEntryButton entryId={entry._id} entryTitle={entry.title} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <div className="flex items-center gap-1.5">
            <Calendar size={11} className="text-muted-foreground/40" />
            <span className="text-[11px] sm:text-xs text-muted-foreground/50">
              {fullDate}
            </span>
          </div>
          <div className="hidden sm:block h-3 w-px bg-border/50" />
          <div className="flex items-center gap-1.5">
            <Clock size={11} className="text-muted-foreground/40" />
            <span className="text-[11px] sm:text-xs text-muted-foreground/50">
              {fullTime}
            </span>
          </div>
          <div className="hidden sm:block h-3 w-px bg-border/50" />
          <span className="text-[11px] sm:text-xs text-muted-foreground/40 italic">
            {timeAgo}
          </span>
        </div>

        <Separator className="opacity-30" />
      </div>

      <EntryContentWrapper key={entry._id} content={entry.content} />
    </div>
  );
};

export default JournalEntryPage;
