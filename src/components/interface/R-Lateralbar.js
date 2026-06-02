import { useState } from 'react';
import austral from '../../img/ui/austral.png'
import './interface_CSS/R-lateralbar.css';

export default function Rlateralbar({ visible }) {
    const [activeButton, setActiveButton] = useState(0)

    return (
        <div className={`Rlateralbar ${visible ? 'visible' : ''}`}>
            <div className="Rlateralbar-img">
                <img src={austral} className='newcartab-img-car'/>
            </div>
            <div className='Rlateralbar-buttongroup'>
                <div className='buttongroup-indicator' style={{ transform: `translateX(${activeButton * 100}%)` }}/>
                    <button className={activeButton === 0 ? 'active' : ''} onClick={() => setActiveButton(0)}>Calculo de combustible</button>
                    <button className={activeButton === 1 ? 'active' : ''} onClick={() => setActiveButton(1)}>Información del modelo</button>
                    <button className={activeButton === 2 ? 'active' : ''} onClick={() => setActiveButton(2)}>Información del motor</button>
            </div>
            <div className='Rlateralbar-content'>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit eget mi senectus pellentesque luctus, accumsan habitasse curabitur facilisi turpis scelerisque urna nibh enim nisi dictum bibendum, placerat tempus molestie porttitor nisl tortor iaculis taciti primis quis volutpat. Fames a purus cras nisl fusce dictum ligula consequat, vehicula sollicitudin quis pretium rutrum natoque conubia, tortor sociosqu litora in metus tellus rhoncus. Suspendisse magnis dis scelerisque praesent augue mattis sociosqu pretium, facilisis in porttitor vestibulum justo platea erat, ridiculus sociis at cras netus torquent mi.
                    Bibendum mus mollis et pellentesque sem viverra id dictumst, nunc luctus at nisl penatibus rhoncus vivamus, velit maecenas netus fringilla vulputate suscipit odio. Quisque dignissim tortor laoreet magnis sociosqu a bibendum nunc curae, dui metus non ligula suscipit tellus sed class pulvinar, lobortis in molestie aliquet sapien conubia enim vitae. Diam justo tortor sagittis cursus feugiat donec ultrices praesent eleifend, scelerisque potenti sed nibh penatibus et venenatis taciti dictumst, orci tempor dis cubilia vestibulum phasellus fringilla turpis.</p>
            </div>
        </div>
    )
}