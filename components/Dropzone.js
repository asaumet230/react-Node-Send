import React, { useCallback, useContext} from "react";
import { useDropzone } from "react-dropzone";

import appContext from "../context/app/appContext";
import authContext from '../context/auth/authContext';

import Formulario from "./Formulario";

const Dropzone = () => {

    const { cargando, mostrarAlerta, subirArchivo, crearEnlace } = useContext(appContext);
    const { autenticado } = useContext(authContext);

    // drop reject:
    const onDropRejected = () => {
        mostrarAlerta('No se pudo subir, el limite es 1MB, obten una cuenta gratis para subir archivos más grandes');
        
    }

    //Inicio del drop:
    const onDropAccepted = useCallback( async acceptedFiles => {

        // Debes crear un objeto de tipo Form data:
        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0]);
       
        subirArchivo(formData, acceptedFiles[0].name);        

    }, [subirArchivo]);

    let size = null;

    if(autenticado) {
        size= 200000000
    } else{
        size= 1000000
    }

     // Utilizamos los hooks de dropzone:
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: size } );


   

    const archivos = acceptedFiles.map(archivo => (
        <li key={archivo.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
          <p className="font-bold text-xl">{archivo.path}</p>
          <p className="text-sm text-gray-500">{(archivo.size / Math.pow(1024, 2)).toFixed(4)} MB</p>
        </li>
    ));



    return (  
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
            
            { acceptedFiles.length > 0 ? 
                ( 
                    <div className="mt-10 w-full">
                        <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                        <ul>
                            {archivos}
                        </ul>

                        { autenticado? <Formulario/> : null }

                        {cargando? (<p className="my-10 text-center text-gray-600"> Subiendo Archivo...</p>) : 
                        (
                            <button
                                type="button"
                                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                                onClick={()=> crearEnlace()}
                            >
                             Crear enlace
                             </button>
                        )}
                        
                    </div>
                
                ): (
                     <div {...getRootProps({className: 'dropzone w-full py-32'})}>
                        <input className="h-100" {...getInputProps()}/>

                    {  
                        isDragActive ? 
                        <p className="text-2xl text-center text-gray-600"> Suelta el archivo </p>
                        : 
                        <div className="text-center">
                            <p className="text-2xl text-center text-gray-600">Selecciona un archivo y arrastralo aquí</p> 
                            <button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800" type="button">
                                Seleccione archivos para subir
                            </button>
                        </div>
                    }
                    </div>

                )}
        </div>
    );
}
 
export default Dropzone;


