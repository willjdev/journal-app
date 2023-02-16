//Todo el codigo aqui presente es para tests, de esta forma no se
//llena el espacio de los tests escribiendolo

export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'authenticated',
    uid: 123456,
    email: 'link@hyrule.com',
    displayName: 'Link',
    photoURL: 'https://link.jpg',
    errorMessage: null
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: 'abc123',
    email: 'link@hyrule.com',
    displayName: 'Link',
    photoURL: 'https://link.jpg'
}