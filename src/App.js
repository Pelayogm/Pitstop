import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header className="App-header">
        <Navbar/>
      </header>

      <div style={{ flex: 1 }}>
        <MapContainer center={[43.5453, -5.6615]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;