import './interface_CSS/Navbar.css'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Searchbar from './Searchbar';
import Lateralbar from './Lateralbar';
import { useContext } from 'react';
import { lrmCarDetailContext } from '../interface/LRM-FILES/LRM-Car-Detail-Context'
import { loginContext } from './LOGIN-FILES/LOGIN-LoginContext';

function Navbar() {
    const [show, setShow] = useState(false)
    const [localVisibility, setlocalVisibility] = useState(false)
    const { car, setCar, visibility, setVisibility} = useContext(lrmCarDetailContext);
    const { userDataPopUp } = useContext(loginContext)

    const handleVisibility = () => {
        if (visibility === true && visibility == true) {
            setlocalVisibility(!visibility)
            setVisibility(!visibility)
        } else {
            setlocalVisibility(!localVisibility)
        }
    }

    return (
        <>
            <Lateralbar visible={localVisibility}/>
            <div className={`navbar${localVisibility ? ' lateralbar-open' : ''}${visibility ? ' rightbar-open' : ''}${userDataPopUp ? ' userdata-open' : ''}`}>
                <div className='app-title'>
                    <h1>PITSTOP</h1>
                </div>
                <div>
                    <Button onClick={() => handleVisibility()}>LATERAL</Button>
                </div>
                <Searchbar/>

                <Dropdown show={show} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className='featured-dropdown'>
                    <Dropdown.Toggle variant="secondary">
                        Frecuentes
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>Gasolina 95 E5</Dropdown.Item>
                        <Dropdown.Item>Gasolina 98 E5</Dropdown.Item>
                        <Dropdown.Item>Diesel A</Dropdown.Item>
                        <Dropdown.Item>Diesel Premium (A+)</Dropdown.Item>
                        <Dropdown.Item>GLP</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    );
}

export default Navbar;