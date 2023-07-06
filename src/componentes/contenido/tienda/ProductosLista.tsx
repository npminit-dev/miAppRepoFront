import React, { ReactNode } from 'react'
import { Producto } from '../../../interfaces/Interfaces'

type props = {
  prodslista: Producto[]
}

export default function ProductosLista({ prodslista }: props): JSX.Element {

  const mostrarLista = (): ReactNode[] | ReactNode => {
    if(!prodslista.length) return <div>NO HAY PRODUCTOS DISPONIBLES PARA MOSTRAR</div>
    return prodslista.map((elem, i) => {
      return (
        <div key={i}>
          { elem.NombreProducto }
          { elem.Precio }
        </div>
      )
    })
  }

  return (
    <section>
      { mostrarLista() }
    </section>
  )
}