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

// Getting all exams of a subject
export const startGetSubjectExams = (subjectID) => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            const token = localStorage.getItem('none-token');
            const resp = await axiosClient.get(`/exam/subject/${ subjectID }`, {
                headers: {
                    'none-token': token
                }
            });
            console.log('ACA');
            console.log(resp.data);
            dispatch(getSubjectExams(resp.data.exams));
        } catch (error) {
            errorHandling(error);
            dispatch(getSubjectExamsError());
        }
        dispatch(endChecking());
    }
}

const startChecking = () => ({
    type: types.examStartChecking
});

const endChecking = () => ({
    type: types.examCheckingFinished
});

const getSubjectExamsError = () => ({
    type: types.examGetSubjectExamError
});

const getSubjectExams = (exams) => ({
    type: types.examGetSubjectExamOK,
    payload: exams
});

// Create a new exam
export const startCreateExam = (exam) => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            console.log ('EL TOKEN', token);
            const resp = await axiosClient.post('exam', exam, {
                headers: {
                    'none-token': token
                }
            });
           
            dispatch(createExam(resp.data.exam));
            Swal.fire('¡Correcto!', resp.data.message, 'success');
        } catch (error) {
            errorHandling(error);
            dispatch(createExamError());
        }
        dispatch(endChecking());
    }
}

const createExamError = () => ({
    type: types.examCreateError
});

const createExam = (exam) => ({
    type: types.examCreateOK,
    payload: exam
});

// Select a subject from de list
export const startExamSelection = (exam) => {
    return (dispatch) => {
        dispatch(selectExam(exam));
    }
}
const selectExam = (exam) => ({
    type: types.examSelectExam,
    payload: exam
})
