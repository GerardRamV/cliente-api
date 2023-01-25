import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';

const NuevoPedido = () => {
    const navigate = useNavigate();
    const {clienteId} = useParams();
    
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal] = useState(0);

    useEffect(() => {

        const consultarAPI = async () => {
            const resultado = await clienteAxios.get(`/clientes/${clienteId}`);
            guardarCliente(resultado.data);
        };

        consultarAPI();
    }, []);

    useEffect(() => {
        actualizarTotal();
    }, [productos]);

    const buscarProducto = async (e) => {
        e.preventDefault();
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
        
        if (resultadoBusqueda.data[0]) {
            
            let productoResultado = resultadoBusqueda.data[0];
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 1;
            if (productos.some(e => e.producto === resultadoBusqueda.data[0]._id)) {return;}
            guardarProductos([...productos, productoResultado])
        } else {
            Swal.fire(
                'Sin resultados',
                `No se han encontrado resultados para "${busqueda}"`,
                'error'
            );
        }
    };

    const leerDatosBusqueda = (e) => {
        guardarBusqueda(e.target.value);
    };

    const restarProducto = (index) => {
        const todosProductos = [...productos];
        if (productos[index].cantidad === 1) return;
        todosProductos[index].cantidad--;
        guardarProductos(todosProductos);
    };

    const sumarProducto = (index) => {
        const todosProductos = [...productos];
        todosProductos[index].cantidad++;
        guardarProductos(todosProductos);
    };

    const actualizarTotal = () => {
        if (productos.length === 0) {
            guardarTotal(0);
            return;
        }

        let nuevoTotal = 0;
        productos.map(producto => nuevoTotal += (producto.precio * producto.cantidad));

        guardarTotal(nuevoTotal);
    };

    const eliminarProducto = (id) => {
        const todosProductos = productos.filter(producto => 
            producto.producto !== id
        );
        guardarProductos(todosProductos);
    };

    const realizarPedido = async (e) => {
        e.preventDefault();
        const pedido = {
            cliente: clienteId,
            pedido: productos,
            total: total.toFixed(2)
        };
        const resultado = await clienteAxios.post(`/pedidos`, pedido);
        if (resultado.status === 200) {
            Swal.fire(
                'Pedido enviado',
                resultado.data.mensaje,
                'success'
            );
        } else {
            Swal.fire(
                'Hubo un error',
                'Error al crear el pedido',
                'error'
            );
        }
        navigate('/pedidos');
    };

    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>{cliente.nombre} {cliente.apellido} ({cliente.empresa})</p>
            </div>

            <FormBuscarProducto buscarProducto={buscarProducto} leerDatosBusqueda={leerDatosBusqueda} />

            <ul className="resumen">
                {
                    productos.map((producto, index) => {
                        return <FormCantidadProducto key={producto.producto} producto={producto} restarProducto={restarProducto} sumarProducto={sumarProducto} index={index} eliminarProducto={eliminarProducto} />
                    })
                }
            </ul>
            <p className='total'>Total a pagar: <span>$ {total.toFixed(2)}</span></p>
            {
                total > 0 ? (
                    <form onSubmit={realizarPedido}>
                        <input type="submit" className='btn btn-verde btn-block' value="Realizar pedido" />
                    </form>
                ) : null
            }
        </Fragment>
    );
}
 
export default NuevoPedido;