import Cookies from 'js-cookie'

export const cookiename = '1AcFGGG.aas__243#$5'

export function fetchData(dir: string, body: string, method: string): Promise<any> {
  return new Promise((res, rej) => {
    fetch(dir, { body: body, method: method, headers: { 'Content-Type': 'application/json' }} as RequestInit)
      .then(response => response.text() || response.json())
      .then(response => res(response)) 
      .catch(err => rej(err))
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