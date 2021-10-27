import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../assets/css/login-register.css'
import { AuthContext } from '../auth/AuthContext'

const RegisterPage = () => {

    const {register} = useContext(AuthContext)

    const [form, setForm] = useState({
        name : '',
        lastName : '',
        email : '',
        password : ''
    })
    const {name, lastName, email, password} = form

    const onChange = (e) => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name] : value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const msg = await register(name, lastName, email, password)

        if(msg !== true){
            Swal.fire('Error', msg, 'error')
        }
    }
    const todoOk = () => {
        return (email.length > 0 && 
                password.length > 0 && 
                name.length > 0 &&
                lastName.length > 0
                ) ? true : false
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row d-flex">
                    <div className="col-6 container-login d-flex justify-content-center align-items-center flex-column">
                        <h2 className="text-login mb-4">Registrate</h2>

                        <form action="" className="d-flex flex-column gap-1" onSubmit={onSubmit} >
                            <div className="wrap-input100 validate-input mb-3 d-flex align-items-center">
                                <i className="fas fa-user icon-user" />
                                <input 
                                className="input100" 
                                type="text" 
                                name="name" 
                                placeholder="Nombre"
                                value={name}
                                onChange={onChange}
                                />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="wrap-input100 validate-input mb-3 d-flex align-items-center">
                                <i className="fas fa-user icon-user" />
                                <input 
                                className="input100" 
                                type="text" 
                                name="lastName" 
                                placeholder="Apellido"
                                value={lastName}
                                onChange={onChange}

                                />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="wrap-input100 validate-input mb-3 d-flex align-items-center">
                                <i className="fas fa-envelope" />
                                <input 
                                className="input100" 
                                type="email" 
                                name="email" 
                                placeholder="Email"
                                value={email}
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
                                <div className="col">
                                </div>
                                <div className="col text-right">
                                    <Link to="/auth/login">¿Tienes Cuenta?</Link>
                                </div>
                            </div>
                            <div className="container-login100-form-btn m-t-17">
                                <button 
                                className="login100-form-btn"
                                type="submit"
                                disabled={!todoOk()}
                                >
                                    Crear Cuenta
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-6 container-background2 d-flex flex-column justify-content-around gap-5 align-items-center p-3">
                        <div className="box-text mt-4">
                            <h2 className="text-white">Bienvenido a <span className="text-login-company">INTOPCOL</span></h2>
                            <p className="text-white text-center mb-2 text-acoount">¿Ya tienes una cuenta?</p>
                            <button className="btn btn-register"><Link to="/auth/login" className="text-white">Inicia Sesión</Link></button>
                        </div>
                        <div className="box-img mt-3">
                            <img src="../assets/img/register.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage