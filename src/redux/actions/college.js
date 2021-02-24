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

export const startCreateCollege = (college) => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            console.log('college:', college);
            const resp = await axiosClient.post('college', college, {
                headers: {
                    'none-token': token
                }
            });
            console.log(resp.data.newCollege);
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

/*
const createPerson = (person) => ({
    type: types.personCreatingOK,
    payload: person
});

const createError = () => ({
    type: types.personCreatingError
});


const createError = () => ({
    type: types.personCreatingError
});


const createPersonCheckingStart = () => ({
    type: types.personStartChecking
});

const createPersonCheckingEnd = () => ({
    type: types.personCheckingFinished
});
*/