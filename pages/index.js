import React, { useContext, useEffect } from 'react'
import Link from 'next/link';

import Layout from '../components/Layout';
import Dropzone from '../components/Dropzone';
import Alerta from '../components/Alerta';

import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';

const Home = () => {

  // Definir el context:
  const { usuarioAutenticado } = useContext(authContext);
  const { mensaje_archivo, url } = useContext(appContext);

  useEffect(() => {
   
    usuarioAutenticado();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  


  return ( 
    <Layout>
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">

          {url? (
            <>
              <p className="text-center text-2xl">
                <span className="font-bold uppercase text-red-700 text-4xl">Tu URL es: </span>  {`${process.env.frontendURL}/enlaces/${url}`}
              </p>
              <button 
                type="submit"
                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
                onClick= {()=> navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)}>
                  Copiar enlace
              </button>
            </>
          ): (
            <>
              { mensaje_archivo && <Alerta/> }
              <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">

              <Dropzone/>
             
                  <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                      <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                        Comparte archivos de forma sencilla y privada
                      </h2>
                      <p className="text-lg leading-loose text-justify">
                        <span className="text-red-500 font-bold">ReactNodeSend </span>
                        te permite compartir archivos con cifrado de extremo a extremo y un archivo que es eliminado despues de descargado. Así que puedes mantener lo que compartes en privado y asegurate de que tus cosas no permanezcan en linea para siempre.
                      </p>
                      <Link href="/crearcuenta" >
                          <a className="text-red-500 font-bold text-lg hover:text-red-700">
                            Crear cuenta para mayores beneficios
                          </a> 
                      </Link>
                  </div>
              </div>
            </>
          )}
          
        </div>
    </Layout>
    
   );
}
 
export default Home;
