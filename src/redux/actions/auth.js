import axiosClient from '../../config/axiosClient';
import { types } from '../types/types';
import Swal from 'sweetalert2';

const errorHandling = (error) => {
    console.log('error:', error);
    if (error.response) {
        Swal.fire('¡Error!', error.response.data.message, 'error');
    } else {
        if (error.request) {
            Swal.fire('¡Error!', 'Error en la solicitud, contacte al administrador', 'error');
        } else {
            Swal.fire('¡Error!', 'Ha ocurrido un error general, contacte al administrador', 'error');
        }
    }
}

export const startLogin = (email, pass) => {
    return async(dispatch) => {
        try {
            const resp = await axiosClient.post('login?device=WebApp', { email, pass }, {});
            localStorage.setItem('none-token', resp.data.token);
            localStorage.setItem('none-token-init-date', new Date().getTime());
            dispatch(setRole(resp.data.role));
            dispatch(login(resp.data.user));
        } catch (error) {
            dispatch(checkingFinished());
            errorHandling(error);
        }
    }
}

const login = (user) => ({
    type: types.authStartLogin,
    payload: user
})

const setRole = (role) => ({
    type: types.authSetRole,
    payload: role
});

const checkingFinished = () => ({
    type: types.authCheckingFinished
});

export const startChecking = () => {

    const token = localStorage.getItem('none-token');

    return async(dispatch) => {
        try {
            if (!token) {
                console.log('Por favor, inicia sesión');
                dispatch(checkingFinished());
            } else {
                const resp = await axiosClient.get('login/renew', {
                    headers: {
                        'none-token': token
                    }
                });
                localStorage.setItem('none-token', resp.data.token);
                localStorage.setItem('none-token-init-date', new Date().getTime());
                dispatch(setRole(resp.data.role));
                dispatch(login(resp.data.user));
            }
        } catch (error) {
            dispatch(checkingFinished());
            errorHandling(error);
        }
    }
}

export const startLogout = (userID) => {
    const token = localStorage.getItem('none-token');
    return async(dispatch) => {
        try {
            const resp = await axiosClient.delete(`login/logout/${ userID }`, {
                headers: {
                    'none-token': token
                }
            });
            if (resp.data.ok) {
                localStorage.removeItem('none-token');
                localStorage.removeItem('none-token-init-date');
                dispatch(logout());
            }
            console.log('resp:', resp.data);
            Swal.fire('Correcto', resp.data.message, 'success');
        } catch (error) {
            console.log('error:', error);
            errorHandling(error);
        }
    }
}

const logout = () => ({
    type: types.authLogout
});