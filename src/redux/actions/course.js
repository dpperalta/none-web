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
            const token = localStorage.getItem('none-token');
            const resp = await axiosClient.post('course', course, {
                headers: {
                    'none-token': token
                }
            });
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

// Select a course from de list
export const startCourseSelection = (course) => {
    return (dispatch) => {
        dispatch(selectCourse(course));
    }
}

const selectCourse = (course) => ({
    type: types.courseSelectCourse,
    payload: course
});

// Get active courses for student registration
export const startGetActiveCourses = () => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            const token = localStorage.getItem('none-token');
            const resp = await axiosClient.get('course/college/active', {
                headers: {
                    'none-token': token
                }
            });
            dispatch(getActiveCourses(resp.data.courses));
        } catch (error) {
            errorHandling(error);
            dispatch(getActiveCoursesError());
        }
        dispatch(endChecking());
    }
}

const getActiveCoursesError = () => ({
    type: types.courseGetActiveCoursesError
});

const getActiveCourses = (courses) => ({
    type: types.courseGetAtiveCoursesOK,
    payload: courses
});