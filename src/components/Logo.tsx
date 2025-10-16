"use client";

import Image from "next/image";
import { useTheme } from "../app/ThemeContext";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({
  width = 150,
  height = 150,
  className = "",
}: LogoProps) {
  const { theme } = useTheme();

  return (
    <div className={`logo-container ${className}`}>
      <Image
        src="/logo.svg"
        alt="Logo"
        width={width}
        height={height}
        className={`logo-image ${theme === "dark" ? "dark-mode" : ""}`}
      />
    </div>
  );
}
