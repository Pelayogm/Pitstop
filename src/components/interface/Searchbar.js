import 'bootstrap/dist/css/bootstrap.min.css';
import './interface_CSS/Searchbar.css'

export default function Searchbar () {
    return (
        <div style={{ flex: 1 }}>
            <div className="search-box">
                <input className="form-control me-2" type="search" placeholder="¿A dónde vas?" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Buscar</button>
            </div>
        </div>
    )
}