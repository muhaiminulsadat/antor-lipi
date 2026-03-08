"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";

const quotes = [
  {
    text: "The life of every man is a diary in which he means to write one story, and writes another.",
    author: "J.M. Barrie",
  },
  {
    text: "Journal writing is a voyage to the interior.",
    author: "Christina Baldwin",
  },
  {
    text: "Fill your paper with the breathings of your heart.",
    author: "William Wordsworth",
  },
  {text: "In the journal I am at ease.", author: "Anaïs Nin"},
  {text: "Write hard and clear about what hurts.", author: "Ernest Hemingway"},
];

const features = [
  {
    glyph: "✦",
    title: "Write Freely",
    desc: "A distraction-free canvas that disappears around your words. Just you and your thoughts, nothing else.",
  },
  {
    glyph: "◈",
    title: "Daily Spark",
    desc: "Curated prompts and rotating quotes to ignite your inner voice every single morning.",
  },
  {
    glyph: "◉",
    title: "Forever Yours",
    desc: "Private by design. Encrypted, organized, and always at your fingertips whenever you need it.",
  },
  {
    glyph: "◇",
    title: "Track Growth",
    desc: "See your writing streaks, moods, and milestones evolve beautifully over time.",
  },
];

const testimonials = [
  {
    name: "Rania Ahmed",
    role: "Writer, Dhaka",
    text: "Antorlipi changed how I process emotions. It feels like a warm, safe space.",
  },
  {
    name: "Farhan Hossain",
    role: "Student, Chittagong",
    text: "I've tried many journal apps. This one actually makes me want to write every day.",
  },
  {
    name: "Maliha Khan",
    role: "Therapist, Sylhet",
    text: "I recommend Antorlipi to my clients. The calm design alone reduces anxiety.",
  },
];

export default function LandingPage() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timeoutId;
    const id = setInterval(() => {
      setShow(false);
      timeoutId = setTimeout(() => {
        setQuoteIdx((i) => (i + 1) % quotes.length);
        setShow(true);
      }, 500);
    }, 4500);
    return () => {
      clearInterval(id);
      clearTimeout(timeoutId);
    };
  }, []);

  const q = quotes[quoteIdx];

  return (
    <main className="flex flex-col items-center w-full  overflow-x-hidden">
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-5 pt-28 pb-16 text-center gap-8">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 md:w-[700px] md:h-[700px] rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-48 h-48 md:w-80 md:h-80 rounded-full bg-primary/6 blur-2xl" />
          <div className="absolute top-1/3 -left-10 w-32 h-32 rounded-full bg-primary/5 blur-xl" />
          <div className="absolute top-20 right-8 w-1 h-1 rounded-full bg-primary animate-ping" />
          <div className="absolute top-40 left-10 w-1 h-1 rounded-full bg-primary/50 animate-ping [animation-delay:1s]" />
          <div className="absolute bottom-32 right-16 w-1 h-1 rounded-full bg-primary/70 animate-ping [animation-delay:2s]" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-4xl">
          <Badge className="rounded-full px-4 py-1.5 text-[10px] md:text-xs tracking-[0.2em] uppercase border border-primary/30 bg-primary/10 text-primary hover:bg-primary/10">
            ✦ Your Private Sanctuary
          </Badge>

          <div className="flex flex-col items-center gap-0.5 md:gap-1">
            <h1 className="text-[clamp(2.8rem,11vw,7rem)] font-serif font-light leading-[0.95] tracking-tight text-foreground">
              Write what
            </h1>
            <h1 className="text-[clamp(2.8rem,11vw,7rem)] font-serif font-semibold italic leading-[0.95] tracking-tight text-primary">
              your heart
            </h1>
            <h1 className="text-[clamp(2.8rem,11vw,7rem)] font-serif font-light leading-[0.95] tracking-tight text-foreground">
              whispers.
            </h1>
          </div>

          <p className="text-muted-foreground text-sm md:text-xl max-w-xs md:max-w-md leading-relaxed font-light">
            Antorlipi is a journal built for souls who believe words can heal,
            clarify, and transform.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full px-8 text-xs tracking-[0.15em] uppercase shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
              asChild
            >
              <Link href="/sign-up">Begin Writing — Free</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-full px-8 text-xs tracking-[0.15em] uppercase border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              asChild
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>

          <Card className="w-full max-w-sm md:max-w-lg bg-card/50 backdrop-blur-xl border border-border/50 shadow-2xl shadow-black/10 hover:shadow-primary/10 transition-shadow duration-500">
            <CardContent className="p-5 md:p-7 text-left">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                  Daily Reflection
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary/25 animate-pulse" />
                  <span className="w-2.5 h-2.5 rounded-full bg-primary/55 animate-pulse [animation-delay:200ms]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse [animation-delay:400ms]" />
                </div>
              </div>
              <Separator className="mb-5 opacity-30" />
              <div
                className={`transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
              >
                <p className="font-serif text-base md:text-xl italic text-foreground leading-relaxed">
                  &ldquo;{q.text}&rdquo;
                </p>
                <p className="text-primary text-[10px] mt-4 tracking-widest uppercase">
                  — {q.author}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-6 md:gap-16 pt-8 w-full max-w-xs md:max-w-none">
            {[
              {value: "10K+", label: "Journals"},
              {value: "47", label: "Languages"},
              {value: "99.9%", label: "Uptime"},
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="font-serif text-2xl md:text-4xl font-semibold text-foreground">
                  {s.value}
                </span>
                <span className="text-[9px] md:text-xs text-muted-foreground tracking-[0.12em] uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full flex items-center gap-4 px-8 md:px-24">
        <Separator className="flex-1 opacity-20" />
        <span className="text-primary">◈</span>
        <Separator className="flex-1 opacity-20" />
      </div>

      <section className="w-full max-w-5xl px-5 py-20 md:py-10 flex flex-col items-center gap-10 md:gap-16">
        <div className="text-center flex flex-col gap-3 max-w-xs md:max-w-xl">
          <p className="text-[9px] uppercase tracking-[0.3em] text-primary">
            Why Antorlipi
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-foreground leading-tight">
            Everything your journal{" "}
            <span className="italic text-primary">deserves</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
          {features.map((f, i) => (
            <Card
              key={i}
              className="group bg-card/40 backdrop-blur-sm border border-border/40 hover:border-primary/40 hover:bg-card/80 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5"
            >
              <CardContent className="p-6 md:p-8 flex flex-col gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-lg group-hover:bg-primary/20 transition-colors duration-300">
                  {f.glyph}
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="w-full flex items-center gap-4 px-8 md:px-24">
        <Separator className="flex-1 opacity-20" />
        <span className="text-primary">✦</span>
        <Separator className="flex-1 opacity-20" />
      </div>

      <section className="w-full max-w-5xl px-5 py-20 md:py-32 flex flex-col items-center gap-10 md:gap-12">
        <div className="text-center flex flex-col gap-3">
          <p className="text-[9px] uppercase tracking-[0.3em] text-primary">
            Voices
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-foreground">
            Written with <span className="italic text-primary">love</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className="bg-card/30 backdrop-blur-sm border border-border/40 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
            >
              <CardContent className="p-6 flex flex-col gap-4">
                <p className="font-serif text-base italic text-foreground/90 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <Separator className="opacity-20" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground tracking-wide mt-0.5">
                    {t.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="w-full flex items-center gap-4 px-8 md:px-24">
        <Separator className="flex-1 opacity-20" />
        <span className="text-primary">◉</span>
        <Separator className="flex-1 opacity-20" />
      </div>

      <section className="relative w-full px-5 py-24 md:py-36 flex flex-col items-center text-center gap-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[500px] md:h-[500px] rounded-full bg-primary/8 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-xs md:max-w-2xl">
          <p className="text-[9px] uppercase tracking-[0.3em] text-primary">
            Begin Today
          </p>
          <h2 className="font-serif text-5xl md:text-7xl font-light leading-[1.05] text-foreground">
            Your story is <br />
            <span className="italic text-primary">worth telling.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xs">
            Join thousands of writers who found clarity, peace, and purpose
            through journaling.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full px-10 text-xs tracking-[0.15em] uppercase shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
              asChild
            >
              <Link href="/sign-up">Start for Free</Link>
            </Button>
            <span className="text-xs text-muted-foreground tracking-wide">
              No credit card required.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
