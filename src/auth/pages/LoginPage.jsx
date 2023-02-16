import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: ''
}


export const LoginPage = () => {
  
  const { status, errorMessage } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm( formData );

  const isAuthenticating = useMemo( () => status === 'checking', [status] )

  const onSubmit = ( event ) => {
    event.preventDefault();
    console.log('Siuuu');
    dispatch( startLoginWithEmailPassword({ email, password }) );
  }

  const onGoogleSignIn = () => {
    console.log('Googlesiuu');
    dispatch( startGoogleSignIn() );
  }

  return (
    <AuthLayout title='Login'>
      <form 
        aria-label="submit-form"
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={ onSubmit }
      >
          <Grid container>

            <Grid item xs={ 12 } sx={{ mt: 2 }}> {/* Con el xs={ 12 } se especifica que en pantallas muy pequeñas el width será de 12 columnas */}
            {/* Es como en Bootstrap el espacio es de 12 columnas.  */}
            {/* md={ 6 } es para pantallas medianas */}
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo@google.com"
                fullWidth
                name='email'
                value={ email }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña"
                fullWidth
                name='password'
                inputProps={{
                  'data-testid': 'password'
                }}
                value={ password }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid 
              display={ !!errorMessage ? '' : 'none' }
              sx={{ mt:1 }}
              container
            >
              <Grid 
                  item xs={ 12 } 
                  sm={ 12 }
              > 
                  <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }> {/* xs - sm - md Para definir las vistas. MUI es mobile first */}
                <Button 
                  disabled={ !!isAuthenticating }
                  type="submit" 
                  variant="contained" 
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                  disabled={ !!isAuthenticating }
                  variant="contained" 
                  fullWidth
                  onClick={ onGoogleSignIn }
                  aria-label="google-btn"
                >
                  <Google/>
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color={'inherit'} to="/auth/register"> {/* Link de MUI */}  {/* El component contiene el Link de react-router-dom */}
                Crear una cuenta
              </Link>
            </Grid>


          </Grid>
        </form>
    </AuthLayout>
  )
}
