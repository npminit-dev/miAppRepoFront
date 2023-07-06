import React, { useContext, useEffect, useRef, useState } from "react";
import '../../estilos/home.css'
import { img_movil, img_pc } from '../../datos/img_home_links'
import TextoPresentacion from "./TextoPresentacion";
import Imgs_Home from "./Imgs_Home";
import { General } from "../../contextos/General";

export default function Home(): JSX.Element {

  const { anchopantalla, setcarrito } = useContext(General)

  return (
    <main id="home_contenedor">
      <div id="img_contenedor">
        { anchopantalla <= 618
          ? <Imgs_Home imgarr={img_movil}></Imgs_Home>
          : <Imgs_Home imgarr={img_pc}></Imgs_Home>
        }
      </div>
      <div id="presentacion_contenedor">
        <TextoPresentacion></TextoPresentacion>
      </div>
    </main>
  )
}