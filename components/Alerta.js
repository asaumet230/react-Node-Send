import React, { useContext } from 'react';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';


const Alerta = () => {

  

    // Usar el context:
    const { mensaje, clase } = useContext(authContext);
    const { mensaje_archivo, clase_app } = useContext(appContext);
    // console.log(clase);


    return (

            <div className={`${clase || clase_app} font-bold py-2 px-3 w-full max-w-lg text-center text-white mx-auto`}>
                {  mensaje || mensaje_archivo }
            </div>
       
      );
}
 
export default Alerta;
