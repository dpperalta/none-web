import axiosClient from '../../config/axiosClient';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { removePersonStudent } from './person';

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

// Create a new studente
export const startCreateStudent = (student) => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            const token = localStorage.getItem('none-token');
            const resp = await axiosClient.post('student', student, {
                headers: {
                    'none-token': token
                }
            });
            dispatch(createStudent(resp.data.student));
            dispatch(removePersonStudent(student.personID));
            Swal.fire('¡Correcto!', resp.data.message, 'success');
        } catch (error) {
            errorHandling(error);
            dispatch(createStudentError());
        }
        dispatch(endChecking());
    }
}

const startChecking = () => ({
    type: types.studentStartChecking
});

const endChecking = () => ({
    type: types.studentCheckingFinished
});

const createStudentError = () => ({
    type: types.studentCreateError
});

const createStudent = (student) => ({
    type: types.studentCreateOK,
    payload: student
});

// Get students information for a logged teacher
export const startGetTeacherStudents = (teacherID) => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            const token = localStorage.getItem('none-token');
            const resp = await axiosClient.get(`student/teacher/${ teacherID }`, {
                headers: {
                    'none-token': token
                }
            });
            console.log('resp: ', resp.data);
            dispatch(getTeacherStudents(resp.data.students));
        } catch (error) {
            errorHandling(error);
            dispatch(getTeacherStudentsError());
        }
        dispatch(endChecking());
    }
}

const getTeacherStudentsError = () => ({
    type: types.studentGetTeacherStudentError
});

const getTeacherStudents = (students) => ({
    type: types.studentGetTeacherStudentOK,
    payload: students
});