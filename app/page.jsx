"use client";
import React from "react";
import { Button } from "@mantine/core";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>Esto es el homepage</h1>
      <h2>
        Acá podemos poner info de nosotros, pero el cliente del restaurant no lo
        vería
      </h2>
      <h2>
        Por ahora los mandamos al restaurant prueba con un link, pero tendría
        que abrirse con el QR
      </h2>

      <Button
        component="a"
        href="/prueba2"
        variant="light"
        color="cyan"
        radius="xl"
      >
        Hpñla
      </Button>
    </div>
  );
}
