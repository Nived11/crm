// app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body>
        <Toaster position="top-center" />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}