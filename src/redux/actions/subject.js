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

// Getting all subjects of a course
export const startGetCourseSubjects = (courseID) => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            const token = localStorage.getItem('none-token');
            const resp = await axiosClient.get(`/subject/course/${ courseID }`, {
                headers: {
                    'none-token': token
                }
            });
            dispatch(getCourseSubjects(resp.data.subjects));
        } catch (error) {
            errorHandling(error);
            dispatch(getCourseSubjectsError());
        }
        dispatch(endChecking());
    }
}

const startChecking = () => ({
    type: types.subjectStartChecking
});

const endChecking = () => ({
    type: types.subjectCheckingFinished
});

const getCourseSubjectsError = () => ({
    type: types.subjectGetCourseSubjectError
});

const getCourseSubjects = (subjects) => ({
    type: types.subjectGetCourseSubjectOK,
    payload: subjects
});

// Create a new subject
export const startCreateSubject = (subject) => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            const resp = await axiosClient.post('subject', subject, {
                headers: {
                    'none-token': token
                }
            });
            dispatch(createSubject(resp.data.subject));
            Swal.fire('¡Correcto!', resp.data.message, 'success');
        } catch (error) {
            errorHandling(error);
            dispatch(createSubjectError());
        }
        dispatch(endChecking());
    }
}

const createSubjectError = () => ({
    type: types.subjectCreateError
});

const createSubject = (subject) => ({
    type: types.subjectCreateOK,
    payload: subject
});

// Select a course from de list
export const startSubjectSelection = (subject) => {
    return (dispatch) => {
        dispatch(selectSubject(subject));
    }
}
const selectSubject = (subject) => ({
    type: types.subjectSelectSubject,
    payload: subject
})
