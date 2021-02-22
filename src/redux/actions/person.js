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

export const startCreatePerson = (personData) => {
    return async(dispatch) => {
        console.log('personData:', personData);
        dispatch(createPersonCheckingStart());
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
                console.log('1');

                address.personID = resp.data.person.personID;
                user.personID = resp.data.person.personID;

                dispatch(startCreateAddress(address));
                console.log('2');
                dispatch(startCreateUser(user));
                console.log('3');

                if (homePhone) {
                    homePhone.personID = resp.data.person.personID;
                    dispatch(startCreateTelephone(homePhone));
                    console.log('4');
                }
                if (mobilePhone) {
                    mobilePhone.personID = resp.data.person.personID;
                    dispatch(startCreateTelephone(mobilePhone));
                    console.log('5');
                }
            }
            console.log('6');
            Swal.fire('¡Correcto!', 'Datos registrados correctamente', 'success');
            //dispatch(createPersonCheckingEnd());
        } catch (error) {
            dispatch(createError());
            errorHandling(error);
        }
        dispatch(createPersonCheckingEnd());
    }
}

const createError = () => ({
    type: types.personCreatingError
});

const createPerson = (person) => ({
    type: types.personCreatingOK,
    payload: person
});

const createPersonCheckingStart = () => ({
    type: types.personStartChecking
});

const createPersonCheckingEnd = () => ({
    type: types.personCheckingFinished
});