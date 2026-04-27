import './interface_CSS/Lateralbar.css';
import carIcon from '../../img/ui/car-ui.svg';
import nearBy from '../../img/ui/nearby-ui.svg';
import priceIcon from '../../img/ui/price-ui.svg';
import settingsIcon from '../../img/ui/settings-ui.svg'

export default function Lateralbar({ visible }) {
    return (
        <div className={`lateralbar ${visible ? 'visible' : ''}`}>
            <div className='lateralbar-menu'>
                <ul>
                    <li><img src={carIcon} alt='car-menu' className='lateral-menu-icons'/></li>
                    <li><img src={nearBy} alt='nearby-menu' className='lateral-menu-icons'/></li>
                    <li><img src={priceIcon} alt='price-menu' className='lateral-menu-icons'/></li>
                    <li><img src={settingsIcon} alt='settings-menu' className='lateral-menu-icons'/></li>
                </ul>
            </div>
            <div className="lateralbar-variable">
                parte variable
            </div>
        </div>
    )
}