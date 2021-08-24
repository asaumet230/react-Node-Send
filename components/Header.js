import { useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';


 
const Header = () => {

 
  const router = useRouter();

  // Definimos el contex:
  const { usuario, usuarioAutenticado, cerrarSesion } = useContext(authContext);
  const { limpiarState } = useContext(appContext);

  // Definimos el effect:
  useEffect(() => {
  
    const token = localStorage.getItem('token');

    if(token) {

        usuarioAutenticado();

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ])


  const redirecionar = () =>{

      router.push('/');
      limpiarState();
  }


  return ( 
      <header className="py-8 flex flex-col md:flex-row items-center justify-between">
        
  
            <a onClick= {() => redirecionar()}>
              <Image 
                className="w-64 mb-8 md:mb-0 btn" 
                src='/logo.svg' 
                alt="node-send" 
                width={250} 
                height={47}/>
            </a>
       

        <div className="espacio">
        { usuario != null? (
          <div className="flex aling-center">
            <p className="mr-2 py-3">Hola {usuario.nombre}</p> 
            <button
              type="button"
              className="px-5 py-3 bg-black text-white font-bold rounded-lg uppercase btn"
              onClick= {() => cerrarSesion()}
            >
              Cerrar Sesión
            </button>
          </div>
          
        ):
        <>
             <Link href="/login">
              <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase btn mr-2">
                     Iniciar Sesión
              </a>  
            </Link>
            <Link href="/crearcuenta">
              <a className="px-5 py-3 bg-black text-white font-bold rounded-lg uppercase btn">
                    Crear Cuenta
              </a>
            </Link>
          </>
        }
        </div>
         

      </header>
     );
}
 
export default Header;
