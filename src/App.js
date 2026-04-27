import { useState, useEffect } from 'react';
import './App.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from './components/interface/Navbar.js';
import EstacionesLayer from './components/Gasolinera';
import mapLayer from './files/mapLayers.json';
import { fetchEstaciones } from './data/combustibles';

export default function App() {
  const lat = 43.4905;
  const lon = -6.1125;

  const [layerIndex, setLayerIndex] = useState(0);
  const [estaciones, setEstaciones] = useState([]);

  const currentLayer = mapLayer[layerIndex];
  const next = () => setLayerIndex((i) => (i + 1) % mapLayer.length);

  useEffect(() => {
    let cancelled = false;
    fetchEstaciones()
      .then((data) => { if (!cancelled) setEstaciones(data); })
      .catch(console.error);
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-map-mode', currentLayer.mode);
  }, [layerIndex])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Navbar/>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <button className='map-switch' onClick={next}
          style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000, padding: '6px 12px', cursor: 'pointer'}}>
          {currentLayer.name}
        </button>

        <MapContainer center={[lat, lon]} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false} attributionControl={false}>
          <TileLayer key={currentLayer.url} url={currentLayer.url} attribution={currentLayer.attribution}/>
          <EstacionesLayer estaciones={estaciones} />
        </MapContainer>
      </div>
    </div>
  );
}