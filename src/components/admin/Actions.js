import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

export const Actions = ({elemento, eliminar_empleado}) => {
    const navigate = useNavigate();
    const {setEditData} = useContext(UserContext);
    const Actualizar_empleado = () => {
        setEditData(elemento);
        navigate('/registro_usuario')
    }
  return (
    <>
        <tr>
            <td className="text-bold-500">
                <button className='btn btn-success' name="edit_tony" onClick={Actualizar_empleado}>
                    Editar
                </button>
                <button className='btn btn-danger' name='delete' onClick={()=>eliminar_empleado(elemento)}>
                    Eliminar
                </button>
            </td>
        </tr>
    </>
  )
}
