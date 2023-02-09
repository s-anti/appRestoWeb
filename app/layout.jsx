"use client";
import { MantineProvider } from "@mantine/core";

export default function RootLayout({ children }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "dark",
      }}
    >
      <html lang="es">
        <head />
        <body>
          <main>{children}</main>
        </body>
      </html>
    </MantineProvider>
  );
}
