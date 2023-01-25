// @ts-check
import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const NuevoProducto = () => {
    const navigate = useNavigate();

    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    });

    const [archivo, guardarArchivo] = useState('');

    /** @param {Object} e */
    const leerDatosFormulario = (e) => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        });
    };

    /** @param {Object} e */
    const leerArchivo = (e) => {
        guardarArchivo(e.target.files[0]);
    };

    const validarProducto = () => {
        const {nombre, precio} = producto;

        let validado = !nombre.length || !precio.length;

        return validado;
    };

    /** @param {Object} e */
    const agregarProducto = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nombre', producto.nombre);
            formData.append('precio', producto.precio);
            formData.append('imagen', archivo);
            const res = await clienteAxios.post('/productos', formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });
            if (res.status === 200) {
                Swal.fire(
                    'Se agrego el producto!',
                    res.data.mensaje,
                    'success'
                ).then((result) => {
                    navigate("/productos");
                });
            } else {
                Swal.fire(
                    'Hubo un error',
                    'Vuelve a intentarlo',
                    'error'
                ).then((result) => {
                    navigate("/productos");
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire(
                'Hubo un error',
                'Vuelve a intentarlo',
                'error'
            );
        }

    };

    return (
        <Fragment>
            <form onSubmit={agregarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={leerDatosFormulario}/>
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" onChange={leerDatosFormulario}/>
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  name="imagen" onChange={leerArchivo}/>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Producto" disabled={validarProducto()}/>
                </div>
            </form>
        </Fragment>
    );
};

export default NuevoProducto;