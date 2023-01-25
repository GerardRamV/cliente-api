import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContext';
import Spinner from '../layout/Spinner';
import Cliente from './Cliente';

const Clientes = () => {
    const navigate = useNavigate();
    const [clientes, guardarClientes] = useState([]);

    const [auth, guardarAuth] = useContext(CRMContext);
    
    const consultarAPI = async () => {

        if (auth.token !== '') {
            try {
                const clientesConsulta = await clienteAxios.get('/clientes', {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                guardarClientes(clientesConsulta.data);
            } catch (error) {
                console.log(error.response);
                if (error.response.status === 500) {
                    navigate('/login');
                }
            }
            
        } else {
            navigate('/login');
        }
    };

    useEffect( () => {
        consultarAPI();
    }, []);

    if (!clientes.length) {
        return (
            <Spinner />
        );
    }

    return (
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
                {
                    clientes.map(cliente => {
                        return <Cliente
                            key={cliente._id}
                            cliente={cliente}
                        />
                    })
                }
            </ul>
        </Fragment>
    );
}
 
export default Clientes;