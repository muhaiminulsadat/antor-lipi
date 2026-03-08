import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {
  Folder02Icon,
  PencilEdit02Icon,
  QuillWrite01Icon,
} from "hugeicons-react";
import {HugeiconsIcon} from "@hugeicons/react";

export default function Navbar() {
  const isLoggedIn = true;
  return (
    <nav className="w-full flex items-center justify-between px-15 py-3 font-bold">
      <Link href="/">
        <Image
          src="/logo-t.png"
          className=""
          alt="Antorlipi"
          width={80}
          height={40}
        />
      </Link>
      {!isLoggedIn ? (
        <>
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Folder02Icon />
              Collections
            </Button>
            <Button>
              <PencilEdit02Icon />
              Write New
            </Button>
          </div>
        </>
      )}
    </nav>
  );
}
