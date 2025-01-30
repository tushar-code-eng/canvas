import ExtraWrapper from "@/components/ExtraWrapper";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ExtraWrapper>
        <body>
          {children}
        </body>
      </ExtraWrapper>
    </html>
  );
}
