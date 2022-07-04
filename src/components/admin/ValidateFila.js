import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { UserContext } from '../contexts/UserContext'

export const ValidateFila = ({elemento, eliminar_empleado}) => {
    const navigate = useNavigate();
    const {setEditData} = useContext(UserContext);
    const actualizar_empleado = () => {
        setEditData(elemento);
        navigate('/registro_usuario')
    }
  return (
    <>
        <tr>
            <td className="text-bold-500">{elemento.cedula}</td>
            <td>{elemento.nombres}</td>
            <td className="text-bold-500">{elemento.apellidos}</td>
            <td className="text-bold-500">{elemento.vacuna}</td>
            <td className="text-bold-500">{elemento.tipo_vacuna}</td>
            <td className="text-bold-500">{elemento.usuario}</td>
            <td className="text-bold-500">{elemento.fecha_vacuna}</td>
            <td className="text-bold-500">
                <button className='btn btn-success m-2' name="edit_tony" onClick={actualizar_empleado}>
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
