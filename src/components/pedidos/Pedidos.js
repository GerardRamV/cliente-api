import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import Pedido from './Pedido';

const Pedidos = () => {

    const [pedidos, guardarPedidos] = useState([]);

    const consultarAPI = async () => {
        const resultado = await clienteAxios.get(`/pedidos`);
        guardarPedidos(resultado.data);
    };

    useEffect(() => {
        consultarAPI();
    }, []);

    const eliminarPedido = (id) => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Un pedido eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/pedidos/${id}`)
                    .then( res => {
                        Swal.fire(
                            'Eliminado!',
                            res.data.mensaje,
                            'success'
                        ).then(res => {
                            consultarAPI();
                        });
                    });
            }
        });
    };

    return (
        <Fragment>
            <h2>Pedidos</h2>

            <ul className="listado-pedidos">
                {
                    pedidos.map(pedido => {
                        return <Pedido
                            key={pedido._id}
                            pedido={pedido}
                            eliminarPedido={eliminarPedido}
                        />
                    })
                }
            </ul>
        </Fragment>
    );
}
 
export default Pedidos;