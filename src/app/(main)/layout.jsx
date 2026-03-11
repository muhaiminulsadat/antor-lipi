import BackButton from "@/components/BackButton";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import Link from "next/link";

const layout = ({children}) => {
  return (
    <main className="min-h-screen px-4 md:px-8 pt-24 pb-12 max-w-5xl mx-auto">
      <BackButton />
      <div className="w-full">{children}</div>
    </main>
  );
};

export default layout;
