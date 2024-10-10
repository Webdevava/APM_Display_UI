import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Audience Measurement Meter",
  description: "Inditronics Audience Measurement Device",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950`}>
        <div className="h-[480px] w-[800px] overflow-hidden bg-background text-foreground border-4 border-slate-950 shadow-inner rounded-lg dar">
          {children}
        </div>
      </body>
    </html>
  );
}
