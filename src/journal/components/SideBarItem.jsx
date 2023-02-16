import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";


export const SideBarItem = ({ title, bode, id, date, imageUrl = [] }) => {

    const dispatch = useDispatch();

    const newTitle = useMemo( () => {
        return title > 17
            ? title.substring(0, 17) + '...'
            : title;
    }, [title]);

    const onClickActiveNote = () => {
        dispatch( setActiveNote({ title, bode, id, date, imageUrl }) );
    }

  return (
    <ListItem disablePadding>
        <ListItemButton onClick={ onClickActiveNote }>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle } />
                <ListItemText secondary={ bode } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
