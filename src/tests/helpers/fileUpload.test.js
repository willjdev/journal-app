import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
    cloud_name: 'ds4ygend0',
    api_key: '927519167948553',
    api_secret: 'GmDYa96BtAqEetBKSa8ujJntbNY',
    secure: true,
})

describe('Pruebas en fileUpload', () => { 

    test('debe de subir el archivo correctamente a cloudinary', async() => { 

        const imgUrl = 'https://static.wikia.nocookie.net/spy-x-family/images/f/ff/Anya_Forger_Anime.png/revision/latest/scale-to-width-down/225?cb=20211031182609&path-prefix=es';
        const resp = await fetch( imgUrl );
        const blob = await resp.blob();
        //Un objeto Blob representa un objeto tipo fichero de datos planos inmutables. Los Blobs representan datos que no necesariamente se encuentran en un formato nativo de JavaScript.
        const file = new File([blob], 'foto.jpg');
        
        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');


        //Aqui se borra el achivo que se sube como test
        const segments = url.split('/');
        //De aqui sacamos el id del url que es la ultima parte de este,
        //por mediod del split. Entonces el id seria el ultimo elemento del 
        //arreglo ya que es la parte final del url. Se le quita la extension
        //del archivo por medio de .replace(). En este caso es jpg.
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');

        const cloudResp = await cloudinary.api.delete_resources([ `journal-app/${imageId}` ], {
            resource_type: 'image'
        });//Primer argumento - el path de la imagen. Segundo argumento - Para asegurar que se borra una imagen. Puede ser un video u otro tipo de archivo
        
        //console.log(cloudResp)

    });

    test('debe de retornar null', async() => { 

        const file = new File([], 'foto.jpg');

        const url = await fileUpload( file );
        expect( url ).toBe( null );

    });


});