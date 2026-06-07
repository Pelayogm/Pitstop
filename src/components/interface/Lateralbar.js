import './interface_CSS/Lateralbar.css';
import carIcon from '../../img/ui/car-ui.svg';
import nearBy from '../../img/ui/nearby-ui.svg';
import priceIcon from '../../img/ui/price-ui.svg';
import settingsIcon from '../../img/ui/settings-ui.svg'
import { useContext, useState } from 'react';
import MyVehiclesMenu from './LM-FILES/LM-MyVehicles-menu';
import SettingsMenu from './LM-FILES/LM-Settings-menu';
import addCarSelectBrand from './LM-SUBFILES/LM-MY-VEHICLES/LM-AddCar-SelectBrand'
import {lateralbarAddCarContext} from './LM-SUBFILES/LM-MY-VEHICLES/LM-AddCar-Context';
import AddCarSelectBrand from './LM-SUBFILES/LM-MY-VEHICLES/LM-AddCar-SelectBrand';

export default function Lateralbar({ visible }) {
    const [openTab, setOpenTab] = useState(null)
    const [activeMenu, setActiveMenu] = useState('cartab')
    const {addCarMenu, setAddCarMenu, addCarTab} = useContext(lateralbarAddCarContext)

    const sectionsMenu = {
        cartab: <MyVehiclesMenu/>,
       //nearby: <nearByMenu/>,
       //price: <priceUpdatesMenu/>,
        settings: <SettingsMenu/>
    }

    return (
        <>
            <div className={`lateralbar${visible ? ' visible' : ''}${addCarMenu ? ' addCarMenu': ''}`}>
                <div className='lateralbar-menu'>
                    <ul>
                        <button onClick={() => setActiveMenu('cartab')}><img src={carIcon} alt='car-menu' className='lateral-menu-icons'/></button>
                        <button><img src={nearBy} alt='nearby-menu' className='lateral-menu-icons'/></button>
                        <button><img src={priceIcon} alt='price-menu' className='lateral-menu-icons'/></button>
                        <button onClick={() => setActiveMenu('settings')}><img src={settingsIcon} alt='settings-menu' className='lateral-menu-icons'/></button>
                    </ul>
                </div>
                { !addCarMenu && 
                    <div className="lateralbar-variable">
                        {sectionsMenu[activeMenu]}
                    </div>
                }
                {addCarMenu &&
                    <div className={`lateralbar-variable-extended${addCarTab ? ' carTabOpen' : ''}`}>
                        <AddCarSelectBrand/>
                    </div>
                }
            </div>
        </>
    )
}