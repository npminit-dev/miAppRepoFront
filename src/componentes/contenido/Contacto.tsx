import React, { useContext, useEffect, useRef } from "react";
import '../../estilos/contacto.css'
import { img_contacto, img_contacto_logos } from '../../datos/img_contacto_links'
import { General } from "../../contextos/General";
import { contacto } from '../../datos/texto'

const retraso = async() => {
  return new Promise((res, rej) => {
    setTimeout(() => res(''), 100)
  })
}

const keyframes: Keyframe[] = [{ transform: 'translateX(-100px)', opacity: 0 },{ transform: 'translateX(0)', opacity: 1 }]
const anim_opciones: KeyframeAnimationOptions = { duration: 350, fill: 'forwards', easing: 'ease-out' }

export default function Contacto(): JSX.Element {

  const { anchopantalla } = useContext(General)
  
  const secciones = useRef<HTMLDivElement[]>([])

  async function animar(){
    for(const seccion of secciones.current) {
      await retraso();
      seccion?.animate(keyframes, anim_opciones)
    }
  }

  useEffect(() => {
    animar()
  }, [])

  return (
    <div id="contacto_container">
      <div id="fondo_contenedor">
        <img
          id="fondo"
          src={anchopantalla <= 488 ? img_contacto[0] : img_contacto[1]}
          title="fondo de la seccion contacto"
        ></img>
      </div>
      <div id="info_container">
        <div className="info_seccion" ref={ref => secciones.current.push(ref)}>
          <div className="etiqueta">Direccion de nuestra planta:</div>
          <div className="datos">{contacto.direccion}</div>
        </div>
        <div className="info_seccion" ref={ref => secciones.current.push(ref)}>
          <div className="etiqueta">Departamentos:</div>
          <div className="datos">
            { contacto.departamentos.map((elem, i) => <div key={i}>{elem}</div>) }
          </div>
        </div>
        <div className="info_seccion" ref={ref => secciones.current.push(ref)}>
          <div className="etiqueta">Horarios de atencion:</div>
          <div className="datos">{contacto.horarioatencion}</div>
        </div>
        <div className="info_seccion" ref={ref => secciones.current.push(ref)}>
          <div className="etiqueta">Contacto:</div>
          <div className="datos">
            {contacto.contacto.map((elem, i) => <div key={i}>{elem}</div>) }
          </div>
        </div>
        <div id="logos_container">
          <div className="logo_container">
            <img src={img_contacto_logos[0]} id="sra_logo"></img>
          </div>
          <div className="logo_container">
            <img src={img_contacto_logos[1]} id="ipcva_logo"></img>
          </div>
        </div>
      </div>
     
    </div>
  );
}