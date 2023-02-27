
import { loginWithEmailPassword, logoutFirebase, registerWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = ( email, password ) => {

    return async( dispatch ) => {
        dispatch( checkingCredentials() );
         
    }
}

// Usualmente se colocal start para inicio de tareas asincronas
export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();

        setInterval(() => {
            if ( !result.ok ) return dispatch( logout( result.errorMessage ) );
            dispatch( login( result ) ); // El result es el payload
        }, 700);
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName}) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerWithEmailPassword({ email, password, displayName });

        if ( !ok ) return dispatch( logout({ errorMessage }) )

        //Si todo sale bien se loggea el usuario
        dispatch( login({ uid, displayName, email, photoURL }));

        
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await loginWithEmailPassword({ email, password });
        console.log(result)
    
        if ( !result.ok ) return dispatch( logout( result ));
        dispatch( login( result ));
    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();
        dispatch( clearNotesLogout() );
        dispatch( logout() );
    }
}