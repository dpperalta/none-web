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

// Creating a new course
export const startCreateCourse = (course) => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            console.log('course:', course);
            const resp = await axiosClient.post('course', course, {
                headers: {
                    'none-token': token
                }
            });
            console.log(resp.data);
            dispatch(createCourse(resp.data.course));
            Swal.fire('¡Correcto!', resp.data.message, 'success');
        } catch (error) {
            errorHandling(error);
            dispatch(createCourseError());
        }
        dispatch(endChecking());
    }
}

const startChecking = () => ({
    type: types.courseStartChecking
});

const endChecking = () => ({
    type: types.courseCheckingFinished
});

const createCourseError = () => ({
    type: types.courseClearError
});

const createCourse = (course) => ({
    type: types.courseCreateOK,
    payload: course
});

// Getting all courses of a college
export const getCollegeCourse = (collegeID) => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            const token = localStorage.getItem('none-token');
            const resp = await axiosClient('course/college/all', {
                headers: {
                    'none-token': token
                }
            });
            //console.log('resp:', resp.data.courses);
            dispatch(getCollegeCourses(resp.data.courses));
        } catch (error) {
            errorHandling(error);
            dispatch(getCollegeCoursesError())
        }
        dispatch(endChecking());
    };
}

const getCollegeCoursesError = () => ({
    type: types.collegeGetCollegeError
});

const getCollegeCourses = (courses) => ({
    type: types.courseGetCollegeCoursesOK,
    payload: courses
});