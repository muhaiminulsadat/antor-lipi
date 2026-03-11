"use client";

import {useState} from "react";
import {deleteCollection} from "@/actions/collection.action";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {Trash2, Loader} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DeleteButton = ({collectionId, collectionName}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteCollection(collectionId);
      if (!res.success) {
        toast.error(res.error || "Failed to delete collection.");
        return;
      }
      toast.success("Collection deleted.");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setOpen(true)}
        className="rounded-full px-5 text-xs tracking-widest uppercase gap-2"
      >
        <Trash2 size={13} />
        Delete
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="rounded-2xl bg-card/90 backdrop-blur-xl border border-border/50">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-xl font-light">
              Delete{" "}
              <span className="italic text-primary">
                {collectionName ?? "this collection"}
              </span>
              ?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              This action cannot be undone. All entries inside this collection
              will become unorganized.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={loading}
              className="rounded-full text-xs tracking-widest uppercase"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={loading}
              className="rounded-full text-xs tracking-widest uppercase bg-destructive hover:bg-destructive/90 gap-2"
            >
              {loading ? (
                <>
                  <Loader size={13} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={13} />
                  Delete
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteButton;
