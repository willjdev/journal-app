import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';
import { useMemo } from 'react';



const formData = {
  email: '',
  password: '',
  displayName: '',
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe de tener un @' ],
  password: [ (value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio' ],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth );
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] ); //Para deshabilitar que pueda presionar Crear usuario mientras ya se esta crecando uno

  const { 
    displayName, email, password, onInputChange, formState,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm( formData, formValidations  );


  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);
    
    if ( !isFormValid ) return;



    dispatch( startCreatingUserWithEmailPassword( formState ) );
  }

  return (
    <AuthLayout title='Register'>
      <form 
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={ onSubmit } 
      >
          <Grid container>

            <Grid item xs={ 12 } sx={{ mt: 2 }}> {/* Con el xs={ 12 } se especifica que en pantallas muy pequeñas el width será de 12 columnas */}
            {/* Es como en Bootstrap el espacio es de 12 columnas.  */}
            {/* md={ 6 } es para pantallas medianas */}
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder="Nombre completo"
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmitted }
                helperText={ displayNameValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder="Email"
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña"
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmitted }
                helperText={ passwordValid }
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid 
                item xs={ 12 } 
                sm={ 12 }
                display={ !!errorMessage ? '' : 'none' }
              > 
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>

              <Grid item xs={ 12 } sm={ 12 }> {/* xs - sm - md Para definir las vistas. MUI es mobile first */}
                <Button
                  disable={ isCheckingAuthentication }
                  type='submit' 
                  variant="contained" 
                  fullWidth
                >
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 12 }> {/* xs - sm - md Para definir las vistas. MUI es mobile first */}
                <Button
                  disable={ isCheckingAuthentication }
                  type='submit' 
                  variant="contained" 
                  fullWidth
                >
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color={'inherit'} to="/auth/login"> {/* Link de MUI */}  {/* El component contiene el Link de react-router-dom */}
                Ingresar
              </Link>
            </Grid>


          </Grid>
        </form>
    </AuthLayout>
  )
}
