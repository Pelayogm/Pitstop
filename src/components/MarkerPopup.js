import { useState } from 'react';
import gasPumpIco from '../img/popup/gas-pump.svg'
import 'bootstrap/dist/css/bootstrap.min.css';

const COMBUSTIBLES_PRIMARIOS = [
  [' Gasolina 95 E5: ',    'Precio Gasolina 95 E5'],
  [' Gasolina 98 E5: ',    'Precio Gasolina 98 E5'],
  [' Gasóleo A: ', 'Precio Gasoleo A'],
  [' GLP: ',       'Precio Gases licuados del petróleo'],
];

const COMBUSTIBLES_SECUNDARIOS = [
  [' G95 E5 Premium: ', 'Precio Gasolina 95 E5 Premium'],
  [' G98 E10: ',        'Precio Gasolina 98 E10'],
  [' Gasóleo B: ',      'Precio Gasoleo B'],
  [' Gasóleo Prem: ',   'Precio Gasoleo Premium'],
  [' GNC: ',            'Precio Gas Natural Comprimido'],
  [' GNL: ',            'Precio Gas Natural Licuado'],
  [' Bioetanol: ',      'Precio Bioetanol'],
  [' Biodiesel: ',      'Precio Biodiesel'],
  [' Hidrógeno: ',      'Precio Hidrogeno'],
];

const TABS = [
  { id: 'primary',   label: 'Principales' },
  { id: 'secondary', label: 'Otros'       },
  { id: 'hours',     label: 'Adicional'     },
];

function FuelList({ estacion, lista }) {
  const disponibles = lista.filter(([, key]) => {
    const v = estacion[key];
    return v && v.trim() !== '';
  });

  if (!disponibles.length) return <p className="no-data">Sin datos disponibles</p>;

  return (
    <ul className="fuel-list">
      {disponibles.map(([label, key]) => (
        <li key={label}>
          <svg viewBox="0 0 576 576" width="16" height="16">
            <path d="M96 128C96 92.7 124.7 64 160 64L320 64C355.3 64 384 92.7 384 128L384 320L392 320C440.6 320 480 359.4 480 408L480 440C480 453.3 490.7 464 504 464C517.3 464 528 453.3 528 440L528 286C500.4 278.9 480 253.8 480 224L480 164.5L454.2 136.2C445.3 126.4 446 111.2 455.8 102.3C465.6 93.4 480.8 94.1 489.7 103.9L561.4 182.7C570.8 193 576 206.4 576 220.4L576 440C576 479.8 543.8 512 504 512C464.2 512 432 479.8 432 440L432 408C432 385.9 414.1 368 392 368L384 368L384 529.4C393.3 532.7 400 541.6 400 552C400 565.3 389.3 576 376 576L104 576C90.7 576 80 565.3 80 552C80 541.5 86.7 532.7 96 529.4L96 128zM160 144L160 240C160 248.8 167.2 256 176 256L304 256C312.8 256 320 248.8 320 240L320 144C320 135.2 312.8 128 304 128L176 128C167.2 128 160 135.2 160 144z"/>
          </svg>
          <span className="fuel-label">{label}</span>
          <span className="fuel-price">{estacion[key]} €/L</span>
        </li>
      ))}
    </ul>
  );
}

function HorarioTab({ horario }) {
  return (
    <div className="horario">
      {horario || 'Horario no disponible'}
    </div>
  );
}

export default function MarkerPopup({ estacion }) {
  const [tab, setTab] = useState('primary');

  const handleTab = (e, id) => {
    e.preventDefault();
    setTab(id);
  };

  return (
    <div className="marker-popup">
      <div className='popup-header'>
        <ul className="nav nav-pills">
          {TABS.map(({ id, label }) => (
              <li className="nav-item" key={id}>
                <button type="button" className={'nav-link' + (tab === id ? ' active' : '')} onClick={() => setTab(id)}>
                  {label}
                </button>
              </li>
          ))}
      </ul>
      </div>
      <div className='popup-content'>
          <span className='popup-station-info'>
            <h2 style={{ fontSize: '20px' , marginTop: '20px'}}>{estacion['Rótulo'] || 'Sin nombre'}, {estacion['Dirección']}</h2>
            <strong>Marca: {estacion['Rótulo'] || 'Sin nombre'}</strong>
          </span>
          <span className='popup-station-address'>
            <p>{estacion['Dirección']}, {estacion['Municipio']}, {estacion['Provincia']}</p>
          </span>
          <hr/>
            <div>
              {tab === 'primary'   && <FuelList estacion={estacion} lista={COMBUSTIBLES_PRIMARIOS}   />}
              {tab === 'secondary' && <FuelList estacion={estacion} lista={COMBUSTIBLES_SECUNDARIOS} />}
              {tab === 'hours'     && <HorarioTab horario={estacion['Horario']} />}
            </div>
      </div>
    </div>
  );
}