import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { MainUI } from './components/ui/MainUI';

export const NoneApp = () => {
    return (
        <Provider store={ store }>
            <MainUI />
   </Provider>

    )
}