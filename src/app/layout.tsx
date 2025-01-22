import ReduxProvider from "@/components/ReduxProvider";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body>
          {children}
        </body>
      </ReduxProvider>
    </html>
  );
}
