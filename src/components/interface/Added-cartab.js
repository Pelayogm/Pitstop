import austral from '../../img/ui/austral.png'
import './interface_CSS/Added-cartab.css';

export default function Addedcartab ({id, onSelect}) {
    return (
        <button className="addedcartab" onClick={() => onSelect(prev => prev === id ? null : id)}>
            <div className="addedcartab-img">
                <img src={austral} className='newcartab-img-car'/>
            </div>
            <div className="addedcartab-text">
                <p className='addedcartab-carname'>FORD Focus ST</p>
                <p>Matricula: -</p>
                <p>Modelo: 2022</p>
            </div>
        </button>
    )
}