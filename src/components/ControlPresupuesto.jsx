import {useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({
    gastos,
    setGastos,
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto

    }) => {

    const [porcentaje, setPorcentaje] = useState(0)    
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado= gastos.reduce((total, gasto) => gasto.cantidad + total, 0) //Reduce recorre el array y suma los gastos

        const totalDisponible = presupuesto - totalGastado

        //cálculo del porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
                
        setDisponible(totalDisponible); //para que se vea reflejado lo que queda luego del gasto
        setGastado(totalGastado); //para que se vea en el componente
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje) //para que se vea reflejado el porcentaje
        }, 1500);
    
    }, [gastos]) //Cada vez que cambien los gasto estará corriendo el effect



    const formatearCantidad = (cantidad) => { //para dar formato a los valores de dinero ingresados
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('Deseas reiniciar Presupuesto y Gastos?')
        if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#cc2b2b' : '#3B82F6',
                    trailColor: '#F5F5F5',
                    textColor: porcentaje > 100 ? '#cc2b2b' : '#3B82F6',
                })}

                    value={porcentaje} // para que arranque en cero
                    text={`${porcentaje}% Gastado`}
                    
                />
            </div>
            <div className='contenido-presupuesto'>
                <button 
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? 'negativo' : ''}`}> 
                    <span>Disponible: </span>{formatearCantidad(disponible)} 
                </p>

                <p>
                    <span>Gastado: </span>{formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto