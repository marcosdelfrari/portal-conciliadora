import React from "react";
import Link from "next/link";

interface BlocosProps {
  titulo: string;
  href: string;
  icone: React.ComponentType<{ className?: string }>;
}

export default function Blocos({ titulo, href, icone }: BlocosProps) {
  const IconeComponent = icone;

  return (
    <div className="bg-white hover:bg-gray-100 dark:hover:bg-[#2a2a2a] dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2a2a2a] rounded-xl  duration-200">
      <Link href={href}>
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <IconeComponent className="w-8 h-8 md:w-6 md:h-6 text-[#1a1a1a] dark:text-[#c8d300]  mb-3" />
          <h2 className="text-gray-900 dark:text-white font-medium">
            {titulo}
          </h2>
        </div>
      </Link>
    </div>
  );
}
