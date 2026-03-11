"use client";

import {useState} from "react";
import {BookOpen, TrendingUp, Smile} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Card, CardContent} from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {format, subDays} from "date-fns";

const DATE_RANGES = [
  {value: "7", label: "Last 7 days"},
  {value: "15", label: "Last 15 days"},
  {value: "30", label: "Last 30 days"},
];

const CustomTooltip = ({active, payload, label}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl px-3 py-2 shadow-lg">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="text-sm font-medium text-primary">
          {payload[0].value?.toFixed(1)}{" "}
          <span className="text-xs text-muted-foreground font-normal">
            avg mood
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function MoodAnalytics({entries}) {
  const safeEntries = Array.isArray(entries) ? entries : [];
  const [range, setRange] = useState("7");

  // Filter entries by selected range
  const filtered = safeEntries.filter((e) => {
    const entryDate = new Date(e.createdAt);
    const cutoff = subDays(new Date(), parseInt(range));
    return entryDate >= cutoff;
  });

  const totalEntries = filtered.length;

  const avgMoodScore =
    filtered.length > 0
      ? (
          filtered.reduce((sum, e) => sum + (e.moodScore || 0), 0) /
          filtered.length
        ).toFixed(1)
      : 0;

  const moodCounts = filtered.reduce((acc, e) => {
    if (e.mood) acc[e.mood] = (acc[e.mood] || 0) + 1;
    return acc;
  }, {});

  const dominantMood = Object.keys(moodCounts).length
    ? Object.keys(moodCounts).reduce((a, b) =>
        moodCounts[a] > moodCounts[b] ? a : b,
      )
    : null;

  // Build chart data — one point per day
  const chartData = Array.from({length: parseInt(range)}, (_, i) => {
    const date = subDays(new Date(), parseInt(range) - 1 - i);
    const dayKey = format(date, "yyyy-MM-dd");
    const dayEntries = filtered.filter(
      (e) => format(new Date(e.createdAt), "yyyy-MM-dd") === dayKey,
    );
    const avg =
      dayEntries.length > 0
        ? dayEntries.reduce((sum, e) => sum + (e.moodScore || 0), 0) /
          dayEntries.length
        : null;

    return {date: format(date, "MMM d"), avg};
  }).filter((item) => item.avg !== null); // ← add this

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-primary mb-1">
            Overview
          </p>
          <h1 className="font-serif text-2xl md:text-3xl font-light text-foreground">
            Dashboard
          </h1>
        </div>

        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-36 rounded-xl bg-background/50 border-border/50 text-xs focus:border-primary/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {DATE_RANGES.map((r) => (
              <SelectItem key={r.value} value={r.value} className="text-xs">
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300">
          <CardContent className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-xs tracking-widest uppercase text-muted-foreground">
                Total Entries
              </p>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen size={14} className="text-primary" />
              </div>
            </div>
            <div>
              <p className="font-serif text-4xl font-light text-foreground">
                {totalEntries}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                entries written
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300">
          <CardContent className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-xs tracking-widest uppercase text-muted-foreground">
                Avg Mood Score
              </p>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp size={14} className="text-primary" />
              </div>
            </div>
            <div>
              <div className="flex items-end gap-1">
                <p className="font-serif text-4xl font-light text-foreground">
                  {avgMoodScore}
                </p>
                <p className="text-sm text-muted-foreground mb-1">/ 10</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                average over {range} days
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300">
          <CardContent className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-xs tracking-widest uppercase text-muted-foreground">
                Mood Summary
              </p>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Smile size={14} className="text-primary" />
              </div>
            </div>
            <div>
              <p className="font-serif text-4xl font-light text-foreground capitalize">
                {dominantMood ?? "—"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                most frequent mood
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-card/60 backdrop-blur-sm border-border/50">
        <CardContent className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-xs tracking-widest uppercase text-muted-foreground">
              Mood Over Time
            </p>
            <span className="text-[10px] text-muted-foreground/50 bg-muted/40 px-2 py-0.5 rounded-full">
              Last {range} days
            </span>
          </div>

          {filtered.length > 0 ? (
            <ResponsiveContainer width="100%" key={range} height={220}>
              <AreaChart
                data={chartData}
                margin={{top: 5, right: 10, left: -20, bottom: 0}}
              >
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--primary)"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  opacity={0.4}
                />
                <XAxis
                  dataKey="date"
                  tick={{fontSize: 10, fill: "var(--muted-foreground)"}}
                  tickLine={false}
                  axisLine={true}
                  interval={Math.floor(parseInt(range) / 7)}
                />
                <YAxis
                  domain={[0, 10]}
                  tick={{fontSize: 10, fill: "var(--muted-foreground)"}}
                  tickLine={false}
                  axisLine={false}
                  ticks={[0, 2, 4, 6, 8, 10]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="avg"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fill="url(#moodGradient)"
                  connectNulls
                  dot={{fill: "var(--primary)", r: 3, strokeWidth: 0}}
                  activeDot={{r: 5, fill: "var(--primary)", strokeWidth: 0}}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center">
              <p className="text-sm text-muted-foreground/50 italic">
                No entries in this period yet...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
