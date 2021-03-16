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

export const startCreateTelephone = (phone) => {
    return async(dispatch) => {
        try {
            const token = localStorage.getItem('none-token');
            const resp = await axiosClient.post('telephone', phone, {
                headers: {
                    'none-token': token
                }
            });
            dispatch(createPhone(resp.data.telephone));
        } catch (error) {
            dispatch(createPhoneError());
            errorHandling(error);
        }
    }
}

const createPhoneError = () => ({
    type: types.phoneClearError
});

const createPhone = (phone) => ({
    type: types.phoneCreateOK,
    payload: phone
});