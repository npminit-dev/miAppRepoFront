import React, { useRef, useState } from "react";
import { presentacion_arr } from '../datos/home_texto';
import '../estilos/textopresentacion.css'
import { useEffect } from 'react';


export default function TextoPresentacion(): JSX.Element {

  const fragRefs = useRef<HTMLDivElement[]>([])

  const [timers, settimers] = useState<NodeJS.Timeout[]>([])

  useEffect(() => {

    async function escribir(){
      for(let i = 0; i < fragRefs.current.length; i++) {
        await escribirFrag(fragRefs.current[i], i)
        await retrasofrags();
      }
    }

    escribir()

    return () => {
      limpiarTimers();
      fragRefs.current = []
    }
  }, [])

  const escribirLetra = async (contenedor: HTMLDivElement, letra: string): Promise<string> => {
    return new Promise(async (res, rej) => {
      let delay = retrasoLetra(letra)
      settimers(timers => [...timers, 
        setTimeout(() => {
          contenedor.textContent += letra
          res('')
        }, delay)
      ])
    })
  }

  const escribirFrag = async (contenedor: HTMLDivElement, fragindex: number): Promise<string> => {
    return new Promise(async (res, rej) => {
      for (let i = 0; i < presentacion_arr[fragindex].length; i++){
        await escribirLetra(contenedor, presentacion_arr[fragindex][i])
      }
      res('')
    })
  }

  const retrasoLetra = (letra: string) => letra === '.' ? 1000 : Math.random() * 100

  const retrasofrags = async (): Promise<string> => {
    return new Promise((res, rej) => {
      settimers(timers => [...timers, 
        setTimeout(() => { res('') }, 2000)
      ])
    })
  }

  const limpiarTimers = () => timers.forEach(elem => clearTimeout(elem))

  return (
    <div id="texto_contenedor">
    { presentacion_arr.map((elem, i) => {
      return (
        <div 
          className="texto_frag" 
          key={i} 
          ref={ref => fragRefs.current[i] = ref}>  
        </div>
      )
    }) }
  </div>
  ) 
  

}