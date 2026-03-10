"use client";

import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {useGetCurrentUser, useLogOut, useSignOut} from "@/hooks/auth.hook";
import {Folders, Pencil, Menu, X} from "lucide-react";
import {authClient} from "@/lib/auth-client";
import toast from "react-hot-toast";

const navLinks = [
  {label: "Features", href: "/#features"},
  {label: "About", href: "/about"},
];

export default function Navbar() {
  const {user} = useGetCurrentUser();
  const [open, setOpen] = useState(false);

  const {logout} = useLogOut();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/5 backdrop-blur-xl border-b border-border/40 shadow-sm">
      <nav className="flex items-center justify-between px-5 md:px-12 py-3 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo-t.png"
            alt="Antorlipi"
            width={55}
            height={20}
            className="object-contain"
          />
        </Link>

        {!user && (
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-6 text-xs tracking-widest uppercase border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-5 text-xs tracking-wide border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 gap-2"
                asChild
              >
                <Link href="/dashboard">
                  <Folders size={14} />
                  Collections
                </Link>
              </Button>
              <Button
                size="sm"
                className="rounded-full px-5 text-xs tracking-wide shadow-md shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 gap-2"
                asChild
              >
                <Link href="/journal/write">
                  <Pencil size={14} />
                  Write New
                </Link>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={logout}
                className={"rounded-full px-3"}
              >
                Log Out
              </Button>{" "}
            </div>
          )}
        </div>

        <div className="flex md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl w-9 h-9"
              >
                <Menu size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 p-0 bg-background/95 backdrop-blur-xl"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full p-6 gap-6">
                <div className="flex items-center justify-between">
                  <Image
                    src="/logo-t.png"
                    alt="Antorlipi"
                    width={70}
                    height={32}
                    className="object-contain"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl w-8 h-8"
                    onClick={() => setOpen(false)}
                  >
                    <X size={16} />
                  </Button>
                </div>

                <Separator className="opacity-30" />

                {!user && (
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200 py-2.5 px-3 rounded-lg hover:bg-muted/50"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}

                {user && (
                  <div className="flex flex-col gap-2">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground px-3 mb-1">
                      Menu
                    </p>
                    <Button
                      variant="outline"
                      className="w-full rounded-xl justify-start gap-3 text-sm border-border/60"
                      onClick={() => setOpen(false)}
                      asChild
                    >
                      <Link href="/collections">
                        <Folders size={16} />
                        Collections
                      </Link>
                    </Button>
                    <Button
                      className="w-full rounded-xl justify-start gap-3 text-sm shadow-md shadow-primary/20"
                      onClick={() => setOpen(false)}
                      asChild
                    >
                      <Link href="/write">
                        <Pencil size={16} />
                        Write New
                      </Link>
                    </Button>

                    <Button
                      variant={"destructive"}
                      className="w-full rounded-xl justify-start gap-3 text-sm shadow-md shadow-primary/20"
                      onClick={() => {
                        setOpen(false);
                        logout();
                      }}
                    >
                      Log Out
                    </Button>
                  </div>
                )}

                <div className="mt-auto">
                  <Separator className="opacity-30 mb-6" />
                  {!user && (
                    <Button
                      className="w-full rounded-xl text-xs tracking-widest uppercase shadow-lg shadow-primary/20"
                      onClick={() => setOpen(false)}
                      asChild
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
