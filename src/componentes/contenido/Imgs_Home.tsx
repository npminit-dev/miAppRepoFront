import React, { useRef, useState } from "react";
import '../../estilos/home.css'
import { imgarr_tupla } from '../../interfaces/Interfaces';
import { useEffect } from 'react';

type props = { imgarr: imgarr_tupla }

const keyframe = [{opacity: 1, transform: 'scale(100%, 100%)'}, { opacity: 0, transform: 'scale(120%, 120%)' }];
const opts = { duration: 1000, fill: 'forwards', easing: 'ease-in' } as KeyframeAnimationOptions;

export default function Imgs_Home({imgarr}: props): JSX.Element {

  const imgRefs = useRef<HTMLImageElement[]>([])

  const [timers, settimers] = useState<NodeJS.Timeout[]>([])
  const [animaciones, setanimaciones] = useState<Animation[]>([])

  useEffect(() => {

    let index = imgRefs.current.length - 1;

    const animar = async() => {  
      while(index >= 0) {
        await delay(2250);
        if (index !== 0) {
          await animarImg(imgRefs.current[index])
          index --;
        } else {
          imgRefs?.current[imgRefs.current.length - 1].animate(keyframe.slice().reverse(), opts)
          await animarImg(imgRefs.current[index])
          limpiarTimersYAnimaciones();
          index = imgRefs.current.length - 1
        }
      }
    }

    animar();

    return () => {
      limpiarTimersYAnimaciones()
    }
  }, [])

  const delay = async (delay: number): Promise<string> => {
    return new Promise((res, rej) => {
      let timer = setTimeout(() => {
        settimers(timers => [...timers, timer])
        res('')
      }, delay)
    })
  }

  const animarImg = async (img: HTMLImageElement): Promise<string> => {
    return new Promise((res, rej) => {
      try {
        settimers(timers => [...timers, setTimeout(() => res(''), opts.duration as number)])
        setanimaciones(animaciones => [...animaciones, img?.animate(keyframe, opts)])
      } catch(err) {
        console.log(`Error en animarImg: ${err}`)
      }
    })
  }

  const limpiarTimersYAnimaciones = () => {
    try {
      timers.forEach(timer => clearTimeout(timer))
      imgRefs.current.forEach(img => img?.animate([{ opacity: 1, transform: 'scale(100%, 100%)' }], {duration: 0, fill: 'forwards'}))
      animaciones.forEach(anim => anim?.cancel())
    } catch(error) {
      alert(`Error en LimpiarTimersYAnimaciones: ${error}`)
    }
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