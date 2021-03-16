import axiosClient from '../../config/axiosClient';
import { types } from '../types/types';
import Swal from 'sweetalert2';

const token = localStorage.getItem('none-token');

const errorHandling = (error) => {
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

export const startCreateUser = (user) => {
    return async(dispatch) => {
        try {
            const token = localStorage.getItem('none-token');
            const resp = await axiosClient.post('user', user, {
                headers: {
                    'none-token': token
                }
            });
            dispatch(createUser(resp.data.user));
        } catch (error) {
            errorHandling(error);
            dispatch(createUserError());
        }
    }
}

const createUserError = () => ({
    type: types.userCreateError
});

const createUser = (user) => ({
    type: types.userCreateOK,
    payload: user
});