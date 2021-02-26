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

// Creation of a new college
export const startCreateCollege = (college) => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            const resp = await axiosClient.post('college', college, {
                headers: {
                    'none-token': token
                }
            });
            dispatch(createCollege(resp.data.newCollege));
            Swal.fire('¡Correcto!', resp.data.message, 'success');
        } catch (error) {
            errorHandling(error);
            dispatch(createCollegeError());
        }
        dispatch(checkingFinished());
    }
}

const startChecking = () => ({
    type: types.collegeStartChecking
});

const createCollegeError = () => ({
    type: types.collegeCreateError
});

const checkingFinished = () => ({
    type: types.collegeCheckingFinished
});

const createCollege = (college) => ({
    type: types.collegeCreateOK,
    payload: college
});

// Getting information about the user's collge
export const getCollegeInformation = (collegeID) => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            const token = localStorage.getItem('none-token');
            const resp = await axiosClient.get(`college/${ collegeID }`, {
                headers: {
                    'none-token': token
                }
            });
            dispatch(getUsersCollege(resp.data.college));
        } catch (error) {
            errorHandling(error);
            dispatch(getCollegeError());
        }
        dispatch(checkingFinished());
    }
}

const getCollegeError = () => ({
    type: types.collegeGetCollegeError
});

const getUsersCollege = (usersCollege) => ({
    type: types.collegeGetCollegeOK,
    payload: usersCollege
});