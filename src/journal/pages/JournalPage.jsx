import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";


export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector( state => state.journal );

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JournalLayout>

      {
        !!active 
        ? <NoteView/>
        :  <NothingSelectedView/>
      }


      <IconButton
      disabled={ isSaving }
        onClick={ onClickNewNote }
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { BackgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined 
          sx={{ fondSize: 30 }}
        />
      </IconButton>

    </JournalLayout>
    )
  }
  



//Esto estaba antes de utilizar el layout

  /* <Typography component='h1'>JournalPage</Typography> {/* Con el component='h1' se especifica que el elemento es un h1, el html lo interpreta asi, a pesar de ser Typografy
  Con variant='h1' en lugar del component se hace para que MUI le aplique el estilo que tiene para los h1 
  <MailOutline /> -- Icono -- */