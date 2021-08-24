/* eslint-disable react-hooks/rules-of-hooks */
import React,  { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';

import authContext from '../context/auth/authContext';

import Layout from '../components/Layout';
import Alerta from '../components/Alerta';


const crearCueta = () => {

    // State :
    const { registrarUsuario, mensaje, ok } = useContext(authContext);
    const router = useRouter();

    // effect:

    useEffect(() => {
       
        if(ok) {

            setTimeout(() => {
                router.push('/login');
            }, 3000);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ok])

    // Validación del formulario con Formik y Yup:
    const formik = useFormik({

        initialValues:{

            nombre: '',
            email: '',
            password: ''

        },  
        validationSchema: yup.object({
            
            nombre: yup.string().required('El nombre es obligatorío'),
            email: yup.string().email('El email no es Válido').required('El correo es obligatorío'),
            password: yup.string().min(6, 'el password debe ser de minímo 6 caracteres').required('El password es obligatorío')

        }),
        onSubmit: (valores)=> {
            registrarUsuario(valores);
        }
    })

    return ( 

        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
                    Crear Cuenta
                </h2>

                { mensaje && <Alerta /> }

                <div className="flex justify-center mt-5">
                    <div className="max-w-lg w-full">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="nombre" className="block text-black text-sm font-bold mb-2">
                                    Nombre
                                </label>
                                <input 
                                    type="text"
                                    id= "nombre"
                                    placeholder="Nombre de usuario" 
                                    name="nombre"
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="shadow appearance-none rounded border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>

                                    {formik.touched.nombre && formik.errors.nombre ? (
                                        <div className= "my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{ formik.errors.nombre }</p>
                                        </div>
                                    ): null }
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-black text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input 
                                    type="email"
                                    id= "nombre"
                                    placeholder="Email de usuario" 
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="shadow appearance-none rounded border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                     {formik.touched.email && formik.errors.email ? (
                                        <div className= "my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{ formik.errors.email }</p>
                                        </div>
                                    ): null }
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-black text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input 
                                    type="password"
                                    id= "password"
                                    placeholder="password de usuario" 
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="shadow appearance-none rounded border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>

                                     {formik.touched.password && formik.errors.password ? (
                                        <div className= "my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{ formik.errors.password }</p>
                                        </div>
                                    ): null }
                            </div>

                            <button 
                                type="submit"
                                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold">
                                Crear Cuenta
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </Layout>
     );
}
 
export default crearCueta;