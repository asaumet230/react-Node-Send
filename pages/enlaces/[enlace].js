import React, { useState, useContext } from 'react';

import appContext from '../../context/app/appContext';

import Layout from '../../components/Layout';
import Alerta from '../../components/Alerta';
import clienteAxios from '../../config/axios';


export async function getServerSideProps ({params}) {

    const { enlace } = params; 
    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);
    

    return { 
        props: {
            enlace: resultado.data
            }
        }
 
}

export async function getServerSidePaths () {

    const resultado = await clienteAxios.get('/api/enlaces');

    return {        
        paths: resultado.data.enlaces.map( enlace => ({
            params : { enlace: enlace.url }
        })),
        fallback: false
    }

}


const Enlace = ({enlace}) => {

  const { password, archivo } = enlace;

  const { mensaje_archivo, mostrarAlerta} = useContext(appContext);

  const [tienePassword, setTienePassword ] = useState(password);
  const [valorPassword, setPassword ] = useState('');
  const [archivoEnlace, setArchivoEnlace ] = useState(archivo)

  const verificarPassword =async  e => {
      e.preventDefault();

      try {

        const data = {
            password: valorPassword
        }

        const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data);
       
        setTienePassword(resultado.data.password);
        setArchivoEnlace(resultado.data.archivo);
          
      } catch (error) {
          mostrarAlerta(error.response.data.msg);
      }

    

  }

    return (
        <Layout>
            { tienePassword? 
                (
                    <>
                        <p className="text-center">Este archivo esta protegido por un password, colocalo a continuación</p>
                        { mensaje_archivo && <Alerta/> }
                        <div className= "flex justify-center mt-5">
                            <div className="w-full max-w-lg">
                                <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={e => verificarPassword(e)}>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="block text-black text-sm font-bold mb-2">
                                            Password
                                        </label>

                                        <input 
                                            type="password"
                                            id= "password"
                                            placeholder="password" 
                                            name="password"
                                            value= {valorPassword}
                                            onChange={e => setPassword(e.target.value)}
                                            className="shadow appearance-none rounded border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                        <button 
                                            type="submit"
                                            className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-4">
                                            Validar password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </>
                )
                : 
                (
                    <>
                    <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
                        <div className="flex items-center justify-center mt-10 ">
                            <a href={`${process.env.backendURL}/api/archivos/${archivoEnlace}`} className="bg-red-500 uppercase rounded px-10 py-3 text-center fond-bold text-white cursor-pointer"> Aquí</a>
                        </div>
                    
                    </>

                )}
        </Layout>
      );
}
 
export default Enlace;