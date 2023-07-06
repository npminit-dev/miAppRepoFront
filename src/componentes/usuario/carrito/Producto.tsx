import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
import { Carrito_Prod } from '~/interfaces/Interfaces'
import { HiPlus, HiMinus } from 'react-icons/hi'
import '../../../estilos/producto.css'

type props = {
  Nombre: string,
  Precio: number,
  Cantidad: number,
  Subtotal: number
  Index: number,
  setcarrito: Dispatch<SetStateAction<Carrito_Prod[]>>
}

export default function Producto(p: props): JSX.Element {

  const [cant, setcant] = useState<number>(p.Cantidad)

  const incrementar = () => {
    setcant(cant => {
      if(cant < 100) return cant + 1
      else return cant
    })
  }

  const decrementar = () => {
    setcant(cant => {
      if(cant > 1) return cant - 1 
      else return cant
    })
  }

  const manejarDel = () => {
    p.setcarrito(carr_temp => {
      return carr_temp.filter((_, i) => i !== p.Index)
    })
  }

  useEffect(() => {
    p.setcarrito(carr => {
      let nuevoEstado = [...carr]
      nuevoEstado[p.Index].Cantidad = cant
      return nuevoEstado
    })
  }, [cant])

  return (
    <div className='prod_container'>
      <div className='prod_nombre'>{ p.Nombre }</div>
      <div className='prod_cantidad_controles'>
        <div className='prod_cantidad_incrementar' title='Quitar unidad'
          onClick={() => decrementar()}>
          <HiMinus className='decrementar_ico'></HiMinus>
        </div>
        <div className='prod_cantidad'>{ p.Cantidad } Kg.</div>
        <div className='prod_cantidad_decrementar' title='Agregar unidad'
          onClick={() => incrementar()}>
          <HiPlus className='incrementar_ico'></HiPlus>
        </div>  
      </div> 
      <div className='prod_precio' title='Precio x unidad'>U$D { p.Precio }</div>
      <div className='prod_subtotal' title='Subtotal'>U$D { p.Subtotal.toFixed(2) }</div>
      <button className='del_btn' type='button' title='Eliminar producto del carrito'
        onClick={() => manejarDel()}>
        <AiTwotoneDelete className='del_ico'></AiTwotoneDelete>
      </button>
    </div>
  )
}