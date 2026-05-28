import './interface_CSS/Lateralbar.css';
import carIcon from '../../img/ui/car-ui.svg';
import nearBy from '../../img/ui/nearby-ui.svg';
import priceIcon from '../../img/ui/price-ui.svg';
import settingsIcon from '../../img/ui/settings-ui.svg'
import Newcartab from './New-cartab';
import Addedcartab from './Added-cartab';
import Rlateralbar from './R-Lateralbar';
import { useState } from 'react';

export default function Lateralbar({ visible }) {
    const [openTab, setOpenTab] = useState(null)

    return (
        <>
            <Rlateralbar visible={openTab !== null} />
            <div className={`lateralbar ${visible ? 'visible' : ''}`}>
                <div className='lateralbar-menu'>
                    <ul>
                        <button><img src={carIcon} alt='car-menu' className='lateral-menu-icons'/></button>
                        <button><img src={nearBy} alt='nearby-menu' className='lateral-menu-icons'/></button>
                        <button><img src={priceIcon} alt='price-menu' className='lateral-menu-icons'/></button>
                        <button><img src={settingsIcon} alt='settings-menu' className='lateral-menu-icons'/></button>
                    </ul>
                </div>
                <div className="lateralbar-variable">
                    <div className='lateralbar-variable-content'>
                        <div className='lateralbar-variable-content-title'>
                            Mis vehículos
                        </div>
                        <div className='lateralbar-variable-content-scroll'>
                            <Newcartab/>
                            <Addedcartab id={0} onSelect={setOpenTab} />
                            <Addedcartab id={1} onSelect={setOpenTab} />
                            <Addedcartab id={2} onSelect={setOpenTab} />
                            <Addedcartab id={3} onSelect={setOpenTab} />
                            <Addedcartab id={4} onSelect={setOpenTab} />
                            <Addedcartab id={5} onSelect={setOpenTab} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}