import './interface_CSS/Lateralbar.css';
import carIcon from '../../img/ui/car-ui.svg';
import nearBy from '../../img/ui/nearby-ui.svg';
import priceIcon from '../../img/ui/price-ui.svg';
import settingsIcon from '../../img/ui/settings-ui.svg'
import { useState } from 'react';
import MyVehiclesMenu from './LM-FILES/LM-MyVehicles-menu';
import SettingsMenu from './LM-FILES/LM-Settings-menu';

export default function Lateralbar({ visible }) {
    const [openTab, setOpenTab] = useState(null)
    const [activeMenu, setActiveMenu] = useState('cartab')

    const sectionsMenu = {
        cartab: <MyVehiclesMenu/>,
       //nearby: <nearByMenu/>,
       //price: <priceUpdatesMenu/>,
        settings: <SettingsMenu/>
    }

    return (
        <>
            <div className={`lateralbar ${visible ? 'visible' : ''}`}>
                <div className='lateralbar-menu'>
                    <ul>
                        <button onClick={() => setActiveMenu('cartab')}><img src={carIcon} alt='car-menu' className='lateral-menu-icons'/></button>
                        <button><img src={nearBy} alt='nearby-menu' className='lateral-menu-icons'/></button>
                        <button><img src={priceIcon} alt='price-menu' className='lateral-menu-icons'/></button>
                        <button onClick={() => setActiveMenu('settings')}><img src={settingsIcon} alt='settings-menu' className='lateral-menu-icons'/></button>
                    </ul>
                </div>
                <div className="lateralbar-variable">
                    {sectionsMenu[activeMenu]}
                </div>
            </div>
        </>
    )
}