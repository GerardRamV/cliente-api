import axios from "axios";
import 'dotenv/config';

const clienteAxios = axios.create({
    baseURL: process.env.BACKEND_URL
});

export default clienteAxios;