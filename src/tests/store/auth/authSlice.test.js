import { authSlice, checkingCredentials, login, logout } from "../../../store/auth/authSlice";
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";


describe('Pruebas en authSlice', () => { 

    test('debe de regresar el estado inicial y llamarse "auth"', () => { 
        
        const state = authSlice.reducer( initialState, {} );

        expect( authSlice.name ).toBe('auth');
        expect( state ).toEqual( initialState );

     });

    test('debe de realizar la autenticación', () => { 

        //El objetivo del reducer es crear un nuevo estado, por ello primer se envia
        //como argumento el estado inicial y luego el estado que luzca de cierta manera
        const state = authSlice.reducer( initialState, login( demoUser ) );
        expect( state ).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });

    });

    test('debe de realizar el logout sin argumentos', () => { 

        const state = authSlice.reducer( authenticatedState, logout() );

        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
        


    });

    test('debe de realizar el logout y mostrar un mensaje de error', () => { 

        const errorMessage = 'Credenciales no son correctas';

        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) );

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        })

    });

    test('debe de cambiar el estado a checking', () => { 

        const state = authSlice.reducer( authenticatedState, checkingCredentials() );
        expect( state.status ).toBe('checking');

     });

 });