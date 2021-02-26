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

// Getting all teachers form a college
export const startGetCollegeTeachers = (collegeID) => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            const token = localStorage.getItem('none-token');
            const resp = await axiosClient.get(`teacher/college/${ collegeID }`, {
                headers: {
                    'none-token': token
                }
            });
            dispatch(getCollegeTeachers(resp.data.teachers));
        } catch (error) {
            errorHandling(error);
            dispatch(getCollegeTeachersError());
        }
        dispatch(endChecking());
    }
}

const startChecking = () => ({
    type: types.teacherStartChecking
});

const endChecking = () => ({
    type: types.teacherCheckingFinished
});

const getCollegeTeachersError = () => ({
    type: types.teacherGetCollegeTeacherError
});

const getCollegeTeachers = (teachers) => ({
    type: types.teacherGetCollegeTeacherOK,
    payload: teachers
});

// Geatting information of authenticated teacher
export const startGettingTeacher = (personID) => {
    return async(dispatch) => {
        console.log('personID:', personID);
        dispatch(startChecking());
        try {
            const token = localStorage.getItem('none-token');
            const resp = await axiosClient.get(`teacher/person/${ personID }`, {
                headers: {
                    'none-token': token
                }
            });
            console.log('resp:', resp.data.teacher);
            dispatch(getTeacherPerson(resp.data.teacher));
        } catch (error) {
            errorHandling(error);
            dispatch(getTeacherPersonError());
        }
        dispatch(endChecking());
    }
}

const getTeacherPersonError = () => ({
    type: types.teacherGetTeacherPersonError
});

const getTeacherPerson = (teacher) => ({
    type: types.teacherGetTeacherPersonOK,
    payload: teacher
});