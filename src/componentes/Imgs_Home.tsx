import React, { useRef, useState } from "react";
import '../estilos/home.css'

import { imgarr_tupla } from '../interfaces/Interfaces';
import { useEffect } from 'react';

const keyframe = [{opacity: 0}];
const opts = { duration: 1200 } as KeyframeAnimationOptions;

export default function Imgs_Home({imgarr}: {imgarr: imgarr_tupla}): JSX.Element {

  const imgRefs = useRef<HTMLImageElement[]>([])

  const [timers, settimers] = useState<NodeJS.Timeout[]>([])
  const [animaciones, setanimaciones] = useState<Animation[]>([])

  useEffect(() => {

    let index = imgRefs.current.length - 1;

    const animar = async() => {  
      while(index >= 0) {
        if(index === 0) {
          await delay(8000)
          mostrarTodo()
          limpiarTimersYAnimaciones()
          index = imgRefs.current.length - 1;
        } else {
          await delay(7000);
          await animarimg(imgRefs.current[index]);
          index--;
        }
      }
    }

    animar();

    return () => {
      limpiarTimersYAnimaciones()
      imgRefs.current = []
      console.log('desmontado')
    }
  }, [])

  const mostrarTodo = () => imgRefs.current.forEach(elem => elem.style.display = 'inline')

  const delay = async (delay: number): Promise<string> => {
    return new Promise((res, rej) => {
      let timer = setTimeout(() => {
        settimers(timers => [...timers, timer])
        res('')
      }, delay)
    })
  }

  const animarimg = async (img: HTMLImageElement): Promise<string> => {
    return new Promise((res, rej) => {
      setanimaciones(animaciones => [...animaciones, img.animate(keyframe, opts)])
      settimers(timers => [...timers, 
        setTimeout(() => { 
          img.style.display = 'none';
          res('')
        }, opts.duration as number)
      ])
    })
  }

  const limpiarTimersYAnimaciones = () => {
    timers.forEach(timer => clearTimeout(timer))
    animaciones.forEach(anim => anim.cancel())
    settimers([])
    setanimaciones([])
  }
  
  return (
    <>
      {imgarr.map((elem, i) => {
        return <img 
        src={elem} 
        className="img" 
        title="imagen de presentacion" 
        alt={`imagen de fondo de la presentacion`} 
        key={i} 
        ref={ref => (imgRefs.current[i] = ref)}></img>
      })}
    </>
  )
}