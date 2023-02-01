"use client";
import React from "react";

import { Button, Input, Text, Card, Spacer } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Image from "next/image";

export default function page(props) {
  const [categorias, setCategorias] = useState(new Map());
  const [menu, setMenu] = useState();
  const [stateBuscar, setStateBuscar] = useState();
  const [filtradoPorBusqueda, setFiltradoPorBusqueda] = useState("nada");
  const busqueda = [];

  const direccion = props.params.menues;

  useEffect(() => {
    // TODO: Mejorar esto, hashearlo capaz? o algo
    const ref = doc(db, `data_product/${direccion}@gmail.com`);

    const unsub = onSnapshot(ref, (doc) => {
      setMenu(doc.data());
    });
  }, []);

  // Filtramos para mostrar solo lo que está tildado como visible
  useEffect(() => {
    const v = menu?.product?.filter((item) => {
      return item.disable != true;
    });

    const c = new Map();

    v?.forEach((elemento) => {
      if (elemento.categoria in c) {
        c.set(elemento.categoria, [...c[elemento.categoria], elemento]);
      } else {
        c.set(elemento.categoria, [elemento]);
      }
    });

    setCategorias(c);
    console.log("categoiars", categorias);
  }, [menu]);

  // TODO: Búsqueda, se le podrían agregar tags tipo :Vegano, y te tira todo lo vegano; desyuno; bebidas; sanguches
  //e n la app los pones como checkboxes o agregas categorías nuevas
  // useEffect(() => {
  //   menu?.product?.forEach((item) => {
  //     busqueda.push(item.nombre);
  //   });
  // }, [menu]);

  return (
    <div>
      <Text h1>Este es el menú de {direccion}</Text>
      <Input
        fullWidth="true"
        type="search"
        clearable
        bordered
        rounded
        labelPlaceholder="Buscar"
        color="primary"
      ></Input>

      <Spacer y={1} />

      <div>{console.log("categorias es ", categorias)}</div>
    </div>
  );
}
