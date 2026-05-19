import Script from "next/script";
import { LinkedInInsightScript } from "linkedin-insight-tag/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <LinkedInInsightScript
          partnerId="12345678"
          consent={true}
          ScriptComponent={Script}
        />
      </body>
    </html>
  );
}
