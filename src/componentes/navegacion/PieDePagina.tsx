import React from "react";
import { AiFillFacebook, AiFillTwitterCircle, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'
import '../../estilos/piedepagina.css'

export default function PieDePagina(): JSX.Element{
  return (
    <div id="pie_container">
      <AiFillFacebook className="pie_icono"></AiFillFacebook>
      <AiFillTwitterCircle className="pie_icono"></AiFillTwitterCircle>
      <AiFillInstagram className="pie_icono"></AiFillInstagram>
      <AiFillLinkedin className="pie_icono"></AiFillLinkedin>
    </div>
  )
}