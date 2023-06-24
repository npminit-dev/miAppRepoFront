import React, { Dispatch, SetStateAction } from 'react'
import { SiHappycow } from 'react-icons/si'
import { Seleccion } from '~/interfaces/Interfaces'

type props = {
  setseleccion: Dispatch<SetStateAction<Seleccion>>
}

export default function Logo({ setseleccion }: props): JSX.Element {
  return (
    <div id='logo_container' onClick={() => setseleccion('INICIO')}>
      <SiHappycow id='logo'></SiHappycow>
      <span id='marca'>Carnes Pampeanas</span>
    </div>
  )
}