import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../../../auth/pages';
import { authSlice, startGoogleSignIn } from '../../../store/auth';
import { notAuthenticatedState } from '../../fixtures/authFixtures';


const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    //Esto tambien se puede mandar y sirve para precargar un cierto estado en este store de antemano
    preloadedState: { 
        auth: notAuthenticatedState
    }
});

//Se hace el mock afuera para obtener info de si se hizo click
//con que argumentos, cuantas veces se llamo. Es ideal llamarlo afuera
//Es importante poner el mock al inicio, sino no funciona ya que el jest.fn() espera una funcion mock
const mockStartGoogleSignIn = jest.fn();


const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password })
    }
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    //Recibe una funcion y manda a llamar esa funcion. Cuando se llame el useDispatch regresa
    //el valor que regresa esa funcion, que es una funcion que regresa el llamdo de esa funcion
    //Basicamente el useDispatch retorna una funcion que llama la funcion que le mandan como argumento
    useDispatch: () => (fn) => fn() 
}))



describe('Pruebas en <LoginPage />', () => { 

    beforeEach( () => jest.clearAllMocks() );

    test('debe de mostar el componente correctamente', () => { 

        //El render del componente, en este caso, da error, se debe proporcionar el Provider y, a su vez, 
        //un store

        //Se deben proporcionar los reducer que tienen que ver con lo que se desea probar

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        //screen.debug();

        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);

    }); 
     
    test('boton de Google debe de llamar el startGoogleSignIn', () => { 

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click( googleBtn );
        
        //El boton esta disabled debido al isAuthenticating, ya que por defecto este es
        //checking, por ello es true. Se utiliza el preLoadedState para manejar esa variable
        
        expect( mockStartGoogleSignIn ).toHaveBeenCalled();
        

    });

    test('submit debe de llamar startLoginWithEmailPassword', () => { 

        const email = 'link@hyrule.com';
        const password = '123456';

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change( emailField, { target: { name: 'email', value: email } });

        //En este caso el getByRole no funciona con password, se utiliza un inputProps en el elemento de MU, aunque
        //tambien podria utilizarse aria-label
        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value: password } });

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email: email,
            password: password
        })

    });


 });