import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Login } from "../components/login/Login";
import { Admin } from "../components/admin/Admin";
import { Perfil } from "../components/empleado/Perfil";
import { FormularioRegisto } from "../components/admin/FormularioRegisto";

export const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login></Login>} />
                <Route path="admin" element={<Admin />} />
                <Route path="empleado" element={<Perfil />} />
                <Route path="registro_usuario" element={<FormularioRegisto />} />
            </Routes>
        </Router>
    )
}