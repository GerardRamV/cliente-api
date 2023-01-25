import React from 'react';
import { Link } from 'react-router-dom';

const Pedido = ({pedido, eliminarPedido}) => {

    return (
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: {pedido._id}</p>
                <p className="nombre">Cliente: {pedido.cliente.nombre} {pedido.cliente.apellido}</p>

                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedido: </p>
                    <ul>
                        {
                            pedido.pedido.map(articulo => (
                                <li key={pedido._id+articulo.producto._id}>
                                    <p>{articulo.producto.nombre}</p>
                                    <p>Precio: ${articulo.producto.precio.toFixed(2)}</p>
                                    <p>Cantidad: {articulo.cantidad}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <p className="total">Total: ${pedido.total.toFixed(2)} </p>
            </div>
            <div className="acciones">
                <Link to={`/pedidos/editar/${pedido._id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Pedido
                </Link>

                <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarPedido(pedido._id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Pedido
                </button>
            </div>
        </li>
    );
}
 
export default Pedido;