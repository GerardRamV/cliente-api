import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContext';

const Login = () => {
    const navigate = useNavigate();

    const [credenciales, guardarCredenciales] = useState({});

    const [auth, guardarAuth] = useContext(CRMContext);

    // useEffect(() => { 
    //     const token = localStorage.getItem('token'); 
    //     if(token){ 
    //         guardarAuth({ token, auth: true }); 
    //         navigate('/');
    //     } 
    // }, []);

    const leerDatos = (e) => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        });
    };

    const iniciarSesion = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);
            const {token} = respuesta.data;
            localStorage.setItem('token', token);

            guardarAuth({token, auth: true});

            Swal.fire(
                'Login Correcto',
                'Se ha iniciado sesion correctamente',
                'success'
            );
            navigate('/');
        } catch (error) {
            console.log(error);
            Swal.fire(
                'Hubo un error',
                error.response.data.mensaje,
                'error'
            )
        }
    };
    
    return (
        <div className='login'>
            <h2>Iniciar sesion</h2>

            <div className='contenedor-formulario'>
                <form onSubmit={iniciarSesion}>
                    <div className='campo'>
                        <label>Email</label>
                        <input type="text" name='email' placeholder='Email' required onChange={leerDatos} />
                    </div>

                    <div className='campo'>
                        <label>Password</label>
                        <input type="password" name='password' placeholder='Password' required onChange={leerDatos} />
                    </div>

                    <input type="submit" value="Iniciar sesion" className='btn btn-verde btn-block' />
                </form>
            </div>
        </div>
    );
}
 
export default Login;