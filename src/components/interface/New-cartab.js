import { useContext } from 'react';
import add from '../../img/ui/add-ui.svg'
import './interface_CSS/New-cartab.css';
import { lateralbarAddCarContext } from './LM-SUBFILES/LM-MY-VEHICLES/LM-AddCar-Context';

export default function Newcartab () {
    const {addCarMenu, setAddCarMenu} = useContext(lateralbarAddCarContext)

    return (
        <button className='newcartab' onClick={() => setAddCarMenu(true)}>
            <div className="newcartab-img">
                <img src={add} alt='add-new-car' className='newcartab-img-add'/>
            </div>
            <div className='newcartab-text'>
                <p>Agregar un vehículo nuevo</p>
            </div>
        </button>
    )
}