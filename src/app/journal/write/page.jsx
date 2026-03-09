"use client";

import {useEffect, useRef, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";
import {Loader, FolderPlus} from "lucide-react";
import MoodSelector from "./_components/MoodSelector";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import {useNotLoggedIn} from "@/hooks/auth.hook";
import {getMoodById} from "@/lib/utils";
import {createJournal} from "@/actions/journal.action";
import CreateCollectionDialog from "@/components/CreateCollection";
import {getCollections} from "@/actions/collection.action";

const JournalEditor = dynamic(() => import("./_components/JournalEditor"), {
  ssr: false,
});

const mockCollections = [
  {_id: "1", name: "Morning Thoughts"},
  {_id: "2", name: "Work Journal"},
  {_id: "3", name: "Gratitude Log"},
];

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [collectionDialogOpen, setCollectionDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const [collections, setCollections] = useState([]);

  useNotLoggedIn();

  useEffect(() => {
    const fetchCollections = async () => {
      const res = await getCollections();
      if (res.success) {
        setCollections(res.data);
      } else {
        toast.error(res.error || "Failed to load collections.");
      }
    };

    fetchCollections();
  }, [collectionDialogOpen]);

  const handleCollectionChange = (value) => {
    if (value === "new") {
      setCollectionDialogOpen(true);
      return;
    }
    setCollectionId(value);
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      toast.error("Please add a title.");
      return;
    }
    if (!mood) {
      toast.error("Please select your mood.");
      return;
    }

    const content = editorRef.current?.document;
    const gotMood = getMoodById(mood.toUpperCase());

    if (!gotMood) {
      toast.error("Invalid mood selected.");
      return;
    }

    const entry = {
      title,
      mood,
      moodScore: gotMood.score,
      content: JSON.stringify(content),

      ...(collectionId && {collectionId}),
    };

    try {
      setLoading(true);
      const res = await createJournal(entry);

      if (!res?.success) {
        toast.error(res?.error || "Failed to publish entry.");
        return;
      }

      setTitle("");
      setMood("");
      setCollectionId("");
      editorRef.current.replaceBlocks(editorRef.current.document, [
        {type: "paragraph", content: ""},
      ]);
      toast.success("Entry published!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full px-4 py-28 md:py-32">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-[9px] uppercase tracking-[0.3em] text-primary">
            New Entry
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            What&apos;s on your{" "}
            <span className="italic text-primary">mind?</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            This is your space. Write freely, honestly, beautifully.
          </p>
        </div>

        <Separator className="opacity-20" />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label className="text-xs tracking-widest uppercase text-muted-foreground">
              Title
            </Label>
            <Input
              placeholder="Give your entry a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl bg-background/50 border-border/50 focus:border-primary/50 text-sm h-11"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-xs tracking-widest uppercase text-muted-foreground">
              How are you feeling?
            </Label>
            <MoodSelector value={mood} onChange={setMood} />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-xs tracking-widest uppercase text-muted-foreground">
              Collection{" "}
              <span className="normal-case tracking-normal text-muted-foreground/50">
                (optional)
              </span>
            </Label>
            <Select value={collectionId} onValueChange={handleCollectionChange}>
              <SelectTrigger className="w-full rounded-xl bg-background/50 border-border/50 focus:border-primary/50 text-sm">
                <SelectValue placeholder="Add to a collection..." />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {collections.map((col) => (
                  <SelectItem key={col._id} value={col._id} className="text-sm">
                    {col.name}
                  </SelectItem>
                ))}
                <SelectSeparator />
                <SelectItem
                  value="new"
                  className="text-sm px-4 py-2 text-primary"
                >
                  <span className="flex items-center gap-2">
                    <FolderPlus size={13} />
                    <span>Create new collection</span>
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-xs tracking-widest uppercase text-muted-foreground">
              Your Thoughts
            </Label>
            <JournalEditor editorRef={editorRef} />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handlePublish}
            disabled={loading}
            className="rounded-full px-8 text-xs tracking-widest uppercase shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 gap-2"
          >
            {loading ? (
              <>
                <Loader size={14} className="animate-spin" /> Publishing...
              </>
            ) : (
              "Publish Entry"
            )}
          </Button>
        </div>
      </div>

      <CreateCollectionDialog
        open={collectionDialogOpen}
        onOpenChange={setCollectionDialogOpen}
        setCollectionId={setCollectionId}
      />
    </div>
  );
}
