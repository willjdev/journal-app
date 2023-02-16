import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from "../../hooks"
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from "../../store/journal"
import { ImageGallery } from "../components"

/* La diferencia entre Box y Grid es que Box es como un div y Grid permite definir orden, alineamiento, entre otros */
export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: note , saveMessage, isSaving } = useSelector( state => state.journal );

    const { bode, title, onInputChange, date, formState } = useForm( note );

    const dateString = useMemo( () => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [] );

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch( setActiveNote( formState ) );
    }, [formState]);

    useEffect(() => {
      if ( saveMessage.length > 0 ) {
        Swal.fire('Nota actualizada', saveMessage, 'success');
      }
    }, [saveMessage]);
    

    const onSaveNote = () => {
        dispatch( startSavingNote() );
    };
    
    const onFileInputChange = ({ target }) => {
        if ( target.files === 0 ) return;
        console.log('subiendo archivos')
        
        dispatch( startUploadingFiles( target.files ) );
    };

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    return (
    <Grid 
        className="animate__animated animate__fadeIn animate__faster"
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ mb: 1 }}
    > 
        <Grid item>
            <Typography
                fontSize={ 39 } 
                fontWeight='light'
            >
                { dateString }
            </Typography>
        </Grid>

        <Grid item>

            <input 
                type="file" 
                multiple //Para permitir seleccionar varios archivos
                onChange={ onFileInputChange }
                ref={ fileInputRef }
                style={{ display: 'none' }}
            />

            <IconButton
                color="primary"
                disabled={ isSaving }
                onClick={ () => fileInputRef.current.click() }
            >
               <UploadOutlined/> 
            </IconButton>

            <Button 
                disabled={ !!isSaving }
                color="primary" 
                sx={{ padding: 2 }} 
                onClick={ onSaveNote }
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border:'none', mb: 1 }}
                name="title"
                value={ title }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió hoy"
                minRows={ 5 }
                name="bode"
                value={ bode }
                onChange={ onInputChange }
            />
        </Grid>

        <Grid container justifyContent='center'>
            <Button
                onClick={ onDelete }
                sx={{ mt: 2 }}
                color='error'
            >
                <DeleteOutline />
                Borrar
            </Button>
        </Grid>


        {/* Image Gallery */}
        <ImageGallery images={ note.imageUrl } />       
    </Grid>
  )
}
