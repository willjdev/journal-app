import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

    try {
        // El auth es la instancia creada en config y el googleProvider es el proveedor para que aparezca el popup, puede ser de Twitter, Facebook, entre otros
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        const credentials = GoogleAuthProvider.credentialFromResult( result ); // Aqui se puede obtener el accestoken y otras cosas. Se puede obtener un token que se verifica por el lado de Google y hacer muchas cosas
        const { displayName, email, photoURL, uid } = result.user;
        
        return {
            ok: true, //esto quiere decir que todo salio bien
            //User info
            displayName, email, photoURL, uid
        }
        
    } catch ( error ) {
        
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
        }
    }


}

export const registerWithEmailPassword = async({ email, password, displayName }) => {

    try {



        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user; // Si todo sale bien se pueden tomar estos datos del usuario
        
        // FirebaseAuth.currentUser
        await updateProfile( FirebaseAuth.currentUser, { displayName } ); //El segundo parametro es el dato a actualizar || Esto es una promesa, por ello se utiliza el await

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {

        return {ok: false, errorMessage: error.message}
    }

};

export const loginWithEmailPassword = async({ email, password }) => {

    try {
        
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;
        
        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
        return {ok: false, errorMessage: error.message}
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}