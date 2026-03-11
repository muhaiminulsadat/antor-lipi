"use client";

import {useCreateBlockNote} from "@blocknote/react";
import {BlockNoteView} from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Code,
  Undo2,
  Redo2,
} from "lucide-react";
import {useEffect} from "react";

const editorTheme = {
  colors: {
    editor: {
      text: "#1c1c1c",
      background: "transparent",
    },
    menu: {
      text: "#1c1c1c",
      background: "#ffffff",
    },
    tooltip: {
      text: "#1c1c1c",
      background: "#f5f5f5",
    },
    hovered: {
      text: "#1c1c1c",
      background: "#f5f0ee",
    },
    selected: {
      text: "#ffffff",
      background: "#c2440c",
    },
    disabled: {
      text: "#999999",
      background: "#eeeeee",
    },
    shadow: "#00000015",
    border: "#e8d5cc",
    sideMenu: "#c2440c",
    highlights: {
      gray: {text: "#9b9b9b", background: "#f5f5f5"},
      brown: {text: "#64473a", background: "#f9f0e8"},
      red: {text: "#c2440c", background: "#fdecea"},
      orange: {text: "#d9730d", background: "#fdf3e7"},
      yellow: {text: "#dfab01", background: "#fdf8e1"},
      green: {text: "#0f7b6c", background: "#e8f7f4"},
      blue: {text: "#0b6e99", background: "#e5f3fb"},
      purple: {text: "#6940a5", background: "#f3eff9"},
      pink: {text: "#ad1a72", background: "#fce8f3"},
    },
  },
  borderRadius: 8,
  fontFamily: "Georgia, serif",
};

function ToolbarButton({onClick, title, children}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      title={title}
      onClick={onClick}
      className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150"
    >
      {children}
    </Button>
  );
}

export default function JournalEditor({editorRef, initialContent}) {
  const editor = useCreateBlockNote({
    initialContent: initialContent ?? [{type: "paragraph", content: ""}],
  });

  useEffect(() => {
    if (editorRef) {
      editorRef.current = editor;
    }
  }, [editor, editorRef]);
  return (
    <div className="w-full rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden flex flex-col">
      {/* =============== Buttons over the editor =================== */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-border/40 bg-muted/20">
        <ToolbarButton title="Undo" onClick={() => editor.undo()}>
          <Undo2 size={14} />
        </ToolbarButton>
        <ToolbarButton title="Redo" onClick={() => editor.redo()}>
          <Redo2 size={14} />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-7 mx-1" />

        <ToolbarButton
          title="Heading 1"
          onClick={() => {
            const cursor = editor.getTextCursorPosition();
            if (!cursor || !cursor.block) return;
            editor.updateBlock(cursor.block, {
              type: "heading",
              props: {level: 1},
            });
          }}
        >
          <Heading1 size={14} />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 2"
          onClick={() => {
            const cursor = editor.getTextCursorPosition();
            if (!cursor || !cursor.block) return;
            editor.updateBlock(cursor.block, {
              type: "heading",
              props: {level: 2},
            });
          }}
        >
          <Heading2 size={14} />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 3"
          onClick={() => {
            const cursor = editor.getTextCursorPosition();
            if (!cursor || !cursor.block) return;
            editor.updateBlock(cursor.block, {
              type: "heading",
              props: {level: 3},
            });
          }}
        >
          <Heading3 size={14} />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-5 mx-1 opacity-40" />

        <ToolbarButton
          title="Bold"
          onClick={() => editor.toggleStyles({bold: true})}
        >
          <Bold size={14} />
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          onClick={() => editor.toggleStyles({italic: true})}
        >
          <Italic size={14} />
        </ToolbarButton>
        <ToolbarButton
          title="Underline"
          onClick={() => editor.toggleStyles({underline: true})}
        >
          <Underline size={14} />
        </ToolbarButton>
        <ToolbarButton
          title="Strikethrough"
          onClick={() => editor.toggleStyles({strike: true})}
        >
          <Strikethrough size={14} />
        </ToolbarButton>
        <ToolbarButton
          title="Code"
          onClick={() => editor.toggleStyles({code: true})}
        >
          <Code size={14} />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-5 mx-1 opacity-40" />

        <ToolbarButton
          title="Bullet List"
          onClick={() => {
            const cursor = editor.getTextCursorPosition();
            if (!cursor || !cursor.block) return;
            editor.updateBlock(cursor.block, {
              type: "bulletListItem",
            });
          }}
        >
          <List size={14} />
        </ToolbarButton>
        <ToolbarButton
          title="Numbered List"
          onClick={() => {
            const cursor = editor.getTextCursorPosition();
            if (!cursor || !cursor.block) return;
            editor.updateBlock(cursor.block, {
              type: "numberedListItem",
            });
          }}
        >
          <ListOrdered size={14} />
        </ToolbarButton>

        <div className="ml-auto text-[9px] uppercase tracking-widest text-muted-foreground/40 hidden md:block">
          Type / for commands
        </div>
      </div>

      {/* ============== Preview/ Editor viewer ================= */}

      <div className="min-h-[420px] px-2 py-1">
        <BlockNoteView
          editor={editor}
          formattingToolbar={false}
          theme={editorTheme}
        />
      </div>
      <div className="flex items-center justify-between px-4 py-2 border-t border-border/30 bg-muted/10">
        <p className="text-[9px] text-muted-foreground/40 tracking-wide">
          ✦ Write your thoughts freely
        </p>
        <p className="text-[9px] text-muted-foreground/40 tracking-wide hidden md:block">
          Markdown shortcuts supported
        </p>
      </div>
    </div>
  );
}
