import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"

import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { CheckingAuth } from "../ui"
import { useCheckAuth } from "../hooks"



export const AppRouter = () => {
  
  const status = useCheckAuth();

  if ( status === 'checking' ) {
    return <CheckingAuth/>
  }

  return (
    <Routes>

    {
      status === 'not-authenticated'
      ? (
        <>
          <Route path="/auth/*" element={ <AuthRoutes /> }/>
          <Route path="/*" element={ <Navigate to="/auth/login" /> }/> 
        </>
      ) 
      : (
        <>
          <Route path="/" element={ <JournalRoutes /> } /> 
          <Route path="/*" element={ <Navigate to="/" /> } />
        </>
      ) 
      
    }

    {/* <Route path='/*' element={ <Navigate to='/auth/login' /> } /> */}

        {/* Login y Registro */}
        {/* <Route path="/auth/*" element={ <AuthRoutes /> }/> /* Cualquier entrada desde auth va a mostrar el elemento definido */}

        {/* JournalApp */}
        {/* <Route path="/*" element={ <JournalRoutes /> } /> /* Cualquier entrada desde diferente a auth va a entrar en el elemento definido */}

    </Routes>
  )
}
