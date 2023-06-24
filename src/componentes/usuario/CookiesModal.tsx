import React, { useContext } from 'react'
import { General } from '../../contextos/General';
import { useRef } from 'react';
import '../../estilos/cookiesmodal.css'

export default function CookiesModal(): JSX.Element {

  const { setcookiesenabled, cookiesenabled } = useContext(General);
  const modal = useRef<HTMLDivElement>()
  
  const manejarAceptadas = () => {
    setcookiesenabled(true)
    localStorage.setItem('cookiesenabled', 'true')
  }

  const manejarRechazadas = () => {
    setcookiesenabled(false)
    localStorage.setItem('cookiesenabled', 'false')
  }
  
  return (
    <>
    { cookiesenabled === undefined
    ? <div id='modal_container' ref={modal}>
      <div id="modal">
        <h2 id="titulo">¡Importante! Uso de cookies en nuestro sitio</h2>
        <p className="parrafo">
          Este sitio web utiliza cookies para mejorar tu experiencia de
          navegación y ofrecerte servicios personalizados. Las cookies son
          pequeños archivos de texto que se almacenan en tu dispositivo cuando
          visitas nuestro sitio.
        </p>
        <p className="parrafo">
          Utilizamos cookies esenciales y funcionales que son necesarias para el
          funcionamiento básico del sitio, como recordar tus preferencias de
          idioma o mantener tu sesión iniciada. También utilizamos cookies de
          análisis y marketing para recopilar información anónima sobre cómo
          interactúas con nuestro sitio y mostrar contenido relevante para ti.
        </p>
        <p className="parrafo">
          Al hacer clic en "Aceptar", estás aceptando el uso de todas las
          cookies mencionadas anteriormente. Si no deseas que se utilicen
          ciertas cookies, puedes ajustar tus preferencias en la configuración
          del navegador. Sin embargo, ten en cuenta que la desactivación de
          algunas cookies puede afectar el funcionamiento y la experiencia de
          navegación en nuestro sitio.
        </p>
        <div id="contenedor_botones">
          <button id="aceptar" onClick={manejarAceptadas}>ACEPTAR</button>
          <button id="rechazar" onClick={manejarRechazadas}>RECHAZAR</button>
        </div>
      </div>
    </div>
    : <></>
    }
    </>
  );
}