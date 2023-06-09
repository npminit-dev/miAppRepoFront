import Cookies from 'js-cookie'
import { Criterio, Meses, Orden, Producto } from '../interfaces/Interfaces'
import { ComponentRef, Dispatch, RefObject } from 'react'
import SetStateAction from 'react';

export const cookiename = '1AcFGGG.aas__243#$5'

export function fetchData(dir: string, body: string | JSON, method: string, header: string): Promise<any> {
  return new Promise((res, rej) => {
    fetch(dir, { body: body, method: method, headers: { 'Content-Type': `${header}` }} as RequestInit)
      .then(response => {
        if(response.ok) (response.text() || response.json()).then(response => res(response))
        else if(response.status == 404) rej(response)
        else rej(response.text())
      }).catch(err => {
        console.log(err)
      })
  })
}

export const existelaGalleta = (): boolean => Cookies.get('1AcFGGG.aas__243#$5') ? true : false

export function obtenerGalleta(): string | undefined {
  if(existelaGalleta()){
    return Cookies.get('1AcFGGG.aas__243#$5')
  } else throw new Error('Recurso 1AcFGGG.aas__243#$5 no encontrado')
}

export function crearGalleta(payload: string, exp: number) {
  if(!existelaGalleta()) {
    const _15dias = new Date();
    _15dias.setTime(_15dias.getTime() + (exp * 24 * 60 * 60 * 1000));
    Cookies.set('1AcFGGG.aas__243#$5', payload, { expires: _15dias, secure: true })
  }
}

  
export const es30Dias = (mes: Meses): boolean => mes === 'ABRIL' || mes === 'JUNIO' || mes === 'SEPTIEMBRE' || mes === 'NOVIEMBRE'
export const es31Dias = (mes: Meses): boolean => mes === 'ENERO' || mes === 'MARZO' || mes === 'MAYO' || mes === 'JULIO' || mes === 'AGOSTO' || mes === 'OCTUBRE' || mes === 'DICIEMBRE'
export const esBisiesto = (año: number) => año % 4 === 0 && !(año % 100 === 0 && año % 400 !== 0)
export const añobase = (): number => new Date(Date.now()).getFullYear() - 18

export const validarContraseña = (cadena: string): boolean => {
  let tieneNumero;
  let tieneMayus;
  let tieneMinus;
  for( let i = 0; i < cadena.length; i++) {
    if(isNaN(cadena[i] as unknown as number)) {
      if(cadena[i] === cadena[i].toLocaleLowerCase()) tieneMinus = true;
      else if(cadena[i] === cadena[i].toUpperCase()) tieneMayus = true;
    } else tieneNumero = true
  }
  return tieneNumero && tieneMinus && tieneMayus
}

export const animarCierreModal = (elemento: RefObject<HTMLElement>, funcionEstado?: Function) => {
  elemento.current.animate([{opacity: 1}, { opacity: 0, display: 'none' }], { duration: 150, fill: 'forwards' })
    .onfinish = (e) => !funcionEstado ? elemento.current.style.display = 'none' : funcionEstado(false)
}

export const revertirFecha = ( cadena: string ): string => cadena.split('-').reverse().join('-')

export const normalizarCamelCase = (cadena: string): string => {
  let normalizada = "";
  let primeraPalabra = true;
  for (let i = 0; i < cadena.length; i++) {
    if (cadena[i] === cadena[i].toUpperCase()) {
      normalizada += " ";
      if (primeraPalabra) {
        normalizada += cadena[i];
        primeraPalabra = false;
      } else normalizada += cadena[i].toLowerCase();
    } else normalizada += cadena[i];
  }
  return normalizada;
};

export const recortarDateDB = (cadena: string) => cadena.split('T')[0]

export const ordenar = (productos: Producto[], criterio: Criterio, orden: Orden): Promise<Producto[]> => {
  return new Promise(async(res, rej) => {
    switch(criterio) {
      case 'nombre':
        try {
          let jsonprods: Response | Producto[] = await fetch('http://localhost:3002/prods/nombre/asc')
          jsonprods = await jsonprods.json() as Producto[]
          if(orden === 'desc') jsonprods.reverse()
          res(jsonprods)
        } catch(err) {
          rej(err)
        } 
      case 'precio':
        try {
          let jsonprods: Response | Producto[] = await fetch('http://localhost:3002/prods/precio/asc')
          jsonprods = await jsonprods.json() as Producto[]
          if(orden === 'desc') jsonprods.reverse()
          res(jsonprods)
        } catch(err) {
          rej(err)
        } 
      case 'categoria':
        try {
          let jsonprods: Response | Producto[] = await fetch('http://localhost:3002/prods/categoria/asc')
          jsonprods = await jsonprods.json() as Producto[]
          if(orden === 'desc') jsonprods.reverse()
          res(jsonprods)
        } catch(err) {
          rej(err)
        } 
    }
  })
}

export const ordenarPorRango = (prodslista: Producto[], limiteinferior: string, limitesuperior: string): Producto[] => {
  let min = parseInt(limiteinferior)
  let max = parseInt(limitesuperior)
  if(isNaN(min) || isNaN(max)) throw new Error('no se han podido convertir los rangos a enteros')
  return prodslista.reduce((acc, curr) => {
    if(curr.Precio >= min && curr.Precio <= max) acc[0].push(curr)
    else acc[1].push(curr)
    return acc
  }, [[], []] as Array<Producto[]>).flat()
}


export const ordenarPorBusqueda = (prodslista: Producto[], cadena: string): Producto[] => {
  console.log(cadena)
  return prodslista.reduce((acc, curr) => {
    if(RegExp('^' + cadena + '(.*)?$', 'mi')
      .test(curr.NombreProducto)) acc[0].push(curr)
    else if(RegExp('^(.+)' + cadena + '(.*)?$', 'mi')
      .test(curr.NombreProducto)) acc[1].push(curr)
    else acc[2].push(curr)
    return acc
  }, [[], [], []] as Array<Producto[]>).flat()
}

  