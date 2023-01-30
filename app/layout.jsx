"use client";

import { SSRProvider } from "@react-aria/ssr";

export default function RootLayout({ children }) {
  return (
    <SSRProvider>
      <html lang="es">
        <head />
        <body
          style={{
            fontFamily: "var(--nextui-fonts-sans)",
          }}
        >
          <main>{children}</main>
        </body>
      </html>
    </SSRProvider>
  );
}
