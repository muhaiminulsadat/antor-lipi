import {getCollectionById} from "@/actions/collection.action";
import {
  getEntriesByCollectionId,
  getUnorganizedEntries,
} from "@/actions/journal.action";
import DeleteButton from "./_components/DeleteButton";
import {Folder, FileText, Clock} from "lucide-react";
import {formatDistanceToNow} from "date-fns";
import Link from "next/link";
import EntryCard from "./_components/EntryCard";

const Collection = async ({params}) => {
  const {collectionId} = await params;

  const {data: collection} = await getCollectionById(collectionId);
  let {data: entries} = (await getEntriesByCollectionId(collectionId)) || {
    data: [],
  };
  const {data: unorganizedEntries} = await getUnorganizedEntries();

  if (collectionId === "unorganized") {
    entries = unorganizedEntries;
  }

  const timeAgo = collection?.createdAt
    ? formatDistanceToNow(new Date(collection.createdAt), {addSuffix: true})
    : null;

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Folder size={18} className="text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-light text-foreground">
                {collection?.name ? collection?.name : "Unorganized"}
              </h1>
              {timeAgo && (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock size={11} className="text-muted-foreground/40" />
                  <p className="text-xs text-muted-foreground/50">
                    Created {timeAgo}
                  </p>
                </div>
              )}
            </div>
          </div>
          {collectionId !== "unorganized" && (
            <DeleteButton
              collectionName={collection?.name}
              collectionId={collectionId}
            />
          )}{" "}
        </div>

        {collection?.description && (
          <p className="text-sm text-muted-foreground max-w-xl">
            {collection.description}
          </p>
        )}

        <div className="h-px bg-border/40" />
      </div>

      {/* Entries */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-xs tracking-widest uppercase text-muted-foreground">
            {entries.length ?? 0} {entries?.length === 1 ? "Entry" : "Entries"}
          </p>
          <Link
            href="/journal/write"
            className="text-xs tracking-widest uppercase text-primary hover:underline underline-offset-4 transition-all"
          >
            + New Entry
          </Link>
        </div>

        <EntryCard entries={entries} />
      </div>
    </div>
  );
};

export default Collection;
