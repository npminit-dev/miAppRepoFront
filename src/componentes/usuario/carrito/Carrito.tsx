import React, { useContext, useState, useRef, useReducer, useEffect, SetStateAction, EventHandler} from "react";
import { General } from "../../../contextos/General";
import { fetchData } from "../../../utilidades/funciones";
import { FaCartPlus } from "react-icons/fa";
import { RiSave3Fill } from "react-icons/ri";
import { ImExit } from 'react-icons/im'
import { Carrito_Prod } from "../../../interfaces/Interfaces";
import BarraOrdenamiento from "./BarraOrdenamiento";
import Producto from "./Producto";
import '../../../estilos/carrito.css'

export default function Carrito(): JSX.Element {

  const { carrito, setcarrito, carritovisible, setcarritovisible, jwt } = useContext(General)
  const [total, settotal] = useState<number>(0)
  const contenedor = useRef<HTMLDivElement>()
  const guardarmsj = useRef<HTMLDivElement>()
  const msjtimer = useRef<NodeJS.Timeout>()
  const animacion = useRef<Animation>()

  const obtenerCarrito = async() => {
    try {
      let carrito = await fetchData('http://localhost:3002/usuarios/micarrito', jwt, 'POST', 'text/plain')
      carrito = await JSON.parse(carrito)
      setcarrito(carrito)
    } catch(err) {
      console.log(await err)
    }
  }

  const guardarCarrito = async() => {
    try {
      await fetchData('http://localhost:3002/usuarios/micarrito/vaciar', jwt, 'DELETE', 'text/plain')
      for(let i = 0; i < carrito.length; i++) 
        await fetchData('http://localhost:3002/usuarios/micarrito/agregar', JSON.stringify([
          jwt, { ProductoID: carrito[i].ProductoID, Cantidad: carrito[i].Cantidad }
        ]), 'PUT', 'application/json')
      obtenerCarrito();
      guardarmsj.current.textContent = 'Los cambios en el carrito han sido guardados en tu perfil!'
      msjtimer.current = setTimeout(() => guardarmsj.current.textContent = '', 3000)
    } catch(err) {
      console.log(await err)
    }
  }

  const manejarCierre = (e: any) => {
    contenedor.current.animate([
      { opacity: 1, right: '0', filter: 'grayscale(0)' },
      { opacity: 0, right: '-25px', filter: 'grayscale(1)' }
    ], { duration: 300, fill: 'forwards', easing: 'cubic-bezier(.73,.15,.9,.25)' })
    .onfinish = () => setcarritovisible(false)
  }

  useEffect(() => {
    if(jwt && !carrito.length) obtenerCarrito();
  }, [jwt])

  useEffect(() => {
    if(carrito) settotal(total => carrito?.reduce((acc, curr) => acc = acc + (curr.Cantidad * curr.PrecioXUnidad), 0))
    else settotal(0)
  }, [carrito])

  useEffect(() => {
    if(carritovisible) contenedor.current.animate([
      { opacity: 0, right: '-25px', filter: 'grayscale(1)' },
      { opacity: 1, right: '0', filter: 'grayscale(0)' }
    ], { duration: 300, fill: 'forwards', easing: 'cubic-bezier(.1,.9,.51,.98)' })
    return () => {
      if(msjtimer) clearTimeout(msjtimer.current)}
  }, [carritovisible])

  return (
    carritovisible ? 
    <div id="carrito_fondo" onClick={(e) => {
      manejarCierre(e)
    }}>
      <section id="carrito_contenedor" onClick={(e) => e.stopPropagation()} ref={contenedor}>
        <div id="carrito_contenedor_interior">
          <div id="carrito_icono_contenedor">
            <FaCartPlus id="carrito_icono"></FaCartPlus>
          </div>
          <BarraOrdenamiento carrito={carrito} setcarrito={setcarrito}></BarraOrdenamiento>
          <div id="carrito_elems_contenedor">
          {
            carrito === undefined 
            ? <div>CARGANDO...</div>
            : carrito.map((elem: Carrito_Prod, idx) => 
              <Producto key={idx}
                Nombre={elem.NombreProducto}
                Precio={elem.PrecioXUnidad}
                Cantidad={elem.Cantidad}
                Subtotal={elem.Cantidad * elem.PrecioXUnidad}
                Index={idx}
                setcarrito={setcarrito}
              ></Producto>
            )
          }
          </div>
          <div id='carrito_total'>
            <span id='carrito_total_t'>TOTAL: </span>
            <span id='carrito_moneda_t'>U$D {total.toFixed(2)}</span>
          </div>
          <div id='carrito_botones'>
            <button id='carrito_salir' title='Salir de mi perfil'
              onClick={(e) => manejarCierre(e)} 
              ><ImExit id='carrito_salir_icono'></ImExit>
            </button>
            <button id='carrito_guardar' title='Guardar en mi perfil'
              onClick={() => guardarCarrito()}
              ><RiSave3Fill id='carrito_guardar_icono'></RiSave3Fill>
            </button>
          </div>
          <div id='carrito_msj' ref={guardarmsj}></div>
        </div>
      </section>
    </div> 
    : <></>
  )
}
