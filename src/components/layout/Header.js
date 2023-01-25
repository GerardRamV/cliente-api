import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

const Header = () => {
    const navigate = useNavigate();
    const [auth, guardarAuth] = useContext(CRMContext);

    const cerrarSesion = () => {
        guardarAuth({
            token: '',
            auth: false
        });

        localStorage.removeItem('token');
        navigate('/login');
    };

    return (<header className="barra">
        <div className="contenedor">
            <div className="contenido-barra">
                <h1>CRM - Administrador de Clientes</h1>

                { 
                    auth.auth ? (
                        <button type="button" className="btn btn-rojo" onClick={cerrarSesion}>
                            <i className="far far-times-circle"></i>
                            Cerrar sesion
                        </button>
                    ) : null
                }
            </div>
        </div>
    </header>);
};

export default Header;