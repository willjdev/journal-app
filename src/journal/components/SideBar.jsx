import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarItem } from "./SideBarItem";


export const SideBar = ({ drawerWidth}) => {

    const { displayName } = useSelector( state => state.auth );
    const { notes } = useSelector( state => state.journal );

  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant="permanent" //temporary. Depende de si se quiere mostrar o no
            open //Esto seria open={ true }, pero en React siempre que algo sea true se puede dejar solo
            sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } //Esto es como Sass, el sx lo permite
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component='div'>
                    { displayName }
                </Typography>
            </Toolbar>
            <Divider/>

            <List>
                {
                    notes.map( note => (
                        <SideBarItem key={ note.id} { ...note } />
                    ))
                }
            </List>

        </Drawer>
    </Box>
  )
}
