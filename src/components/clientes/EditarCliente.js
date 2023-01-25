import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from '../../config/axios';

const EditarCliente = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    // Query a la API
    const consultarApi = async () => {
        const clienteConsulta = await clienteAxios(`/clientes/${id}`);
        if (!clienteConsulta.data._id) {
            navigate('/');
        }
        datosCliente(clienteConsulta.data);
    };

    // useEffect, cuando el componente carga
    useEffect( () => {
        consultarApi();
    }, []);

    // Leer datos del formulario
    const actualizarState = e => {
        // Almacenar lo que el usuario ingrese
        datosCliente({
            // obtener una copia del State actual
            ...cliente,
            [e.target.name] : e.target.value
        });
    };

    const actualizarCliente = (e) => {
        e.preventDefault();
        
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
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
                        'Se actualizo el cliente!',
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
    };

    // validar formulario
    const validarCliente = () => {
        const {nombre, apellido, empresa, email, telefono} = cliente;

        let validado = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        return validado;
    };

    // Enviar cliente

    return (
        <Fragment>
            <h2>Editar Cliente</h2>

            <form onSubmit={actualizarCliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Cliente" name="nombre" onChange={actualizarState} value={cliente.nombre}/>
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido" onChange={actualizarState} value={cliente.apellido}/>
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={actualizarState} value={cliente.empresa}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" placeholder="Email Cliente" name="email" onChange={actualizarState} value={cliente.email}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" placeholder="Teléfono Cliente" name="telefono" onChange={actualizarState} value={cliente.telefono}/>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Guardar cambios" disabled={validarCliente()}/>
                </div>

            </form>
        </Fragment>
    );
}
 
export default EditarCliente;