import React, { Dispatch, DispatchWithoutAction, useEffect, useReducer, useRef, useState } from "react";
import '../estilos/editando.css'

export default function Editando(): JSX.Element {

  const [intervalo, setintervalo] = useState<NodeJS.Timeout>();
  const [puntos, setpuntos] = useState<number>(0)

/*
hay que tener cuidado con los intervals/timeouts y los estados de React
aunque usemos la funcion que cambia el estado, ese estado se vera reflejado fuera del timeout/interval pero dentro de el es diferente.
Dentro del callback del timer, siempre se conserva el estado inicial (0), cada intento de modificar la variable 'puntos' lanzara una nueva
instancia del componente con el nuevo valor, pero el callback no se movera magicamente hacia esa instancia (ver clousures) 
por lo que se mantendra el valor inicial (al menos dentro del callback) y nuestros if's no funcionarian teniendo siempre puntos = 0

pude solucionarlo de las siguientes maneras:
*/

  // declarando una variable local a la funcion animar, pero fuera del scope del interval:

  // const animar = () => {
  //   let puntoreference = 0
  //   setintervalo(setInterval(() => {
  //     console.log(puntoreference)
  //     if(puntoreference < 3) {
  //       setpuntos(puntos => puntos + 1)
  //       puntoreference++
  //     }
  //     else {
  //       setpuntos(puntos => puntos = 0)
  //       puntoreference = 0
  //     }
  //   }, 500))
  // }


  // con un useRef que almacene el valor de 'puntos' fuera del ambito del interval para usarlo dentro de los if's

  // const editando = useRef<number>(0);
  // const animar = () => {
  //   setintervalo(setInterval(() => {
  //     if(editando.current < 3) {
  //       setpuntos(puntos => puntos + 1)
  //       editando.current++
  //     }
  //     else {
  //       setpuntos(puntos => puntos = 0)
  //       editando.current = 0
  //     }
  //   }, 500))
  // }


  // limpiando el interval en cada re-renderizado de 'puntos' con un useEffect que tenga 'puntos' como dependencia:

  // const animar = () => {
  //   setintervalo(setInterval(() => {
  //     console.log(puntos)
  //     if(puntos < 3) setpuntos(puntos => puntos + 1)
  //     else setpuntos(puntos => puntos = 0)
  //   }, 500))
  // }

  // useEffect(() => {
  //   if(intervalo) clearInterval(intervalo)
  //   animar()
  // }, [puntos])


  interface acciones {
    type: 'INCREMENTAR' | 'REINICIAR' | 'DECREMENTAR'
  }

  const [punts, dispatch]: [number, Dispatch<acciones>] = useReducer((state: number, action: acciones) => {
    switch(action.type) {
      case 'INCREMENTAR': return state + 1
      case 'REINICIAR': return 0
      default: return null
    }
  }, 0)

  const animar = () => {
    let aux = 0;
    setintervalo(setInterval(() => {
      if(aux < 3) {
        dispatch({type: 'INCREMENTAR'})
        aux ++
      }
      else {
        dispatch({type: 'REINICIAR'})
        aux = 0
      }
    }, 300))
  }

  useEffect(() => {
    animar();
    return () => intervalo && clearInterval(intervalo)
  }, [])

  return (
    <div id="editando_contenedor">
      <span id="editando_texto">Editando{'.'.repeat(punts)}</span>
    </div>
  )
}

