import React, { useContext, useEffect, useState } from 'react'
import { helpHttp } from '../../helpers/helpHttp';
import { useForm } from '../../form/useForm';
import { UserContext } from "../contexts/UserContext"
import {NavLink} from 'react-router-dom';
import validator from 'validator';
export const FormularioRegisto = () => {
    const {editData,setEditData} = useContext( UserContext );
    let initialState = {
        cedula: '',
        nombres: '',
        apellidos: '',
        correo: '',
        tipo:'',
        usuario:'',
        contrasenia: ''
    }

    const validateForm = (formValues) =>{
        let errors ={}
        let validar_caracteres = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        if (!validator.isNumeric(formValues.cedula)){
            errors.cedula = 'No se admiten caracteres'
        }else if (String(formValues.cedula).length != 10){
            errors.cedula = 'Solo debe  contener 10 números'
        }
        if (!validar_caracteres.test(formValues.nombres) ){
            errors.nombres = 'No debe contener numeros'
        }
        if (!validar_caracteres.test(formValues.apellidos)){
            errors.apellidos = 'No debe contener numeros'
        }
        if (!validator.isEmail(formValues.correo)){
            errors.correo = 'Correo no es valido'
        }
        
        return errors;
    }

    const [ formValues, handleInputChange, setValues, handleInputBlur, error, setError ] = useForm(initialState,validateForm);
    let api = helpHttp();
    let url = "http://localhost:3500/usuario";

    useEffect(() => {
        if(editData){
            setValues(editData);
        }else{
            setValues(initialState);
        }
    }, [])
    
    const updateData = (data) => {
        let endpoint = `${url}/${data.id}`
        let options = {
            body:data,
            headers: {'Content-Type':'application/json'}
        }
        api.put(endpoint, options).then(res => {
            console.log("Actualizando....")
        })
    }
    
   
    const createData = (data) => {
        data.id = Date.now();
        data.usuario = data.correo;
        data.contrasenia = data.cedula;
        data.tipo = 'user';
        let options = {
            body:data,
            headers: {'Content-Type':'application/json'}
        }
        api.post(url,options).then(res => {
            console.log("Creando")
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validateForm(formValues));
        if (Object.keys(error).length === 0){
            if (formValues.id){
                updateData(formValues)
                alert("Usuario Actualizado")
            }else{
                createData(formValues)
                alert("Usuario registrado")
            }
        }else{
            return;
        }
    };
  return (
    <>
    <div className="card-body" style={{backgroundColor: "orange"}}>
            <h6 className="information mt-4">Ingresar información</h6>
            <form className="form" onSubmit={handleSubmit}>
                <div className="row p-2">
                    <div className="col-sm-12">
                        <div className="form-group">
                        <input  
                            type="text" id="cedula" className="form-control"
                            placeholder="Cedula" name="cedula" 
                            value={formValues.cedula} onChange={handleInputChange}
                            onBlur={handleInputBlur}/>
                            {error.cedula && <p style={{color:"#058744"}}>* {error.cedula}</p>}
                        </div>
                    </div>
                </div>
                <div className="row p-2">
                    <div className="col-sm-12">
                        <div className="form-group">
                        <input type="text" id="nombres" className="form-control"
                                                placeholder="Nombres" 
                                                name="nombres" value={formValues.nombres} 
                                                onChange={handleInputChange}
                                                onBlur={handleInputBlur}/>
                                                {error.nombres && <p style={{color:"#058744"}}>* {error.nombres}</p>}
                        </div>
                    </div>
                </div>
                <div className="row p-2">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input type="text" id="apellidos" className="form-control"
                                                placeholder="Apellidos" name="apellidos" 
                                                value={formValues.apellidos} onChange={handleInputChange}
                                                onBlur={handleInputBlur}/>
                                                {error.apellidos && <p style={{color:"#058744"}}>* {error.apellidos}</p>}
                            
                        </div>
                    </div>
                </div>
                <div className="row p-2">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <input type="email" id="correo" className="form-control"
                                                name="correo" value={formValues.correo} 
                                                placeholder="Email" onChange={handleInputChange}
                                                onBlur={handleInputBlur}/>
                                                {error.correo && <p style={{color:"#058744"}}>* {error.correo}</p>}
                        
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary btn-block confirm-button">Confirmar</button>
                <NavLink
                      className="btn btn-primary m-2"
                      to="/admin"
                    >
                        Volver a Lista
                </NavLink>       
            </form>
    </div>
    </>
  )
}
