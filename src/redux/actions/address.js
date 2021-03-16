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

export const startCreateAddress = (address) => {
    return async(dispatch) => {
        try {
            const token = localStorage.getItem('none-token');
            const resp = await axiosClient.post('address', address, {
                headers: {
                    'none-token': token
                }
            });
            console.log('addressResp:', resp.data.address);
            dispatch(createAddress(resp.data.address));
        } catch (error) {
            errorHandling(error);
            dispatch(createAddressError());
        }
    }
}

const createAddressError = () => ({
    type: types.addressCreateError
});

const createAddress = (address) => ({
    type: types.addressCreateOK,
    payload: address
});