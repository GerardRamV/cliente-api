import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';
import Producto from './Producto';

const Productos = () => {

    const [productos, guardarProductos] = useState([]);

    const consultarAPI = async () => {
        const productosConsulta = await clienteAxios.get('/productos');
        guardarProductos(productosConsulta.data);
    };

    useEffect( () => {
        consultarAPI();
    }, []);

    if (!productos.length) {
        return (
            <Spinner />
        );
    }

    return (
        <Fragment>
            <h2>Productos</h2>

            <Link to="/productos/nuevo" className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {
                    productos.map(producto => {
                        return <Producto
                            key={producto._id}
                            producto={producto}
                        />
                    })
                }
            </ul>
        </Fragment>
    );
}
 
export default Productos;