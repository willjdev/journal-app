import { CircularProgress, Grid } from "@mui/material"


export const CheckingAuth = () => {
  return (
    <Grid 
      container
      spacing={ 0 }
      direction="column" 
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}  /* sx es un style. xs hace referencia a tamaños de pantklla */
      /* Es como un style pero este permite acceder  al tema quedefinimos con el themeProvider*/
    >

        <Grid 
            container
            direction='row'
            justifyContent='center'

        >
            <CircularProgress color="warning" />
        </Grid>
    </Grid>
  )
}
