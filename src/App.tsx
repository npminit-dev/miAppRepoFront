import React from "react"
import Componente from './componentes/Componente'
import { FaShopify } from 'react-icons/fa'
import { contacto, presentacion_arr } from './archivos/textoplano';

export default function App() {
  return (
    <>
      <Componente></Componente>
      <FaShopify style={{color: 'red'}}></FaShopify>
      <br></br><br></br>
      {presentacion_arr.map((elem, i) => <span key={i}>{elem}<br></br><br></br></span> )}
      {contacto.map((elem, i) => <span key={i}>{elem}<br></br><br></br></span> )}
    </>
  )
}