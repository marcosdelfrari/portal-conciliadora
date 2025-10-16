"use client";

import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "../app/ThemeToggle";
import { HelpCircle } from "lucide-react";

interface HeaderProps {
  onShowTutorial?: () => void;
}

export default function Header({ onShowTutorial }: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between pb-8 p-4">
      <Link href="/dashboard">
        <Logo width={150} height={150} />
      </Link>
      <div className="flex items-center gap-4 ">
        {onShowTutorial && (
          <button
            onClick={onShowTutorial}
            className="px-3 py-2 rounded-md border text-sm transition-colors bg-background text-foreground border-black/10 dark:border-white/20 hover:bg-black/[.04] dark:hover:bg-white/[.06] flex items-center justify-center"
            title="Ver tutorial novamente"
          >
            <HelpCircle className="w-4 h-4" />
          
          </button>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
