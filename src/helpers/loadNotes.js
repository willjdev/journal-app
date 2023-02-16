import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";


export const loadNotes = async( uid = '' ) => {
    if ( !uid ) throw new Error('El uid del usuario no existe')

    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
    const docs = await getDocs( collectionRef );

    //Asi solo se obtienen las referencias a los documentos, por ello se llama a la funcion
    //integrada de Firebase "data" para traer los documentos como tal 

    const notes = [];

    docs.forEach( doc => {
        notes.push({id: doc.id, ...doc.data() });
    })

    return notes;

};