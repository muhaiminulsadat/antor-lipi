"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import {Card, CardContent} from "@/components/ui/card";
import {authClient} from "@/lib/auth-client";
import {ArrowRight, Eye, EyeClosed, Lock, Mail, User} from "lucide-react";
import toast from "react-hot-toast";
import {useLoggedIn} from "@/hooks/auth.hook";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useLoggedIn();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await authClient.signUp.email(
        {name, email, password},
        {
          onRequest: () => setLoading(true),
          onSuccess: () => {
            toast.success("Account created! Welcome to Antorlipi.");
            setLoading(false);
            router.push("/dashboard");
          },
          onError: (ctx) => {
            toast.error(
              ctx.error.message || "Something went wrong. Please try again.",
            );
            setLoading(false);
          },
        },
      );
    } catch (error) {
      toast.error(error?.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    toast.error("Google sign up will be implemented soon...");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 md:w-[500px] md:h-[500px] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-primary/5 blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-8">
        <Link href="/" className="flex flex-col items-center gap-3">
          <Image
            src="/logo-t.png"
            alt="Antorlipi"
            width={90}
            height={40}
            className="object-contain"
          />
          <p className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            Your private sanctuary
          </p>
        </Link>

        <Card className="w-full bg-card/50 backdrop-blur-xl border border-border/50 shadow-2xl shadow-black/10">
          <CardContent className="p-6 md:p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="font-serif text-3xl font-light text-foreground">
                Begin your journey
              </h1>
              <p className="text-muted-foreground text-sm">
                Create your account and start writing.
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full rounded-xl border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 gap-3 text-sm"
              onClick={handleGoogleSignUp}
              type="button"
            >
              <Mail size={15} className="text-muted-foreground" />
              Continue with Google
            </Button>

            <div className="flex items-center gap-3">
              <Separator className="flex-1 opacity-30" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                or
              </span>
              <Separator className="flex-1 opacity-30" />
            </div>

            <form onSubmit={handleSignUp} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="name"
                  className="text-xs tracking-wide text-muted-foreground uppercase"
                >
                  Full Name
                </Label>
                <div className="relative">
                  <User
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="email"
                  className="text-xs tracking-wide text-muted-foreground uppercase"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="password"
                  className="text-xs tracking-wide text-muted-foreground uppercase"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeClosed size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl mt-1 text-xs tracking-widest uppercase shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 gap-2"
              >
                {loading ? (
                  "Creating account..."
                ) : (
                  <>
                    Create Account <ArrowRight size={14} />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline underline-offset-4 transition-all"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
