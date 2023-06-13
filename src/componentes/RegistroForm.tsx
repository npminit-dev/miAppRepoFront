import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Meses } from "~/interfaces/Interfaces";

export default function RegistroForm(): JSX.Element {

  const { register, handleSubmit } = useForm()

  function mostrar(datos: FormData) {
    console.log(datos)
  }

  const añobase = (): number => new Date(Date.now()).getFullYear() - 18

  const [mes, setmes] = useState<Meses>()
  const [año, setaño] = useState<number>();

  const es30Dias = (mes: Meses): boolean => mes === 'ABRIL' || mes === 'JUNIO' || mes ==='SEPTIEMBRE' || mes === 'NOVIEMBRE'
  const es31Dias = (mes: Meses): boolean => mes === 'ENERO' || mes === 'MARZO' || mes === 'MAYO' || mes === 'JULIO' || mes === 'AGOSTO' || mes === 'OCTUBRE' || mes === 'DICIEMBRE'
  const esBisiesto = (año: number) => año % 4 === 0 && !(año % 100 === 0 && año % 400 !== 0)

  useEffect(() => {

  }, [])

  return (
    <div id="registroform_fondo">
      <div id="registro_contenedor">
        <form onSubmit={handleSubmit(mostrar)}>
          <div className="regitro_campo">
            <label>Alias</label>
            <input type="text" {...register('Alias', {
              required: true,
              pattern: /^\w{5,35}$/g
            })}></input>
          </div>
          <div className="regitro_campo">
            <label>Nombres</label>
            <input type="text" {...register('Nombres', {
              required: true,
              pattern: /^[a-zA-Z]{2,50}(\s)*([a-zA-Z]{2,50})?$/g
            })}></input>
          </div>
          <div className="regitro_campo">
            <label>Apellido</label>
            <input type="text" {...register('Apellido', {
              required: true,
              pattern: /^[a-zA-Z]{2,50}$/
            })}></input>
          </div>
          <div className="regitro_campo">
            <label>Fecha De Nacimiento</label>

              <select title='Seleccione su dia de nacimiento' defaultValue={1}{...register('DiaNac', {
                required: true
              })}>
                <option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option>
                <option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option>
                <option value='11'>11</option><option value='12'>12</option><option value='13'>13</option><option value='14'>14</option><option value='15'>15</option>
                <option value='16'>16</option><option value='17'>17</option><option value='18'>18</option><option value='19'>19</option><option value='20'>20</option>
                <option value='21'>21</option><option value='22'>22</option><option value='23'>23</option><option value='24'>24</option><option value='25'>25</option>
                <option value='26'>26</option><option value='27'>27</option><option value='28'>28</option>
                { es30Dias(mes)
                ? <>
                  <option value='29'>29</option>
                  <option value='30'>30</option> 
                </>
                : es31Dias(mes) 
                ? <>
                  <option value='29'>29</option>
                  <option value='30'>30</option> 
                  <option value='31'>31</option> 
                </> 
                : esBisiesto(año) 
                ? <option value='29'>29</option>
                : <></>
                }
              </select>

              <select title='Seleccione su mes de nacimiento' defaultValue={'ENERO'} {...register('MesNac', {
                required: true,
              })} onChange={(e) => setmes(e.target.value as Meses)}>
                <option value='ENERO'>ENERO</option>
                <option value='FEBRERO'>FEBRERO</option>
                <option value='MARZO'>MARZO</option>
                <option value='ABRIL'>ABRIL</option>
                <option value='MAYO'>MAYO</option>
                <option value='JUNIO'>JUNIO</option>
                <option value='JULIO'>JULIO</option>
                <option value='AGOSTO'>AGOSTO</option>
                <option value='SEPTIEMBRE'>SEPTIEMBRE</option>
                <option value='OCTUBRE'>OCTUBRE</option>
                <option value='NOVIEMBRE'>NOVIEMBRE</option>
                <option value='DICIEMBRE'>DICIEMBRE</option>
              </select>

              <select title='seleccione su año de nacimiento' defaultValue={añobase()} {...register('AñoNac', {
                required: true
              })} onChange={e => setaño(parseInt(e.target.value))}>
                { Array.from({length: 100}, (_, i) => añobase() - i)
                    .map((elem, i) => <option key={i} value={elem}>{elem}</option>)
                }
              </select>

          </div>
          <div className="regitro_campo">
            <label>Edad</label>
            <input type="number" min='0' {...register('Edad', {
              required: true,
              pattern: /^([0-9]{1,2}|1[0-3][0-9])$/g
            })}></input>
          </div>
          <div className="regitro_campo">
            <label>E-mail</label>
            <input type="text" {...register('Email', {
              required: true
            })}></input>
          </div>
          <div className="regitro_campo">
            <label>Telefono/Celular</label>
            <input type="text" {...register('Telefono', {
              required: true
            })}></input>
          </div>
          <div className="regitro_campo">
            <label>Contraseña</label>
            <input type="password" {...register('Contraseña', {
              required: true
            })}></input>
          </div>
         
          <input type="submit" value={'REGISTRARME'}></input>
        </form>
      </div>
    </div>
  );
}