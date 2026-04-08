import './components_CSS/Navbar.css'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
    return (
        <div className='navbar'>
            <div className='app-title'>
                <h1>PITSTOP</h1>
            </div>

            <Dropdown>
                <Dropdown.Toggle variant="secondary">
                    Destacados
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
    );
}

export default Navbar;