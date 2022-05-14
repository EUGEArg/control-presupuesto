import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({
    setModal, 
    animarModal,
    setAnimarModal, 
    guardarGasto, 
    gastoEditar,
    setGastoEditar
}) => {

    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('') //State para el nombre del gasto
    const [cantidad, setCantidad] = useState('') //State para la cantidad del gasto
    const [categoria,setCategoria] = useState('') //State para la categoria del gasto
    const [fecha, setFecha] = useState('') //State para la fecha del gasto
    const [id, setId] = useState('') //State para el id del gasto

    useEffect(() => { //Se ejecuta cuando se cambia el gastoEditar
        if(Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, []);

    const ocultarModal = () => {        
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        },500);  
    }

const handleSubmit = e => {
    e.preventDefault();

    if([nombre,cantidad,categoria].includes('')){ //Todos los campos deben estar llenos
        setMensaje('Todos los campos son obligatorios')
        setTimeout(() => {
            setMensaje('')
        },2000)
        return;
    }  
    guardarGasto({nombre, cantidad, categoria, id, fecha})
}

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img
                    src={CerrarBtn} 
                    alt='cerrar modal' 
                    onClick={ocultarModal}
                />
            </div>
            <form 
                onSubmit={handleSubmit} //Evento para el botón de agregar gasto
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
                
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        id='nombre'
                        type="text"
                        placeholder='Añade el Nombre del Gasto'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id='cantidad'
                        type="number"
                        placeholder='Añade la cantidad del Gasto: ej 300'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="categoria">Categoría</label>
                    <select 
                    name="" id="categoria"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}>
                        <option value="seleccione">--Seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input 
                    type="submit" 
                    value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}/>
            </form>
        </div>
    )
}

export default Modal