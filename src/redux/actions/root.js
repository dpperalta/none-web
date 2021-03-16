import { types } from '../types/types';

export const startResetStates = () => {
    return (dispatch) => {
        dispatch(resetStates());
    }
}

const resetStates = () => ({
    type: types.rootLogout()
});