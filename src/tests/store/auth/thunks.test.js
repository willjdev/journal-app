import { loginWithEmailPassword, logoutFirebase, registerWithEmailPassword, signInWithGoogle } from "../../../firebase/providers";
import { checkingCredentials, login, logout } from "../../../store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../store/auth/thunks";
import { clearNotesLogout } from "../../../store/journal";
import { demoUser, notAuthenticatedState } from "../../fixtures/authFixtures";

//Mock a la dependencia de Firebase, ya que Babel no lo puede convertir o manejar para hacer el testing
jest.mock('../../../firebase/providers')
//No solo es esto, se debe agregar algo en el jest.config.cjs

describe('Pruebas en AuthThunks', () => { 
    
    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('debe de invocar el checkingCredentials', async() => { 


        //Esta funcion regresa una funcion. El primer argumento es el llamado de la funcion y el segundo el valor de retorno de la funcion
        await checkingAuthentication()( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

     });

    test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async() => { 

        const loginData = { ok: true, ...demoUser };
        //Se manda a llamar la funcion origina, aunque debido a la linea 7 aqui arriba, todo lo que venga de esa ruta sera mock, como esta funcion
        await signInWithGoogle.mockResolvedValue( loginData ); 
        //

        //Este es el thunk que queremos probar
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

      
    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async() => { 

        const loginData = { ok: false, errorMessage: 'Un error en Google' };
        
        await signInWithGoogle.mockResolvedValue( loginData ); 

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => { 
        
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: 123456 };

        await loginWithEmailPassword.mockResolvedValue( loginData )

        await startLoginWithEmailPassword( formData )( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y logout - Error', async() => { 
        
        const loginData = { ok: false, errorMessage: 'Error' };
        const formData = { email: null, password: null };

        await loginWithEmailPassword.mockResolvedValue( loginData )

        await startLoginWithEmailPassword( formData )( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );

    });

    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => { 

        const createData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: 123456, displayName: demoUser.displayName };

        await registerWithEmailPassword.mockResolvedValue( createData );
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        //expect( dispatch ).toHaveBeenCalledWith( login( createData ) );

     });

    test('startLogout debe de llamar logoutFirebase, clearNOtes y logout', async() => { 

        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
     });

 });