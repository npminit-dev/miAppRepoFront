import React, { Dispatch, useRef, useState, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { Meses } from "../../interfaces/Interfaces";
import { animarCierreModal, añobase, es30Dias, es31Dias, esBisiesto, fetchData, validarContraseña } from '../../utilidades/funciones';
import '../../estilos/registroform.css'
import { AiFillCloseCircle } from 'react-icons/ai'

type myprops = { setModalRegistro: Dispatch<SetStateAction<boolean>> } 

export default function RegistroForm({ setModalRegistro }: myprops ): JSX.Element {

  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm()

  const contenedor = useRef<HTMLDivElement>();
  const err_caja = useRef<HTMLDivElement>();

  const [msjexito, setmsjexito] = useState<boolean>(false)
  const [mes, setmes] = useState<Meses>()
  const [año, setaño] = useState<number>();


  const registrar = async(datos: any) => {
    let datosFinales = { Alias: datos.Alias, Nombres: datos.Nombres, Apellido: datos.Apellido,
      FechaNac: `${datos.DiaNac}-${datos.MesNac}-${datos.AñoNac}`,
      Edad: datos.Edad, Email: datos.Email, Telefono: datos.Telefono, Contraseña: datos.Contraseña }
    try{      
      await fetchData('http://localhost:3002/usuarios/registrar', JSON.stringify(datosFinales), 'post', 'application/json')
      setmsjexito(true)
      err_caja.current.style.display = 'none'
      clearErrors('conflict')
      setTimeout(() => animarCierreModal(contenedor, setModalRegistro), 3000)
    } catch(err) {
      let error: Array<string|boolean> = await err.json()
      if(error[0]) setError('Alias', { type: 'conflict', message: 'El alias de usuario ya existe en nuestros registros, intente con otro' }, { shouldFocus: true })
      else setError('Email', { type: 'conflict', message: 'La direccion de E-mail ya existe en nuestros registros, intente con otra' }, { shouldFocus: true })
    }
  }

  return (
    <div id="registroform_fondo" ref={contenedor}>
      <div id="registro_contenedor">
        <AiFillCloseCircle id="cerrar_icono" onClick={() => animarCierreModal(contenedor, setModalRegistro)}></AiFillCloseCircle>
        <form id="registro_form" onSubmit={handleSubmit(registrar)}>
          <div className="registro_campo">
            <label>ALIAS</label>
            <input type="text" title="Ingrese el alias nuevo para su cuenta" {...register('Alias', {
              required: true,
              pattern: /^[\w\d\-\.]{7,50}$/g
            })}></input>
          </div>
          <div className="registro_campo">
            <label>NOMBRES</label>
            <input type="text" title="Ingrese su nombre completo" {...register('Nombres', {
              required: true,
              pattern: /^[A-Z][a-z]{1,50}(\s)*([A-Z][a-z]{1,50})?$/g
            })}></input>
          </div>
          <div className="registro_campo">
            <label>APELLIDO</label>
            <input type="text" title="Ingrese su apellido" {...register('Apellido', {
              required: true,
              pattern: /^[A-Z][a-z]{1,50}\s?([A-Z][a-z]{1,50})?$/
            })}></input>
          </div>
          <div className="registro_campo">
            <label>EDAD</label>
            <input type="number" min='0' title="Ingrese su edad" {...register('Edad', {
              required: true,
              pattern: /^([0-9]{1,2}|1[0-3][0-9])$/g
            })}></input>
          </div>
          <div className="registro_campo">
            <label>FECHA DE NACIMIENTO</label>

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
                <option value='1'>ENERO</option>
                <option value='2'>FEBRERO</option>
                <option value='3'>MARZO</option>
                <option value='4'>ABRIL</option>
                <option value='5'>MAYO</option>
                <option value='6'>JUNIO</option>
                <option value='7'>JULIO</option>
                <option value='8'>AGOSTO</option>
                <option value='9'>SEPTIEMBRE</option>
                <option value='10'>OCTUBRE</option>
                <option value='11'>NOVIEMBRE</option>
                <option value='12'>DICIEMBRE</option>
              </select>

              <select title='seleccione su año de nacimiento' defaultValue={añobase()} {...register('AñoNac', {
                required: true
              })} onChange={e => setaño(parseInt(e.target.value))}>
                { Array.from({length: 100}, (_, i) => añobase() - i)
                    .map((elem, i) => <option key={i} value={elem}>{elem}</option>)
                }
              </select>

          </div>
          <div className="registro_campo">
            <label>E-MAIL</label>
            <input type="text" title="Ingrese su direccion de E-Mail" {...register('Email', {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}></input>
          </div>
          <div className="registro_campo">
            <label>TELEFONO</label>
            <input type="text" title="Ingrese su numero de contacto" {...register('Telefono', {
              required: true,
              minLength: 7,
              maxLength: 30,
              pattern: /^\d{7,30}$/g
            })}></input>
          </div>
          <div className="registro_campo">
            <label>CONTRASEÑA</label>
            <input type="password" title="Ingrese la nueva contraseña" {...register('Contraseña', {
              required: true,
              pattern: /^[-.\w\d]{10,150}$/g,
              validate: (pass) => validarContraseña(pass) === true
            })}></input>
          </div>
          <div id="err_caja" ref={err_caja}>
            { errors.Alias?.type === 'pattern' ? <div id='err_msg'>El alias debe contar con minimo 7 digitos y maximo 50, puede tener letras, numeros y los simbolos '.', '-' y '_'</div>
            : errors.Alias?.type === 'required' ? <div id='err_msg'>El campo Alias es obligatorio</div>
            : errors.Alias?.type === 'conflict' ? <div>  { errors.Alias?.message as any }  </div>
            : errors.Nombres?.type === 'pattern' ? <div id='err_msg'>El campo Nombre debe tener uno o dos nombres comenzados con mayusculas y separados por espacio</div>
            : errors.Nombres?.type === 'required' ? <div id='err_mgs'>El campo Nombres es obligatorio</div>
            : errors.Apellido?.type === 'pattern' ? <div id='err_msg'>El campo Apellido debe tener uno o dos nombres comenzados con mayusculas y separados por espacio</div>
            : errors.Apellido?.type === 'required' ? <div id='err_mgs'>El campo Apellido es obligatorio</div>
            : errors.Edad?.type === 'pattern' ? <div id='err_msg'>El campo edad contiene un valor incorrecto</div>
            : errors.Edad?.type === 'required' ? <div id='err_msg'>El campo Edad es obligatorio</div>
            : errors.Email?.type === 'pattern' ? <div id='err_msg'>El campo EMail contiene una cadena invalida</div>
            : errors.Email?.type === 'required' ? <div id='err_msg'>El campo EMail es obligatorio</div>
            : errors.Email?.type === 'conflict' ? <div> { errors.Email?.message as any } </div>
            : errors.Telefono?.type === 'pattern' ? <div id='err_msg'>El campo telefono debe contener solo numeros</div>
            : errors.Telefono?.type === 'required' ? <div id="err_msg">El campo Telefono es obligatorio</div>
            : errors.Telefono?.type === 'minLength' ? <div id='err_msg'>El campo Telefono no excede los caracteres minimos -7- </div>
            : errors.Telefono?.type === 'maxLength' ? <div id='err_msg'>El campo Telefono excede los caracteres maximos -30- </div>
            : errors.Contraseña?.type === 'pattern' ? <div id='err_msg'>El campo Contraseña debe tener una longitud de 10 a 150 caracteres y solo se permiten los simbolos '.', '-', '_'</div>
            : errors.Contraseña?.type === 'required' ? <div id='err_msg'>El campo Contraseña es obligatorio</div>
            : errors.Contraseña?.type === 'validate' ? <div id='err_msg'>El campo Contraseña debe tener al menos un digito, una letra minuscula y una mayuscula</div>
            : <></>
            }
          </div>
          { msjexito && <div id='exito_msg'>Has sido registrado correctamente! inicia sesion con el usuario y contraseña registrados</div> }
          <input type="submit" value={'REGISTRARME'}></input>
        </form>
      </div>
    </div>
  );
}