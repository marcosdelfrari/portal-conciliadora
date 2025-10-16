import type { Metadata } from "next";
import { Mukta } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ThemeContext";

const mukta = Mukta({
  variable: "--font-mukta",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Portal Conciliadora",
  description: "Portal Conciliadora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mukta.variable} antialiased`}>
        {/* Script inline para aplicar tema inicial antes da hidratação e evitar FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
        <ThemeProvider>
          <div>
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
