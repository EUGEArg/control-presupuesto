import { useState, useEffect } from "react"
import Header from "./components/Header"
import Filtros from "./components/Filtros"
import ListadoGastos from "./components/ListadoGastos"
import Modal from "./components/Modal"
import { generarId } from "./helpers"
import IconoNuevoGasto from "./img/nuevo-gasto.svg"

function App() {
	const [gastos, setGastos] = useState(
		localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
	) //Comprueba si hay algo en localStorage y lo guarda en gastos y si no comienza como un arreglo vacío, en cero

	const [presupuesto, setPresupuesto] = useState(
		Number(localStorage.getItem('presupuesto')) ?? 0 
		) //State o Estado del presupuesto. Va en el componente principal porque va a pasar por todos los componenetes
	
	const [isValidPresupuesto, setIsValidPresupuesto] = useState(false); //validación para mostrar la otra pantalla si es válido el dato ingresado, mayor que 1

	const [modal, setModal] = useState(false); //State para mostrar la ventana modal
	const [animarModal, setAnimarModal] = useState(false); //State para animar la ventana modal
	
	const [gastoEditar, setGastoEditar] = useState({}); //State para editar el gasto
	
	const [filtro, setFiltro] = useState(''); //State para filtrar los gastos
	const [gastosFiltrados, setGastosFiltrados] = useState([]); //State para filtrar los gastos]	

	useEffect(() => {
		if(Object.keys(gastoEditar).length > 0) {
			setModal(true)
			
			setTimeout(() => {
				setAnimarModal(true);
			}, 500);
			}
	}, [gastoEditar])

	useEffect(() => {
		localStorage.setItem('presupuesto' , presupuesto ?? 0)
	}, [presupuesto]) //Se ejecuta cuando se cambia el presupuesto
	
	useEffect(() => {
		localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
	}, [gastos]) //Se ejecuta cuando se cambia el gasto

	useEffect(() => {
		if(filtro) {
			const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro) //filtrar gastos por categoría
			setGastosFiltrados(gastosFiltrados)			
		}
	}, [filtro]) //Se ejecuta cuando se cambia el filtro

	useEffect(() => {
		const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0; //Busca en el localStorage el presupuesto, sino lo encuentra es igual a 0
			
		if(presupuestoLS > 0) { 
			setIsValidPresupuesto(true); //Se ejecuta una sola vez cuando cambia la aplicación
		}
	}, [])	

	const handleNuevoGasto = () => { //Se ejecuta cuando es un gasto nuevo al presionar el botón más
		setModal(true)
		setGastoEditar({})

		setTimeout(() => {
			setAnimarModal(true);
		}, 500);
	}

	const guardarGasto = gasto => {
		if(gasto.id){ //Actualizar
			const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState )
			setGastos(gastosActualizados)
			setGastoEditar({});  //Luego de agregar el gasto, se limpia el formulario
		}else{ //Nuevo Gasto
			gasto.id = generarId();
			gasto.fecha = Date.now(); // Registra la fecha en que se agrega el gasto
			setGastos([...gastos, gasto]);			
		}		
		setAnimarModal(false);
		setTimeout(() => {
			setModal(false);
		}, 500);
	}

	const eliminarGasto = id => {
		const gastosActualizados = gastos.filter(gasto => gasto.id !== id);		
		setGastos(gastosActualizados);
	}

	return (
		//class para evitar el scroll en el modal
		<div className={modal ? 'fijar' : ''}>
			<Header
				gastos={gastos}
				setGastos={setGastos}
				presupuesto={presupuesto} // Se define en el form que está en el componente Header
				setPresupuesto={setPresupuesto} // Idem anterior
				isValidPresupuesto={isValidPresupuesto}
				setIsValidPresupuesto={setIsValidPresupuesto}
			/>

			{isValidPresupuesto && ( //Muestro el plus si es válido el valor ingresado
				<>
					<main>
						<Filtros 
							filtro={filtro}
							setFiltro={setFiltro}
						/>

						<ListadoGastos 
							gastos={gastos}
							setGastoEditar={setGastoEditar}
							eliminarGasto={eliminarGasto}
							filtro={filtro}
							gastosFiltrados={gastosFiltrados}
						/>
					</main>
					<div className="nuevo-gasto">
						<img
							src={IconoNuevoGasto}
							alt="icono nuevo gasto"
							onClick={handleNuevoGasto}
						/>
					</div>
				</>
			)}

			{modal && (
				<Modal
					setModal={setModal}
					animarModal={animarModal}
					setAnimarModal={setAnimarModal}
					guardarGasto={guardarGasto}
					gastoEditar={gastoEditar}
					setGastoEditar={setGastoEditar}
				/>
			)}
		</div>
	);
}

export default App;
