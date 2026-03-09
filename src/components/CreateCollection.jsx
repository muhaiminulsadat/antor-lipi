"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {FolderPlus} from "lucide-react";
import {createCollection} from "@/actions/collection.action";
import toast from "react-hot-toast";

export default function CreateCollectionDialog({
  open,
  onOpenChange,
  setCollectionId,
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Please enter a collection name.");
      return;
    }

    try {
      setLoading(true);
      const res = await createCollection({name, description});

      if (!res.success) {
        toast.error(res.error || "Something went wrong.");
        return;
      }

      //   console.log(res?.data?._id);
      setCollectionId(res?.data?._id);

      toast.success("Collection created!");
      setName("");
      setDescription("");
      onOpenChange(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl bg-card/80 backdrop-blur-xl border border-border/50">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-light text-foreground">
            New <span className="italic text-primary">Collection</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5 mt-2">
          <div className="flex flex-col gap-2">
            <Label className="text-xs tracking-widest uppercase text-muted-foreground">
              Name
            </Label>
            <Input
              placeholder="e.g. Morning Thoughts"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl bg-background/50 border-border/50 focus:border-primary/50 text-sm h-11"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-xs tracking-widest uppercase text-muted-foreground">
              Description{" "}
              <span className="normal-case tracking-normal text-muted-foreground/50">
                (optional)
              </span>
            </Label>
            <Textarea
              placeholder="What is this collection about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-xl bg-background/50 border-border/50 focus:border-primary/50 text-sm resize-none"
              rows={3}
            />
          </div>

          <div className="flex items-center gap-3 justify-end">
            <Button
              variant="ghost"
              className="rounded-full px-5 text-xs tracking-widest uppercase text-muted-foreground"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={loading}
              className="rounded-full px-6 text-xs tracking-widest uppercase shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
