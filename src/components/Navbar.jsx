"use client";

import Image from "next/image";
import Link from "next/link";
import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {useGetCurrentUser, useLogOut} from "@/hooks/auth.hook";
import {Folders, Pencil, Menu, LogOut, LayoutDashboard} from "lucide-react";

const guestLinks = [
  {label: "Features", href: "/#features"},
  {label: "Dashboard", href: "/dashboard"},
];

export default function Navbar() {
  const {user} = useGetCurrentUser();
  const {logout} = useLogOut();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-5 md:px-10 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center shrink-0 group">
          <Image
            src="/logo-t.png"
            alt="Antorlipi"
            width={52}
            height={20}
            className="object-contain transition-opacity duration-200 group-hover:opacity-80"
          />
        </Link>

        {!user && (
          <div className="hidden md:flex items-center gap-8">
            {guestLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        )}

        <div className="hidden md:flex items-center gap-2.5">
          {!user ? (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-6 text-xs tracking-[0.18em] uppercase border-border/50 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full px-4 text-xs tracking-wide text-muted-foreground hover:text-foreground hover:bg-primary/8 transition-all duration-300 gap-2"
                asChild
              >
                <Link href="/dashboard">
                  <LayoutDashboard size={14} />
                  Dashboard
                </Link>
              </Button>

              <Button
                size="sm"
                className="rounded-full px-5 text-xs tracking-wide gap-2 shadow-md shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-300"
                asChild
              >
                <Link href="/journal/write">
                  <Pencil size={14} />
                  Write
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="rounded-full w-9 h-9 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/8 transition-all duration-300"
                title="Log out"
              >
                <LogOut size={15} />
              </Button>
            </div>
          )}
        </div>

        <div className="flex md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl w-9 h-9 text-muted-foreground hover:text-foreground hover:bg-primary/8"
              >
                <Menu size={19} />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[280px] p-0 border-l border-border/40 bg-background/95 backdrop-blur-2xl"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-6 py-5 border-b border-border/30">
                  <Image
                    src="/logo-t.png"
                    alt="Antorlipi"
                    width={60}
                    height={26}
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col flex-1 px-4 py-5 gap-1">
                  {!user && (
                    <>
                      {guestLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground hover:bg-primary/6 transition-all duration-200 py-3 px-4 rounded-xl"
                        >
                          {link.label}
                        </Link>
                      ))}
                      <div className="py-2">
                        <Separator className="opacity-80" />
                      </div>
                    </>
                  )}

                  {user && (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/6 transition-all duration-200 py-3 px-4 rounded-xl"
                      >
                        <LayoutDashboard
                          size={15}
                          className="text-primary/70"
                        />
                        Dashboard
                      </Link>
                      <Link
                        href="/journal/write"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/6 transition-all duration-200 py-3 px-4 rounded-xl"
                      >
                        <Pencil size={15} className="text-primary/70" />
                        Write New Entry
                      </Link>
                    </>
                  )}
                </div>

                <div className="px-4 pb-6 flex flex-col gap-3">
                  <Separator className="opacity-20 mb-1" />
                  {!user ? (
                    <Button
                      className="w-full rounded-xl text-xs tracking-[0.18em] uppercase shadow-lg shadow-primary/20"
                      onClick={() => setOpen(false)}
                      asChild
                    >
                      <Link href="/login">Login to Antorlipi</Link>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full rounded-xl text-xs tracking-[0.18em] uppercase border-destructive/30 text-destructive hover:bg-destructive/8 hover:border-destructive/50 gap-2 transition-all duration-300"
                      onClick={() => {
                        setOpen(false);
                        logout();
                      }}
                    >
                      <LogOut size={13} />
                      Log Out
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
