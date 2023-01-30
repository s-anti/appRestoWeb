"use client";
import React from "react";
import { Button, Text } from "@nextui-org/react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <Text h1>Esto es el homepage</Text>
      <Text h2>
        Acá podemos poner info de nosotros, pero el cliente del restaurant no lo
        vería
      </Text>
      <Text h2>
        Por ahora los mandamos al restaurant prueba con un link, pero tendría
        que abrirse con el QR
      </Text>

      <Link href={"/prueba2"}>
        <Button>hola</Button>
      </Link>
    </div>
  );
}
