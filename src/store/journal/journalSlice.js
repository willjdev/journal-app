import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        saveMessage: '',
        notes: [],
        active: null,

        //Como lucieria el active
        /* active: {
            id: 1235,
            title: '',
            body: '',
            date: 123,
            imageUrls: [] //https://foto1.jpg, https://foto2.jpg
        } */
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.saveMessage = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.saveMessage = '';
        },
        setPhotosToActiveNote: ( state, action ) => {
            state.active.imageUrl = [ ...state.active.imageUrl, ...action.payload ];
            state.isSaving = false;
        },
        updateNote: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                
                if ( note.id === action.payload.id ) {
                    return action.payload;
                }
                
                return note;
            });

            state.saveMessage = `${ action.payload.title }, actualizada correctamente`;
        },
        clearNotesLogout: ( state ) => {
            state.isSaving = false;
            state.saveMessage = '';
            state.notes = [];
            state.active = null;
        },

        deleteNoteById: ( state, action ) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
 } = journalSlice.actions;