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

export const startGettingOperators = () => {
    const token = localStorage.getItem('none-token');
    return async(dispatch) => {
        try {
            const resp = await axiosClient.get('phoneOperator/active', {
                headers: {
                    'none-token': token
                }
            });
            dispatch(loadPhoneOperators(resp.data.phoneOperators.rows));
        } catch (error) {
            errorHandling(error);
            dispatch(getOperatorsError());
        }
    }
}

const loadPhoneOperators = (operatorsList) => ({
    type: types.operatorGetOK,
    payload: operatorsList
});

const getOperatorsError = () => ({
    type: types.operatorGetError
});