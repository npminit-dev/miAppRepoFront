import React, { useContext, useEffect, useRef } from "react";
import '../estilos/contacto.css'
import { img_contacto, img_contacto_logos } from '../datos/img_contacto_links'
import { General } from "../contextos/General";
import { contacto } from '../datos/texto'

export default function Contacto(): JSX.Element {

  const { anchopantalla } = useContext(General)


  return (
    <div id="contacto_container">
      <img
        id="fondo"
        src={anchopantalla <= 488 ? img_contacto[0] : img_contacto[1]}
        title="fondo de la seccion contacto"
      ></img>
      <div id="info_container">
        <div className="info">
          <label className="etiqueta">Encuentranos en: </label>
          <div className="datos">{contacto.direccion}</div>
        </div>
        <div className="info">
          <label className="etiqueta">Departamentos: </label>
          {contacto.departamentos.map((elem, i) => (
            <div className="datos" key={i}>{elem}</div>
          ))}
        </div>
        <div className="info">
          <label className="etiqueta">Horarios de atencion: </label>
          <div className="datos">{contacto.horarioatencion}</div>
        </div>
        <div className="info">
          <label className="etiqueta">Contacto: </label>
          {contacto.contacto.map((elem, i) => (
            <div className="datos" key={i}>{elem}</div>
          ))}
        </div>
      </div>
      <div id="logos_container">
        <img src={img_contacto_logos[0]} id="sra_logo"></img>
        <img src={img_contacto_logos[1]} id="ipcva_logo"></img>
      </div>
    </div>
  );
}