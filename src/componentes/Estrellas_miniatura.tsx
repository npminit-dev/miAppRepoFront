import React, { EventHandler, useEffect, useState } from 'react';
import { MdStarRate } from 'react-icons/md';
import '../estilos/estrellas.css';

interface Es_props {
  punt_prom: number;
}

function rellenar(punt_prom: number): string[] {
  let arr = [];
  for (let i = 1; i <= Math.floor(punt_prom); i++) arr.push('100');
  if(punt_prom % 1 !== 0){
    let decimal: string = '' + `${punt_prom % 1}`.split('.')[1];
    if(decimal.length == 1) arr.push(`${decimal}`.slice(0, 1) + '0')
    else arr.push(`${decimal}`.slice(0, 2))
  }
  return arr;
}

export default function Estrellas({punt_prom}: Es_props): JSX.Element {
  
  const [estrellas, setestrellas] = useState<number>(0);

  useEffect(() => {
    setestrellas(punt_prom);
  }, [punt_prom]);

  return (
    <div id='es_contenedor'>
      <div id='es_contenedor_es'>
      {rellenar(estrellas).map((elem, i) => {
        return (
          <MdStarRate
            style={{
              clipPath: `polygon(0 0, ${elem}% 0, ${elem}% 100%, 0 100%)`,
            }}
            key={i}
            className='estrella'
          ></MdStarRate>
        );
      })}
      </div>
      <span id='es_info'>{estrellas}/5</span>
    </div>
  );
}
