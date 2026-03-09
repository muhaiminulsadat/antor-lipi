"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {MOODS} from "@/lib/utils";

const moods = Object.values(MOODS);

// console.log(moods);

export default function MoodSelector({value, onChange}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full rounded-xl bg-background/50 border-border/50 focus:border-primary/50 text-sm">
        <SelectValue placeholder="How are you feeling?" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        {moods.map((mood) => (
          <SelectItem
            key={mood.id}
            value={mood.id}
            className="text-sm flex gap-3"
          >
            <span>{mood.emoji}</span>
            <span>{mood.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
