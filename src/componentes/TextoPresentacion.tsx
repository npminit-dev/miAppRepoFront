import React, { useState } from "react";
import { presentacion_arr } from '../datos/home_texto';
import '../estilos/textopresentacion.css'
import { useEffect } from 'react';

async function letra(div: HTMLElement, letra: string): Promise<string>{
  let retraso = Math.round((Math.random() * 100))
  return new Promise(async (res, rej) => {
    let timeout = setTimeout(() => {
      div.textContent += letra
      clearTimeout(timeout)
      if(letra === '.') setTimeout(() => { res('') }, 500)
      else res('')
    }, retraso)
  })
}

async function escribirFrag(div: HTMLElement, frase: string): Promise<string>{
  return new Promise(async (res, rej) => {
    for( let i = 0; i < frase.length; i++ ) await letra(div, frase[i])
    await new Promise(res => { setTimeout(() => res(''), 3500 ) })
    res('')
  })
}

export default function TextoPresentacion(): JSX.Element {

  useEffect(() => {
    async function escribirFrags(){
      let frags = document.getElementsByClassName('texto_frag') as HTMLCollectionOf<HTMLElement>
      for(let i = 0; i < frags.length; i++) await escribirFrag(frags[i], presentacion_arr[i])
    }
    escribirFrags()
  }, [])
  
  return <div id="texto_contenedor">
    { presentacion_arr.map((elem, i) => {
      return <div className="texto_frag" key={i}></div>
    }) }
  </div>
}