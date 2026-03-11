"use client";

import dynamic from "next/dynamic";

const EntryContent = dynamic(() => import("./EntryContent"), {ssr: false});

export default function EntryContentWrapper({content}) {
  return <EntryContent content={content} />;
}
