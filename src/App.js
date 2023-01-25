import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/layout/Header';
import Navegacion from './components/layout/Navegacion';
import Clientes from "./components/clientes/Clientes";
import NuevoCliente from "./components/clientes/NuevoCliente";
import EditarCliente from "./components/clientes/EditarCliente";
import Productos from "./components/productos/Productos";
import Pedidos from "./components/pedidos/Pedidos";
import NuevoProducto from "./components/productos/NuevoProducto";
import EditarProducto from "./components/productos/EditarProducto";
import NuevoPedido from "./components/pedidos/NuevoPedido";
import EditarPedido from "./components/pedidos/EditarPedido";
import Login from "./components/auth/Login";

import { CRMContext, CRMProvider } from "./context/CRMContext";

function App() {

	const [auth, guardarAuth] = useContext(CRMContext);

	return (
		<Router>
			<Fragment>
				<CRMProvider value={[auth, guardarAuth]}>
					<Header/>
					<div className="grid contenedor contenido-principal">
						<Navegacion/>

						<main className="caja-contenido col-9">
							<Routes>
								<Route path="/" element={<Clientes/>} />
								<Route path="/clientes/nuevo" element={<NuevoCliente/>} />
								<Route path="/clientes/editar/:id" element={<EditarCliente/>} />
								<Route path="/productos" element={<Productos/>} />
								<Route path="/productos/nuevo" element={<NuevoProducto/>} />
								<Route path="/productos/editar/:id" element={<EditarProducto/>} />
								<Route path="/pedidos" element={<Pedidos/>} />
								<Route path="/pedidos/nuevo/:clienteId" element={<NuevoPedido/>} />
								<Route path="/pedidos/editar/:id" element={<EditarPedido/>} />

								<Route path="login" element={<Login />} />
							</Routes>
						</main>
					</div>
				</CRMProvider>
			</Fragment> 
		</Router>
	)
}

export default App;
