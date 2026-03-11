import {Button} from "@/components/ui/button";
import {Edit} from "lucide-react";
import Link from "next/link";

const EditButton = ({entryId}) => {
  return (
    <Link href={`/journal/write?edit=${entryId}`}>
      {" "}
      <Button
        variant="outline"
        className={"rounded-full px-5 text-xs tracking-widest uppercase gap-2"}
      >
        <Edit />
        Edit
      </Button>
    </Link>
  );
};
export default EditButton;
