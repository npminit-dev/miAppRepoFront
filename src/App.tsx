import React, { useContext } from "react"
import Navbar from './componentes/navegacion/Navbar';
import Contenido from "./componentes/contenido/Contenido";
import './estilos/app.css'
import PieDePagina from "./componentes/navegacion/PieDePagina";
import LogForm from './componentes/usuario/LogForm';
import CookiesModal from "./componentes/usuario/CookiesModal";
import Perfil from "./componentes/usuario/perfil/Perfil";
import Carrito from "./componentes/usuario/carrito/Carrito";

export default function App() { 

  return (
    <div id="app">
      <Navbar></Navbar>
      <Contenido></Contenido>
      <PieDePagina></PieDePagina>
      <LogForm></LogForm>
      <CookiesModal></CookiesModal>
      <Perfil></Perfil>
      <Carrito></Carrito>
    </div>
  )
}