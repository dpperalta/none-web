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

// Getting all tasks of a subject
export const startGetSubjectTasks = (subjectID) => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            const token = localStorage.getItem('none-token');
            const resp = await axiosClient.get(`/task/subject/${ subjectID }`, {
                headers: {
                    'none-token': token
                }
            });
            dispatch(getSubjectTasks(resp.data.tasks));
        } catch (error) {
            errorHandling(error);
            dispatch(getSubjectTasksError());
        }
        dispatch(endChecking());
    }
}

const startChecking = () => ({
    type: types.taskStartChecking
});

const endChecking = () => ({
    type: types.taskCheckingFinished
});

const getSubjectTasksError = () => ({
    type: types.taskGetSubjectTaskError
});

const getSubjectTasks = (tasks) => ({
    type: types.taskGetSubjectTaskOK,
    payload: tasks
});

// Create a new task
export const startCreateTask = (task) => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            const resp = await axiosClient.post('task', task, {
                headers: {
                    'none-token': token
                }
            });
            dispatch(createTask(resp.data.task));
            Swal.fire('¡Correcto!', resp.data.message, 'success');
        } catch (error) {
            errorHandling(error);
            dispatch(createTaskError());
        }
        dispatch(endChecking());
    }
}

const createTaskError = () => ({
    type: types.taskCreateError
});

const createTask = (task) => ({
    type: types.taskCreateOK,
    payload: task
});