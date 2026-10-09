import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = { title: "Curious | A Vsauce fan project", description: "A small corner of the internet for big questions. Explore Vsauce videos and leave a question in the Question Jar.", icons: { icon: "/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en">
    <body>
      <a className="skip" href="#main">Skip to content</a>
      <header>
        <nav aria-label="Main navigation">
          <Link className="logo" href="/">curious<span>?</span>
          </Link>
          <div className="navlinks">
            <Link href="/">Home</Link>
            <Link href="/explore">Explore</Link>
            <Link href="/question-jar">Question Jar</Link>
          </div>
        </nav>
      </header>
      <main id="main">{children}</main>
      <footer>
        <span>Made by Rohin · Keep asking why.</span>
        <span>An unofficial fan project. Not affiliated with Vsauce.</span>
        <a href="https://www.youtube.com/@Vsauce" target="_blank" rel="noreferrer">Vsauce on YouTube</a>
      </footer>
    </body>
  </html>;
}
