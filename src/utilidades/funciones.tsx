import Cookies from 'js-cookie'
import { Meses } from '../interfaces/Interfaces'

export const cookiename = '1AcFGGG.aas__243#$5'

export function fetchData(dir: string, body: string, method: string): Promise<any> {
  return new Promise((res, rej) => {
    fetch(dir, { body: body, method: method, headers: { 'Content-Type': 'application/json' }} as RequestInit)
      .then(response => {
        if(response.ok) (response.text() || response.json()).then(response => res(response))
        else if(response.status == 404) rej(response)
        else rej(response)
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