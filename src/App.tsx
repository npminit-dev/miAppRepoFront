import React, { useContext } from "react"
import Componente from './componentes/Componente'
import { FaShopify } from 'react-icons/fa'
import Estrellas_miniatura from "./componentes/Estrellas_miniatura";
import { General } from "./contextos/General";
import { Producto } from './interfaces/Interfaces';
import Navbar from './componentes/Navbar';


export default function App() {

  const { productos, setproductos, carrito, jwt, total, datosusuario } = useContext(General)

  return (
    <>
      <Navbar></Navbar>
    </>
  )
}