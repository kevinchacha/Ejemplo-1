import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { helpHttp } from "../../helpers/helpHttp";
import { useForm } from "../../form/useForm";
import { UserContext } from "../contexts/UserContext"



export const Login = () => {
    
    const {user, setUser} = useContext(UserContext)

    const navigate = useNavigate();
    let initialState = {
        usuario:'',
        contrasenia: ''
    }
    

    const validateForm = (formValues) => {
        let errors ={}
        if (!formValues.usuario.trim()){
            errors.usuario = 'Campo usuario vacio';
        }
        if (!formValues.contrasenia.trim()){
            errors.usuario = 'Campo contraseña vacio';
        }
        return errors
    };

    const api = helpHttp();
    let url = "http://localhost:3500/usuario?usuario=";

    const [ formValues, handleInputChange, 
            setValues, handleInputBlur, error, setError ] = useForm(initialState,validateForm);
    const handleLogin = async (e) => {
        e.preventDefault();
        const user = await api.get(url+formValues.usuario);

        if (user.length != 0){
            if (formValues.usuario == user[0].usuario && formValues.contrasenia == user[0].contrasenia){
                setUser(user[0]);
                if (user[0].tipo == 'admin'){
                    navigate('admin',{
                        replace:true
                    })
                }else{
                    navigate('empleado',{
                        replace:true
                    })
                }
            }
        }


        
    }

    return (
        <>
        <div className="h-100 gradient-form"  style={{backgroundColor: "lightblue"}}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-xl-10">
                    <div className="card rounded-3 text-black">
                    <div className="row g-0">
                        <div className="col-lg-6">
                        <div className="card-body p-md-5 mx-md-4">

                            <div className="text-center">
                            <img src={"https://krugercorp.com/wp-content/uploads/2022/02/2.gif"}
                                alt="logo" style={{width: "185px"}} />
                            </div>
                            <form onSubmit={handleLogin}>
                            <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="usuario">Username</label>
                                <input type="text" id="usuario" className="form-control"
                                placeholder="Ingresa tu email"   value={formValues.usuario}  name="usuario"  onChange={handleInputChange}/>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="contrasenia">Password</label>
                                <input type="password" id="contrasenia" className="form-control" name="contrasenia" value={formValues.contrasenia}  placeholder="Ingresa tu Password" onChange={handleInputChange}/>
                            </div>

                            <div className="text-center pt-1 mb-5 pb-1">
                                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Log
                                in</button>
                            </div>
                            </form>
                        </div>
                        </div>
                        <div className="col-lg-6 d-flex align-items-center gradient-custom-2" style={{backgroundColor: "orange"}}>
                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                            <h4 className="mb-4">Inventario de vacunación de empleados</h4>
                            <img src={"https://i0.wp.com/www.krugerlabs.com/wp-content/uploads/2019/03/hitos-krugerlabs.png?fit=560%2C500&ssl=1"}
                                alt="logo" style={{width: "185px"}} />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}