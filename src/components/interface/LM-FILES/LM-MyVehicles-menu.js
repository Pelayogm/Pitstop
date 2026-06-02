import '../interface_CSS/LM-CSS/LM-MyVehicles-Menu.css'
import Newcartab from '../New-cartab';
import Addedcartab from '../Added-cartab';
import { useState } from 'react';
import Rlateralbar from '../R-Lateralbar';
import { useContext } from 'react';
import { lrmCarDetailContext } from '../LRM-FILES/LRM-Car-Detail-Context'

export default function MyVehiclesMenu() {
    const [openTab, setOpenTab] = useState(null)
    const { car, setCar, visibility, setVisibility} = useContext(lrmCarDetailContext);

    return (
        <>
            <div className='lateralbar-variable-content'>
                <h1 className='lateralbar-variable-content-title'>
                    Mis vehículos
                </h1>
                <div className='lateralbar-variable-content-scroll'>
                    <Newcartab/>
                    <Addedcartab id={0} onSelect={() => setVisibility(!visibility)}/>
                    <Addedcartab id={1} onSelect={() => setVisibility(!visibility)}/>
                    <Addedcartab id={2} onSelect={() => setVisibility(!visibility)}/>
                    <Addedcartab id={3} onSelect={() => setVisibility(!visibility)}/>
                    <Addedcartab id={4} onSelect={() => setVisibility(!visibility)}/>
                    <Addedcartab id={5} onSelect={() => setVisibility(!visibility)}/>
                </div>
            </div>
        </>
    )
}