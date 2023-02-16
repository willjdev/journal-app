import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal";


export const useCheckAuth = () => {
  
  const { status } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  useEffect(() => {
    //Cada vez que cambia el estado de la autenticacion esta funcion se dispara
    //El segundo argumento es el callback que quie ro que se ejecute cada vez que se reciba el siguiente valor
    onAuthStateChanged( FirebaseAuth, async( user ) => {
      if ( !user ) return dispatch( logout() );

      const { uid, email, displayName, photoURL } = user;
      dispatch( login({ uid, email, displayName, photoURL }) );
      dispatch( startLoadingNotes() );

    }) 
  }, []);

  return status
}
