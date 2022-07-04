import React, { useEffect, useState,useContext } from 'react'
import { UserContext } from '../contexts/UserContext';
import { NavLink ,useNavigate} from "react-router-dom";
import { helpHttp } from '../../helpers/helpHttp'
import { useForm } from '../../form/useForm';
import { ValidateFila } from './ValidateFila';

export const ListaEmpleados = () => {
    //CONSUMO API
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate();
    let api = helpHttp();
    let url = "http://localhost:3500/usuario";
    const [base,setBase] = useState([]);
    const [filter, setFilter] = useState('');
    const [filterDb, setFilterDb] = useState([]);
    let initialState = {
        "vacuna_inicial": '',
        "vacuna_final": '',
    }
    const [ formValues, handleInputChange, setValues] = useForm(initialState,()=>{});
    
    useEffect(() => {
      api.get(url).then(res => {
          if(!res.err){
              setBase(res);
          }else{
              setBase(null);
          }
      })
    }, [])

    const eliminar_empleado = (data) => {
        let endpoint = `${url}/${data.id}`;
        let options = {
                headers: {'Content-Type':'application/json'}
        }
        api.del(endpoint, options).then(res => {
            if (!res.err){
                let newData = base.filter(el => el.id !== data.id)
                setBase(newData);
            }
        })
        
    }

    const filtroTipoVacuna = ({target}) => {
        setFilter(target.value);
        console.log("vin",target.value)
        if (target.value == "Todos"){
            setFilter('');
            setFilterDb([])
        }else{
            let newData = base.filter(el => el.tipo_vacuna === target.value)
            setFilterDb(newData);
        }
    }

    const filtroVacuna = ({target}) => {
        console.log("vin",target.value)
        setFilter(target.value);
        if (target.value == "Todos"){
            setFilter('');
            setFilterDb([])
        }else{
            let newData = base.filter(el => el.vacuna === target.value)
            setFilterDb(newData);
        }
    }

    const filtroFecha = (e) =>{
        console.log(formValues)
        setFilter(formValues.vacuna_inicial);
        if (formValues.vacuna_inicial === "" && formValues.vacuna_final === ""){
            setFilter('');
            setFilterDb([])
        }else{
            let newData = base.filter(el => {
                const original_date = new Date(el.fecha_vacuna);
                const from_date = new Date(formValues.vacuna_inicial);
                const to_date = new Date(formValues.vacuna_final);
                if (original_date >= from_date && original_date <= to_date){
                    return el
                }
            })
            setFilterDb(newData);
        }
    }

    const limpiar = () => {
        setFilter('');
        setFilterDb([])
        setValues(initialState)
    }

    const logOutSession = () => {
        setUser({});
        navigate('/',{
            replace:true
        })
    }
  return (
    <>
    <div class="col-md-12 text-center">
        <button className='btn btn-success mx-4 mt-2' name="salir" onClick={logOutSession}>
                    Salir
        </button>
    </div>
    <div className="table-title m-4"  style={{backgroundColor: "lightblue"}}>
        <div className="row">
            <div className="col-sm-9">
                <h2> <b>Filtros</b></h2>
            </div>
        </div>
    </div>

    <div className="table-title m-4">
        <label className="input-group-text"
           >Filtrar estado de vacunación</label>
        <select className="form-select" id="vacuna" onChange={filtroVacuna}>
            <option value="Todos">Todos</option>
            <option value="si">Si</option>
            <option value="no">No</option>
        </select>
    </div>
    <div className="table-title m-4">
        <label className="input-group-text"
           >Filtrar tipo de vacuna</label>
    <div className="table-title m-4">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" value="Todos" id="flexRadioDefault1" onChange={filtroTipoVacuna}/>
                <label class="form-check-label" htmlFor="flexRadioDefault1">
                Todos
                </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" value="Sputnik" id="flexRadioDefault2" onChange={filtroTipoVacuna}/>
            <label class="form-check-label" htmlFor="flexRadioDefault2">
            Sputnik
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" value="Pfizer" id="flexRadioDefault3" onChange={filtroTipoVacuna}/>
                <label class="form-check-label" htmlFor="flexRadioDefault3">
                Pfizer
                </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" value="AstraZeneca" id="flexRadioDefault4" onChange={filtroTipoVacuna}/>
            <label class="form-check-label" htmlFor="flexRadioDefault4">
            AstraZeneca
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" value="Jhonson&Jhonson" id="flexRadioDefault5" onChange={filtroTipoVacuna}/>
                <label class="form-check-label" htmlFor="flexRadioDefault5">
                Jhonson&Jhonson
                </label>
        </div>
    </div>
    </div>
    <div className="input-group m-4">
        <label className="input-group-text"
           >Filtro por fechas</label>
        <div className="col-sm-8 m-4">
        <label className="input-group-text"
           >DESDE :</label>
        <input type="date" id="vacuna_inicial" className="form-control"
            name="vacuna_inicial" value={formValues.vacuna_inicial} onChange={handleInputChange}/>
        <label className="input-group-text mt-3"
           >HASTA :</label>
        <input type="date" id="vacuna_final" className="form-control"
            name="vacuna_final"  value={formValues.vacuna_final} onChange={handleInputChange} />
        </div>
        <div className="col-sm-10 m-4">
            <button className='btn btn-primary m-1' onClick={filtroFecha} > Filtrar </button>
            <button className='btn btn-secondary m-1' onClick={limpiar} > Limpiar </button>
        </div>
    </div>
   
     <div className="table-title m-4"  style={{backgroundColor: "lightblue"}}>
        <div className="row">
            <div className="col-sm-9">
                <h2> <b>Lista empleados</b></h2>
            </div>
            <div className="col-sm-3">
            <NavLink className="btn btn-success mt-2 mb-2" to="/registro_usuario">Registrar empleado</NavLink>
            </div>
        </div>
    </div>

    <table className="table table-striped table-hover m-4">
        <thead>
            <tr>
            <th>Cédula</th>
             <th>Nombres</th>
             <th>Apellidos</th>
             <th>Vacunado</th>
             <th>Tipo vacuna</th>
             <th>Usuario</th>
             <th>Fecha Vacunación</th>
             <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
        {filterDb === 0 ? null:
                    (filterDb.map((e) => <ValidateFila key={e.id} elemento={e} eliminar_empleado={eliminar_empleado} />))}
        {filter.length === 0 ? (base.map((e) => <ValidateFila key={e.id} elemento={e} eliminar_empleado={eliminar_empleado} />)):null}
        </tbody>
    </table>
    </>
  )
}
