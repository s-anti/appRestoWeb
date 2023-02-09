"use client";
import React from "react";

import { useState, useEffect } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Image from "next/image";
import Producto from "../../components/Producto";

import { IconSearch, IconX } from "@tabler/icons-react";

import {
  TextInput,
  Text,
  Title,
  Container,
  Card,
  Accordion,
  Divider,
} from "@mantine/core";

export default function page(props) {
  const [categorias, setCategorias] = useState();
  const [menu, setMenu] = useState();
  const [listaFinal, setListaFinal] = useState({ sinCat: [] });

  const [visibles, setVisibles] = useState();
  const [stateBuscar, setStateBuscar] = useState();
  const [filtradoPorBusqueda, setFiltradoPorBusqueda] = useState("nada");
  const busqueda = [];

  const direccion = props.params.menues;

  useEffect(() => {
    // TODO: Mejorar esto, hashearlo capaz? o algo
    const refMenu = doc(db, `data_product/${direccion}@gmail.com`);
    const refCate = doc(db, `data_categories/${direccion}@gmail.com`);

    const unsubMenu = onSnapshot(refMenu, (doc) => {
      setMenu(doc.data());
    });

    const unsubCate = onSnapshot(refCate, (doc) => {
      setCategorias(doc.data());
    });
  }, []);

  useEffect(() => {
    //Creamos el objeto categorias cat = { sinCat: [milanesa napo, pollo],
    //  sanguches: [lomo, tostato]           }
    let c = { sinCat: [] };

    if (categorias !== undefined) {
      // El use effect no anda como creí, entonces me aseguro haber recibido las categorías de la DB

      categorias.categorias.forEach((cat) => {
        //creo la key "Milanesas" si no está && cat.value !== "+ añadir"
        if (cat.value !== "+ añadir") {
          c[cat.value] = [];
        }
      });
    }

    setListaFinal(c);
  }, [categorias]);

  // Filtramos para mostrar solo lo que está tildado como visible,
  useEffect(() => {
    const v = menu?.product?.filter((item) => {
      return item.disable != true;
    });

    if (v) {
      v.forEach((item) => {
        if (item.categoria in listaFinal) {
          listaFinal[item.categoria].push(item); //agregamos cada elemento a lista final en el key que corresponde
        }
      });
    }

    const vArray = Object.keys(listaFinal).map((key) => {
      return [key, listaFinal[key]];
    });

    const vArraySinVacio = vArray.filter((cat) => {
      return cat[1].length > 0;
    });

    setVisibles(vArraySinVacio);
  }, [menu, listaFinal]);

  // TODO: Búsqueda, se le podrían agregar tags tipo :Vegano, y te tira todo lo vegano; desyuno; bebidas; sanguches
  //e n la app los pones como checkboxes o agregas categorías nuevas
  // useEffect(() => {
  //   menu?.product?.forEach((item) => {
  //     busqueda.push(item.nombre);
  //   });
  // }, [menu]);

  return (
    <Container fluid={true}>
      <Title order={1}>Este es el menú de {direccion}</Title>
      <Divider size={"md"} m={"lg"} />
      <TextInput
        placeholder="Buscar..."
        radius="xl"
        size="md"
        icon={<IconSearch color={"grey"} />}
        rightSection={<IconX color={"grey"} />}
      ></TextInput>
      <Divider size={"md"} m={"lg"} />
      <Accordion
        defaultValue={"Pizzas"}
        multiple={true}
        variant="separated"
        radius="md"
        mt={"lg"}
      >
        {visibles?.map((categoria) => {
          return (
            <Accordion.Item value={categoria[0]}>
              <Accordion.Control>
                <Title>{categoria[0]}</Title>
              </Accordion.Control>
              <Accordion.Panel>
                {categoria[1].map((item) => {
                  return <Producto key={item.nombre} item={item}></Producto>;
                })}
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
}
