"use client";

import {useMemo} from "react";
import {useCreateBlockNote} from "@blocknote/react";
import {BlockNoteView} from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

export default function EntryContent({content}) {
  const parsedContent = useMemo(() => {
    try {
      return content ? JSON.parse(content) : undefined;
    } catch {
      return undefined;
    }
  }, [content]);

  const editor = useCreateBlockNote({
    initialContent: parsedContent,
    editable: false,
  });

  const theme = {
    colors: {
      editor: {
        background: "transparent",
        text: "hsl(var(--foreground))",
      },
      tooltip: {
        background: "hsl(var(--card))",
        text: "hsl(var(--foreground))",
      },
      hovered: {
        background: "hsl(var(--muted))",
      },
      selected: {
        background: "hsl(var(--primary))",
      },
      border: "hsl(var(--border))",
    },
  };

  return (
    <div className="w-full rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden">
      <BlockNoteView
        editor={editor}
        editable={false}
        className="py-3"
        theme={theme}
      />
    </div>
  );
}
