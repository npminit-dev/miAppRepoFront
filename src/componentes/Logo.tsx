import React from 'react'
import { SiHappycow } from 'react-icons/si'

export default function Logo(): JSX.Element {
  return (
    <div id='logo_container'>
      <SiHappycow id='logo'></SiHappycow>
      <span id='marca'>Carnes Pampeanas</span>
    </div>
  )
}