import axiosClient from '../../config/axiosClient';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import moment from 'moment';
import { startCreateAddress } from './address';
import { startCreateUser } from './user';
import { startCreateTelephone } from './telephone';

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

// Create a new person
export const startCreatePerson = (personData) => {
    return async(dispatch) => {
        const token = localStorage.getItem('none-token');
        dispatch(startChecking());
        let person = personData.person;
        let address = personData.address;
        let homePhone = personData.homePhone;
        let mobilePhone = personData.mobilePhone;
        let user = personData.user;
        let formattedDate = moment(person.birthdate).format('YYYY-MM-DD');
        person.birthdate = formattedDate;
        console.log('person:', person);
        try {
            const resp = await axiosClient.post('person', person, {
                headers: {
                    'none-token': token
                }
            });
            if (resp.data.ok) {
                dispatch(createPerson(resp.data.person));

                address.personID = resp.data.person.personID;
                user.personID = resp.data.person.personID;

                dispatch(startCreateAddress(address));
                dispatch(startCreateUser(user));

                if (homePhone) {
                    homePhone.personID = resp.data.person.personID;
                    dispatch(startCreateTelephone(homePhone));
                }
                if (mobilePhone) {
                    mobilePhone.personID = resp.data.person.personID;
                    dispatch(startCreateTelephone(mobilePhone));
                }
            }
            Swal.fire('¡Correcto!', 'Datos registrados correctamente', 'success');
        } catch (error) {
            dispatch(createError());
            errorHandling(error);
        }
        dispatch(endChecking());
    }
}

const createError = () => ({
    type: types.personCreatingError
});

const createPerson = (person) => ({
    type: types.personCreatingOK,
    payload: person
});

const startChecking = () => ({
    type: types.personStartChecking
});

const endChecking = () => ({
    type: types.personCheckingFinished
});

// Get person's information by the authenticated user
export const startGettingPerson = (personID) => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            const token = localStorage.getItem('none-token');
            const resp = await axiosClient.get(`person/${ personID }`, {
                headers: {
                    'none-token': token
                }
            });
            dispatch(getPerson(resp.data.person));
        } catch (error) {
            errorHandling(error);
            dispatch(getPersonError());
        }
        dispatch(endChecking());
    }
}

const getPersonError = () => ({
    type: types.personGetPersonError
});

const getPerson = (person) => ({
    type: types.personGetPersonOK,
    payload: person
});

// Get person's information for perston type Student and no student assigned
export const startGetPersonToStudent = () => {
    return async(dispatch) => {
        dispatch(startChecking());
        try {
            const token = localStorage.getItem('none-token');
            const resp = await axiosClient.get('person/student/unassigned', {
                headers: {
                    'none-token': token
                }
            });
            dispatch(getPersonStudent(resp.data.people));
        } catch (error) {
            errorHandling(error);
            dispatch(getPersonStudentError());
        }
        dispatch(endChecking());
    }
}

const getPersonStudentError = () => ({
    type: types.personGetPersonStudentError
});

const getPersonStudent = (people) => ({
    type: types.personGetPersonStudenOK,
    payload: people
});

export const removePersonStudent = (personID) => {
    console.log('Entra a eliminar:', personID);
    return {
        type: types.personRemovePersonStudent,
        payload: personID
    }
}