import { Grid, Typography } from "@mui/material"


export const AuthLayout = ({ children, title = ''}) => {
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

        <Grid item
        className="box-shadow"
        xs={ 3 } /* Tamaño de la caja en diferentes pantallas */
        sx={{ 
            width: { sm: 450 }, /* Especifica que el width en pantallas xs sera de 450px */
            backgroundColor: 'white', 
            padding: 3, 
            borderRadius: 2 }}
        >
            <Typography  variant="h5" sx={{ mb: 1 }}>{ title }</Typography>

            { children }

        </Grid>
    </Grid>
  )
}
