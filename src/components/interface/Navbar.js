import './interface_CSS/Navbar.css'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Searchbar from './Searchbar';
import Lateralbar from './Lateralbar';

function Navbar() {
    const [show, setShow] = useState(false)
    const [visibility, setVisibility] = useState(false)

    return (
        <>
            <Lateralbar visible={visibility}/>
            <div className={`navbar ${visibility ? 'lateralbar-open' : ''}`}>
                <div className='app-title'>
                    <h1>PITSTOP</h1>
                </div>
                <div>
                    <Button onClick={() => setVisibility(!visibility)}>LATERAL</Button>
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