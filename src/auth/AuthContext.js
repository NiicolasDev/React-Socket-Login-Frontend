import React, { createContext, useCallback, useContext, useState } from 'react'
import { ChatContext } from '../context/chat/ChatContext';
import { fetchaConToken, fetchaSinToken } from '../helpers/fetch';
import { types } from '../types/types';


export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    apellido: null,
    email: null,
};


const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(initialState);
    const {dispatch} = useContext(ChatContext);

    const login = async (email, password) => {
        const resp = await fetchaSinToken('login', { email, password }, 'POST')

        if (resp.ok) {
            localStorage.setItem('token', resp.token)
            const { user } = resp
            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.nombre,
                apellido: user.apellido,
                email: user.email,
            })
        }

        return resp.ok

    }

    const register = async (nombre, apellido, email, password) => {
        const resp = await fetchaSinToken('login/new', { nombre, apellido, email, password }, 'POST')
        console.log(resp)
        if (resp.ok) {
            localStorage.setItem('token', resp.token)
            const { user } = resp
            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.nombre,
                apellido: user.apellido,
                email: user.email,
            })
            return true
        }

        return resp.msg
    }

    const verificaToken = useCallback(async () => {
        const token = localStorage.getItem('token')

        if (!token) {
             setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                apellido: null,
                email: null,
            })

            return false
        }

        const resp = await fetchaConToken('login/renew')
        if (resp.ok) {
            localStorage.setItem('token', resp.token)
            const { user } = resp
            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.nombre,
                apellido: user.apellido,
                email: user.email,
            })
            return true
        } else {
             setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                apellido: null,
                email: null,
            })
            return false
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('token');

        dispatch({
            type: types.cerrarSesion
        });

        setAuth({
            checking: false,
            logged: false,
        })
    }

    return (
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verificaToken,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
