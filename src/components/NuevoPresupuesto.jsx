import {useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({
	presupuesto, 
	setPresupuesto, 
	setIsValidPresupuesto
}) => {

	const [mensaje, setMensaje] = useState('');

	const handlePresupuesto = (e)=> {
		e.preventDefault();

		if(!presupuesto || presupuesto < 0){
		setMensaje('No es un presupuesto válido');
		return // Para que no se ejecute el resto de la función
		}
		setMensaje(''); //Por si el usuario corrige el dato ingresado, para que no se muestre el alerta
		setIsValidPresupuesto(true);
	}

 	return (
		<div className='contenedor-presupuesto contenedor sombra'>
			<form 
					onSubmit={handlePresupuesto} // Se ejecuta cuando se envía el formulario
					className='formulario'>
				<div className='campo'>
					<label htmlFor="">Definir Presupuesto</label>
					<input 
						type="number"
						className='nuevo-presupuesto'
						placeholder='Añade tu Presupuesto' 
						value={presupuesto}
						onChange={ event => setPresupuesto(Number(event.target.value))} //Conforme a que modifique los valores deberán ir cambiando en la variable
					/>
				</div>
				<input 
						type='submit' //Cuando envío se ejecuta la función handlePresupuesto
						value='Añadir' 						
				/>

				{mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

			</form>
		</div>
 )
}

export default NuevoPresupuesto