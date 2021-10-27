import React, { useContext, useEffect,useState } from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import '../assets/css/login-register.css'
import { AuthContext } from '../auth/AuthContext'


const LoginPage = () => {

    const {login} = useContext(AuthContext)

    const [form, setForm] = useState({
        email : '',
        password: '123456',
        rememberme : false
    })

    useEffect(() => {
        const email = localStorage.getItem('email')
        if(email){
            setForm( (form) => ({
                ...form,
                email,
                rememberme: true
            }))
        }
    }, [])

    const {email, password, rememberme} = form

    const onChange = (e) => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name] : value
        });
    }

    const toggleCheck = () => {
        setForm({
            ...form,
            rememberme: !rememberme
        });
    }

    const onSubmit = async (e) =>{
        e.preventDefault();

        (rememberme)
        ? localStorage.setItem('email', email)
        : localStorage.removeItem('email')

        //Llamar al backend
        const ok = await login(email, password)
        
       if(!ok){
           Swal.fire('Error', 'Verifique el correo y contraseña', 'error')
       }
    }   

    const todoOk = () => {
        return (email.length > 0 && password.length > 0 ) ? true : false
    }

    return (
        <div className="container-fluid">
        <div className="row d-flex">
            <div className="col-6 container-background d-flex flex-column justify-content-around gap-5 align-items-center p-3">
                <div className="box-text mt-4">
                    <h2 className="text-white">Bienvenido a <span className="text-login-company">INTOPCOL</span></h2>
                    <p className="text-white text-center mb-2 text-acoount">¿No tienes aun una cuenta?</p>
                    <button className="btn btn-register"><Link to="/auth/register" className="text-white">Registrate</Link></button>
                </div>
                <div className="box-img mt-3">
                    <img src="../assets/img/freelanceer.svg" alt="" />
                </div>
            </div>
            <div className="col-6 container-login d-flex justify-content-center align-items-center flex-column">
                <h2 className="text-login mb-4">Inicia Sesión</h2>
                <form action="" className="d-flex flex-column gap-1" onSubmit={onSubmit}>

                    <div className="wrap-input100 validate-input mb-3 d-flex align-items-center">
                    <i className="fas fa-envelope" />
                        <input 
                        className="input100" 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value = {email}
                        onChange={onChange}
                        />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input mb-3 d-flex align-items-center">
                        <i className="fas fa-lock icon_security" />
                        <input 
                        className="input100" 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={onChange}
                        />
                        <span className="focus-input100"></span>
                    </div>
                    <div className="row mb-3">
                        <div className="col" onClick={ () => toggleCheck()  }>
                            <input 
                            className="input-checkbox100" 
                            id="ckb1" 
                            type="checkbox" 
                            name="rememberme" 
                            checked={rememberme}
                            readOnly
                            />
                            <label className="label-checkbox100">
                                Recordarme
                            </label>
                        </div>

                        <div className="col text-right">
                            <Link to="/auth/register">¿Nueva Cuenta?</Link>
                        </div>
                    </div>
                    <div className="container-login100-form-btn m-t-17">
                        <button 
                        className="login100-form-btn" 
                        type="submit"
                        disabled={ !todoOk()}
                        >
                            Ingresar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default LoginPage
