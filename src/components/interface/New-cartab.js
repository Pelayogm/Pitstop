import add from '../../img/ui/add-ui.svg'
import './interface_CSS/New-cartab.css';

export default function Newcartab () {
    return (
        <button className='newcartab'>
            <div className="newcartab-img">
                <img src={add} alt='add-new-car' className='newcartab-img-add'/>
            </div>
            <div className='newcartab-text'>
                <p>Agregar un vehículo nuevo</p>
            </div>
        </button>
    )
}