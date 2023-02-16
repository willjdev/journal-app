import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../store/journal/journalSlice";
import { startNewNote } from "../../../store/journal/thunks";


describe('Pruebas en Journal Thunks', () => { 

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('startNewNote debe de crear una nueva nota en blanco', async() => { 

        const uid = 'TEST-UID';
        //A diferencia del mockResolvedValue que regresa una promesa, el mockReturnValue regresa el valor inmediatamente se llame
        getState.mockReturnValue({ auth: { uid: uid } })

        await startNewNote()( dispatch, getState );

        //Este test puede fallar porque se necesita autorizacion en Firebase
        //por ello se debe especificar en las reglas de Firebase que se permita leer y escribir
        //para todos. Aunque esto no es conveniente al final

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({ 
            bode: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
         }) ); //Aqui se va verificando que se recibe, se muestra en consola y se configura en el addNewEmptyNote
     
         expect( dispatch ).toHaveBeenCalledWith( setActiveNote({ 
            bode: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
         }) );

         //Borrar de Firebase
        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
        const docs = await getDocs( collectionRef );

        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );

        await Promise.all( deletePromises );
    });

 });