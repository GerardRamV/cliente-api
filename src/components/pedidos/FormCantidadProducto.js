import React from 'react';

const FormCantidadProducto = (props) => {
    const {producto, index, restarProducto, sumarProducto, eliminarProducto} = props;
    return (
        <li>
            <div className="texto-producto">
                <p className="nombre">{producto.nombre}</p>
                <p className="precio">${producto.precio.toFixed(2)}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i className="fas fa-minus" onClick={() => restarProducto(index)}></i>
                    <p>{producto.cantidad}</p>
                    <i className="fas fa-plus" onClick={() => sumarProducto(index)}></i>
                </div>
                <button type="button" className="btn btn-rojo" onClick={() => eliminarProducto(producto.producto)} >
                    <i className="fas fa-minus-circle"></i>
                        Eliminar Producto
                </button>
            </div>
        </li>
    );
}
 
export default FormCantidadProducto;