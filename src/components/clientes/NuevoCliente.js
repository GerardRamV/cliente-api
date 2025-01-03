import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import clienteAxios from '../../config/axios';

const NuevoCliente = () => {
    const navigate = useNavigate();

    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });


    // Leer datos del formulario
    const actualizarState = e => {
        // Almacenar lo que el usuario ingrese
        guardarCliente({
            // obtener una copia del State actual
            ...cliente,
            [e.target.name] : e.target.value
        });
    };

    // validar formulario
    const validarCliente = () => {
        const {nombre, apellido, empresa, email, telefono} = cliente;

        let validado = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        return validado;
    };

    // Enviar cliente
    const agregarCliente = e => {
        e.preventDefault();
        
        clienteAxios.post('/clientes', cliente)
            .then(res => {
                if (res.data.code === 11000) {
                    Swal.fire(
                        'Hubo un error!',
                        'Cliente ya registrado',
                        'error'
                    ).then((result) => {
                        navigate("/");
                    });
                } else {
                    Swal.fire(
                        'Se agrego el cliente!',
                        res.data.mensaje,
                        'success'
                    ).then((result) => {
                        navigate("/");
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <Fragment>
            <h2>Nuevo Cliente</h2>

            <form onSubmit={agregarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState}/>
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState}/>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Cliente" disabled={validarCliente()}/>
                </div>

            </form>
        </Fragment>
    );
}
 
export default NuevoCliente;