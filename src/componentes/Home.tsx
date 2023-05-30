import React, { useContext, useEffect, useRef, useState } from "react";
import '../estilos/home.css'
import { presentacion_arr } from '../datos/home_texto'
import { General } from "../contextos/General";
import { Presentacion } from "~/interfaces/Interfaces";

export default function Home(): JSX.Element {

  const { anchopantalla } = useContext(General)
  const [presentacion, setpresentacion] = useState<Presentacion>('MOVIL')

  useEffect(() => {
    if(anchopantalla <= 722) {
      document.getElementById('gif-pc').style.display = 'none'
      document.getElementById('gif-movil').style.display = 'inline-block'
    }
    else {
      document.getElementById('gif-movil').style.display = 'none'
      document.getElementById('gif-pc').style.display = 'inline-block'
  }
  }, [anchopantalla])


 
  return (
    <div id="home_contenedor">
      <div id="img_contenedor">
        <img id="gif-movil" src="http://localhost:3002/archivos/presentacion-movil" title="gifmovil" alt="gif de fondo de la seccion home, version movil"></img>
        <img id="gif-pc" src="http://localhost:3002/archivos/presentacion-pc" title="gifpc" alt="gif de fondo de la seccion home, version pc"></img>
      </div>
      <div id="presentacion_contenedor"></div>
    </div>
  )
}