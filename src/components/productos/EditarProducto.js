import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

const EditarProducto = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    });

    const leerDatosFormulario = (e) => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        });
    };

    const [archivo, guardarArchivo] = useState('');

    const leerArchivo = (e) => {
        guardarArchivo(e.target.files[0]);
    };

    const validarProducto = () => {
        const {nombre, precio} = producto;

        let validado = !nombre.length || isNaN(precio);

        return validado;
    };

    const consultarApi = async () => {
        const productoConsulta = await clienteAxios(`/productos/${id}`);
        if (!productoConsulta.data._id) {
            navigate('/productos');
        }
        guardarProducto(productoConsulta.data);
    };

    useEffect(() => {
        consultarApi();
    }, []);

    const editarProducto = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nombre', producto.nombre);
            formData.append('precio', producto.precio);
            formData.append('imagen', archivo);
            const res = await clienteAxios.put(`/productos/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });
            if (res.status === 200) {
                Swal.fire(
                    'Se actualizo el producto!',
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
            <form onSubmit={editarProducto}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={leerDatosFormulario} value={producto.nombre}/>
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" name="precio" min="0.00" step="0.01" placeholder="Precio" onChange={leerDatosFormulario} value={producto.precio}/>
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  name="imagen" onChange={leerArchivo}/>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Guardar cambios" disabled={validarProducto()}/>
                </div>

                <div className='campo'>
                    <label>Imagen actual:</label>
                    {
                        producto.imagen ? <img src={`http://localhost:4000/uploads/${producto.imagen}`} alt={`imagen-producto-${producto.nombre}`} className="imgProducto"/> : null
                    }
                </div>
            </form>
        </Fragment>
    )
};

export default EditarProducto;