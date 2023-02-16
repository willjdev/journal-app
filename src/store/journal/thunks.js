import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";


export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            bode: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) ) //El segundo parametro es el path que se encuentra en firestore
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id; //Se le agrega el id que geenera Firestore

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );

    }

}

export const startLoadingNotes =  () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El uid del usuario no existe')

        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );


    }
}

export const startSavingNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active: note } = getState().journal;
        
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await setDoc( docRef, noteToFirestore, { merge: true })
        //Primer argumento la referencia, segundo el valor, el contenido a enviar. Hay un tercer parametro llamado SetOptions que son opciones
        //entre las que se encuentra merge, que es una union que hace que si hay campos nuevos aca que no estan en el documento de la DB
        //entonces los campos que estaban alla se mantienen

        dispatch( updateNote( note ) );
    
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );
        
        //await fileUpload( files[0] );

        const fileUploadPromises = [];
        //Para subir todas las imagenes simultaneamente

        for (const file of files) {
            //Arreglo de promesas. Aqui se almacenan las promesas
            fileUploadPromises.push( fileUpload( file ) ); 
        }

        const photosUrls = await Promise.all( fileUploadPromises ); 
        //Promise.all dispara las promesas. Aunque tambien puede recibir arreglo de callbacks
        //Retorna un arreglo con las resoluciones de las promesas en el mismo orden

        dispatch( setPhotosToActiveNote( photosUrls ) );

    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }`);
        await  deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ) );
    }
}