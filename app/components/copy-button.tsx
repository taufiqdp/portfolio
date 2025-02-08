"use client";

import React from "react";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    const plainText = text.replace(/(<([^>]+)>)/gi, "");
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyToClipboard}
      className="absolute right-1 top-1 p-1 rounded bg-neutral-50 text-gray-500 hover:bg-gray-100 hover:text-gray-800 hover:cursor-pointer hidden sm:block"
    >
      {copied ? <LuCopyCheck size={16} /> : <LuCopy size={16} />}
    </button>
  );
}
