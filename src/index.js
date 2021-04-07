import React from 'react';
import { render } from 'react-dom';
// import 'normalize.css';
// import { GlobalStyles } from './global-styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import { firebase } from './lib/firebase.prod';
import { FirebaseContext } from './context/firebase';

render(
    <React.StrictMode>
        <FirebaseContext.Provider value={{ firebase }}>
            <CssBaseline />
            <App />
        </FirebaseContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
