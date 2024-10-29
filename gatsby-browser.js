import React from "react";
import "./src/styles/global.css"
//Roboto for material ui
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { store } from './src/services/store'
import { Provider } from 'react-redux'

export const wrapRootElement = ({ element }) => (
    <Provider store={store}>
        {element}
    </Provider>
);
