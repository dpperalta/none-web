import axiosClient from '../../config/axiosClient';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import moment from 'moment';

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

// Create a new academic period
export const startCreateAcademicPeriod = (academicPeriod) => {
    return async(dispatch) => {
        dispatch(startChecking());
        let academicPeriodObject = academicPeriod;
        academicPeriodObject.startPeriod = moment(academicPeriodObject.startPeriod).format('YYYY-MM-DD');
        academicPeriodObject.endPeriod = moment(academicPeriodObject.endPeriod).format('YYYY-MM-DD');
        try {
            const resp = await axiosClient.post('academicPeriod', academicPeriodObject, {
                headers: {
                    'none-token': token
                }
            });
            dispatch(createAcademicPeriod(resp.data.academicPeriod));
            Swal.fire('¡Correcto!', resp.data.message, 'success');
        } catch (error) {
            errorHandling(error);
        }
        dispatch(endChecking());
    }
}

const startChecking = () => ({
    type: types.aperiodStartChecking
});

const endChecking = () => ({
    type: types.aperiodCheckingFinished
});

const createAcademicPeriodError = () => ({
    type: types.aperiodCreateError
});

const createAcademicPeriod = (academicPeriod) => ({
    type: types.aperiodCreateOK,
    payload: academicPeriod
});