"use client";

import {useRef, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {Loader, Send} from "lucide-react";
import MoodSelector from "./_components/MoodSelector";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import {useNotLoggedIn} from "@/hooks/auth.hook";
import {getMoodById} from "@/lib/utils";
import {createJournal} from "@/actions/journal.action";

const JournalEditor = dynamic(() => import("./_components/JournalEditor"), {
  ssr: false,
});

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");
  const editorRef = useRef(null);

  const [loading, setLoading] = useState(false);

  useNotLoggedIn();

  const handlePublish = async () => {
    if (!title.trim()) {
      toast.error("Please add a title.");
      return;
    }
    if (!mood) {
      toast.error("Please select your mood.");
      return;
    }

    setLoading(true);

    const content = editorRef.current?.document;

    const gotMood = getMoodById(mood.toUpperCase());

    if (!gotMood) {
      toast.error("Invalid mood selected.");
      setLoading(false);
      return;
    }

    const entry = {
      title,
      mood,
      moodScore: gotMood.score,
      content: JSON.stringify(content),
    };
    try {
      const res = await createJournal(entry);

      if (!res?.success) {
        toast.error(res?.error || "Failed to publish entry.");
        setLoading(false);
        return;
      }
      setLoading(false);
      setTitle("");
      setMood("");
      editorRef.current.replaceBlocks(editorRef.current.document, [
        {type: "paragraph", content: ""},
      ]);
      toast.success("Entry ready! Check console.");
    } catch (error) {
      toast.error(error.message);
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
              Your Thoughts
            </Label>
            <JournalEditor editorRef={editorRef} />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handlePublish}
            className="rounded-full px-8 text-xs tracking-widest uppercase shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" /> Publishing...
              </>
            ) : (
              " Publish Entry"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
