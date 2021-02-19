import React from 'react';
<<<<<<< Updated upstream
=======
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
>>>>>>> Stashed changes
import { MainUI } from './components/ui/MainUI';

export const NoneApp = () => {
    return (
<<<<<<< Updated upstream
            <MainUI />
=======
        <Provider store={ store }>
            <MainUI />
   </Provider>

>>>>>>> Stashed changes
    )
}