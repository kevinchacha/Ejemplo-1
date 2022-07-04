import { useContext, useState } from "react"
import { helpHttp } from "../../helpers/helpHttp"
import { useForm } from "../../form/useForm"
import { UserContext } from "../contexts/UserContext"


// import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export const Perfil = () => {
    const {user, setUser} = useContext(UserContext);
    const [mostrar,setMostrar]=useState('');
    const navigate = useNavigate();
    let initialState = user;
    const api = helpHttp();
    let url = "http://localhost:3500/usuario";
    const validateForm = () =>{};
    const [ formValues, handleInputChange, 
            setValues, handleInputBlur, error, setError ] = useForm(initialState,validateForm);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues)
        updateData(formValues);
    };
    const getSelectValue1 = ({target}) => {
        formValues.vacuna = target.value
        setMostrar(target.value)
    }
    const getSelectValue2 = ({target}) => {
        formValues.tipo_vacuna = target.value
    }
    const logOutSession = () => {
        setUser({})
        navigate('/',{
            replace:true
        })
    }

    const updateData = (data) => {
        let endpoint = `${url}/${data.id}`
        let options = {
            body:data,
            headers: {'Content-Type':'application/json'}
        }
        api.put(endpoint, options).then(res => {
            if (!res.err){
               alert("Datos Actualizados")
            }
        })
    }

    return (
        <>
        <section id="multiple-column-form">
            <div className="row match-height">
                <div className="col-12">
                    <div className="card">
                    <div className="table-title m-4"  style={{backgroundColor: "lightblue"}}>
                        <div className="row">
                        <div className="col-sm-9">
                        <h2> <b>Datos Personales</b></h2>
                        </div>
                    </div>
                </div>
                        <div className="card-content m-2">
                            <div className="card-body">
                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Cédula</label>
                                                <input 
                                                    type="text" id="cedula" className="form-control"
                                                    placeholder="cedula" name="cedula" 
                                                    value={formValues.cedula} onChange={handleInputChange}
                                                    />
                                                {error.cedula && <p style={{color:"#058744"}}>* {error.cedula}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label >Nombres</label>
                                                <input type="text" id="nombres" className="form-control"
                                                    placeholder="Nombres" 
                                                    name="nombres" value={formValues.nombres} 
                                                    onChange={handleInputChange}
                                                    />
                                                    {error.nombres && <p style={{color:"#058744"}}>* {error.nombres}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label >Apellidos</label>
                                                <input type="text" id="apellidos" className="form-control"
                                                    placeholder="Apellidos" name="apellidos" 
                                                    value={formValues.apellidos} onChange={handleInputChange}
                                                    />
                                                    {error.apellidos && <p style={{color:"#058744"}}>* {error.apellidos}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label >Correo Electrónico</label>
                                                <input type="email" id="correo" className="form-control"
                                                    name="correo" value={formValues.correo} 
                                                    placeholder="Email" onChange={handleInputChange}
                                                    />
                                                    {error.correo && <p style={{color:"#058744"}}>* {error.correo}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label >Fecha de nacimiento</label>
                                                <input type="date" id="fecha_nacimiento" className="form-control"
                                                    name="fecha_nacimiento" value={formValues.fecha_nacimiento} 
                                                    onChange={handleInputChange}    
                                                    />
                                                    {error.fecha_nacimiento && <p style={{color:"#058744"}}>* {error.fecha_nacimiento}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label >Dirección de domicilio</label>
                                                <input type="text" id="direccion" className="form-control"
                                                    name="direccion" value={formValues.direccion} 
                                                    placeholder="Dirección" onChange={handleInputChange}
                                                    />
                                                    {error.direccion && <p style={{color:"#058744"}}>* {error.direccion}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label >Teléfono móvil</label>
                                                <input type="text" id="movil" className="form-control"
                                                    name="movil" value={formValues.movil} 
                                                    placeholder="Movil" onChange={handleInputChange}
                                                    />
                                                    {error.movil && <p style={{color:"#058744"}}>* {error.movil}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <label >Estado de Vacunación</label>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" value="si" name="flexRadioDefault" id="flexRadioDefault1" onChange={getSelectValue1}/>
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    Si
                                                </label>
                                                </div>
                                                <div className="form-check">
                                                <input className="form-check-input" type="radio" value="no" name="flexRadioDefault" id="flexRadioDefault2" onChange={getSelectValue1}/>
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    No
                                                </label>
                                            </div>
                                        </div> 
                                        { mostrar ==="si" && (
                                        <div className="col-md-6 col-12">
                                            <div className="col-md-6 col-12">
                                            <div className="form-group">
                                            <label >Tipo de Vacuna</label>
                                                <select className="form-select" id="tipo_vacuna" 
                                                        defaultValue={formValues.tipo_vacuna}
                                                        onChange={getSelectValue2} >
                                                    <option value="Ninguna">Ninguna</option>
                                                    <option value="Sputnik">Sputnik</option>
                                                    <option value="Pfizer">Pfizer</option>
                                                    <option value="AstraZeneca">AstraZeneca</option>
                                                    <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
                                                </select>
                                                {error.tipo_vacuna && <p style={{color:"#058744"}}>* {error.tipo_vacuna}</p>}
                                            </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div className="form-group">
                                                <label >Fecha de Vacunación</label>
                                                <input type="date" id="fecha_vacuna" className="form-control"
                                                    name="fecha_vacuna" value={formValues.fecha_vacuna}
                                                    onChange={handleInputChange}
                                                    />
                                                    {error.fecha_vacuna && <p style={{color:"#058744"}}>* {error.fecha_vacuna}</p>}
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div className="form-group">
                                                <label >Número de Dosis</label>
                                                <input type="number" id="dosis" className="form-control"
                                                    name="dosis" value={formValues.dosis} 
                                                    placeholder="Num dosis" onChange={handleInputChange}
                                                    />
                                                    {error.dosis && <p style={{color:"#058744"}}>* {error.dosis}</p>}
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                        )
                                        }
                                        <div className="col-12 d-flex justify-content-end">
                                            <button type="submit"
                                                className="btn btn-primary me-1 mb-1">Actualizar</button>
                                            <button type="button"
                                                className="btn btn-success me-1 mb-1" onClick={logOutSession}>Salir</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}