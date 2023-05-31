import React, { useContext, useEffect, useRef, useState } from "react";
import '../estilos/home.css'
import { img_movil, img_pc } from '../datos/img_home_links'
import { General } from "../contextos/General";
import { Presentacion } from "~/interfaces/Interfaces";
import TextoPresentacion from "./TextoPresentacion";


export default function Home(): JSX.Element {

  const animarCB = (img: Element, res: Function) => {
    img.animate([{ opacity: 1 }, { opacity: 0 } ], { duration: 1000, fill: 'forwards' })
    res('terminada animacion')
  }
  
  async function animar(img: Element){
    return new Promise((res): void => {
      let timeout = setTimeout(animarCB.bind(null, img, res) , 10000)
      settimers([timeout, ...timers])
    })
  }

  const { anchopantalla } = useContext(General)
  const [ presentacion, setpresentacion ] = useState<Presentacion>('MOVIL')
  const [ imgarr, setimgarr ] = useState<string[]>([])
  const [ timers, settimers ] = useState<NodeJS.Timeout[]>([])

  useEffect(() => {
    if(anchopantalla <= 782) {
      setpresentacion('MOVIL')
      setimgarr(img_movil)
    }
    else {
      setpresentacion('PC')
      setimgarr(img_pc)
    }
  }, [anchopantalla])

  useEffect(() => {
    async function animarImagenes(){
      let imgs = document.getElementsByClassName('img') as HTMLCollectionOf<HTMLElement>
      for(const img of imgs) img.animate([ { opacity: 1 } ], { duration: 0, fill: 'forwards' })
      timers.forEach((elem: NodeJS.Timeout): void => clearTimeout(elem))
      for(let i = imgs.length - 1; i >= 0; i--) {
        await animar(imgs[i])
        if(!i) await animarImagenes()
      }
    }

    animarImagenes();
  }, [imgarr])

  return (
    <div id="home_contenedor">
      <div id="img_contenedor">
        { 
          imgarr.map((elem, i) => {
            return <img src={elem} className="img" title="presentacion" alt={`imagen de la presentacion en formato ${presentacion}`} key={i}></img>
          })
        }
      </div>
      <div id="presentacion_contenedor">
        <TextoPresentacion></TextoPresentacion>
      </div>
    </div>
  )
}