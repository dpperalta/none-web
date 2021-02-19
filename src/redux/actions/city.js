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

export const startGettingCities = () => {
    return async(dispatch) => {
        try {
            const resp = await axiosClient.get('city', {
                headers: {
                    'none-token': token
                }
            });
            console.log('resp:', resp.data.cities.rows);
            dispatch(loadCities(resp.data.cities.rows));
        } catch (error) {
            errorHandling(error);
            dispatch(getCitiesError());
        }
    }
}

const loadCities = (citiesList) => ({
    type: types.cityGetOk,
    payload: citiesList
});

const getCitiesError = () => ({
    type: types.cityGetError
});