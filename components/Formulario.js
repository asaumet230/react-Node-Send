import React, { useState, useContext} from 'react';
import appContext from '../context/app/appContext';

const Formulario = () => {

    const { agregarPassword, agregarDescargas } = useContext(appContext);

    const [tienenPassword, setPassword ] = useState(false);


    return (  

        <div className="w-full mt-20">
            <div>
                <label className="text-lg text-gray-800">Eliminar tras:</label>
                <select 
                    className="apperance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 leading-none focus:outline-none focus:border-gray-500"
                    onChange= {e =>  agregarDescargas(parseInt(e.target.value))}
                >
                    <option defaultValue disabled value="">-- Seleccione --</option>
                    <option value="1">1 Descarga</option>
                    <option value="5">5 Descarga</option>
                    <option value="10">10 Descarga</option>
                    <option value="20">20 Descarga</option>
                </select>
            </div>

            <div className="mt-3">
                <div className="flex justify-between items-center">
                    <label className="text-lg text-gray-800 mr-2">Proteger con contraseña:</label>
                    <input type="checkbox" onClick={()=> setPassword(!tienenPassword)} />        
                </div>

                {tienenPassword && (
                <input 
                    type="password" 
                    className="apperance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 leading-none focus:outline-none focus:border-gray-500" 
                    onChange = { e => agregarPassword(e.target.value)}
                    />)}
                 
            </div>
       </div>
    
    );
}
 
export default Formulario;