"use client";
import React from "react";

import { Button, Input, Text } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Image from "next/image";

import Card from "@nextui-org/react";

export default function page(props) {
  const [visible, setVisibles] = useState();
  const [menu, setMenu] = useState();
  const [stateBuscar, setStateBuscar] = useState();
  const [filtradoPorBusqueda, setFiltradoPorBusqueda] = useState("nada");
  const busqueda = [];

  const direccion = props.params.menues;

  useEffect(() => {
    const ref = doc(db, `data_product/${direccion}@gmail.com`);

    const unsub = onSnapshot(ref, (doc) => {
      setMenu(doc.data());
    });
  }, []);

  // Filtramos para mostrar solo lo que está tildado como visible
  useEffect(() => {
    const visibles = menu?.product?.filter((item) => {
      return item.disable != true;
    });
    setVisibles(visibles);
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

      <div>
        {visible?.map((tipo) => {
          console.log("Tipo es ", tipo);
          return (
            //  TODO: go to info
            <Card key={tipo.id}>
              <Image
                src={tipo.image[0]} //TODO: un carousel de las fotitos bien picante
                alt={"Imagen de " + tipo.nombre}
                width={500}
                height={500} //TODO: te pide un tamaño si o si NEXT, lo podemos hacer sin la optimizacion de next pero no se
              />
              <div>
                <div>
                  <h1>{tipo.nombre}</h1>
                </div>
                <h1>{tipo.description}</h1>
                <div>
                  <h1>$ {tipo.precio}</h1>
                  {tipo.descuento ? (
                    <div>
                      <h1 style={[styles.info, styles.desc]}>
                        %{tipo.porcentajeDescuento} off{" "}
                      </h1>
                      <h1>
                        QUEDA EN: ${" "}
                        {tipo.precio -
                          tipo.precio * (tipo.porcentajeDescuento / 100)}
                      </h1>
                    </div>
                  ) : (
                    <h1></h1>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
