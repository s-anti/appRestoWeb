"use client";
import React from "react";
import { Card, Badge, Image } from "@mantine/core";

export default function Producto({ item }) {
  console.log("dsrkgjlh", item);
  return (
    <Card m="sm" radius={"xl"}>
      <Card.Section>
        <Image src={item.image[0]} alt={`Imagen de ${item.nombre}`} />
      </Card.Section>
      <h2>{item.nombre}</h2>

      {item.descuento ? (
        <Badge color="teal" size="xl">
          OFERTAAA
        </Badge>
      ) : (
        <></>
      )}

      <p>{item.precio}</p>
      <p>{item.porcentajeDescuento}</p>
      <p>{item.description}</p>
    </Card>
  );
}
