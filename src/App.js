import { useState, useEffect, useCallback, useContext } from 'react';
import './App.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from './components/interface/Navbar.js';
import EstacionesLayer from './components/Gasolinera';
import mapLayerJson from './files/mapLayers.json';
import { fetchEstaciones } from './data/combustibles';
import LoginPopUp from './components/interface/LOGIN-FILES/LOGIN-PopUp.js';
import { Route, Routes } from 'react-router-dom';
import Rlateralbar from './components/interface/R-Lateralbar.js';
import { lrmCarDetailContext } from './components/interface/LRM-FILES/LRM-Car-Detail-Context'
import { lateralbarContext } from './components/interface/LM-FILES/Lateralbar-Context'
import { loginContext } from './components/interface/LOGIN-FILES/LOGIN-LoginContext.js';
import { lateralbarAddCarContext } from './components/interface/LM-SUBFILES/LM-MY-VEHICLES/LM-AddCar-Context.js';
import notloggedImg from './img/ui/user-not-logged.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginStatusPopUp from './components/interface/LOGIN-FILES/LOGIN-Status-PopUp.js';

export default function App() {
  const lat = 43.4905;
  const lon = -6.1125;

  const [layerIndex, setLayerIndex] = useState(0);
  const [estaciones, setEstaciones] = useState([]);
  const [car, setCar] = useState({})

  const [loginPopUpVisibility, setLoginPopUpVisibility] = useState(false)

  const [visibility, setVisibility] = useState(false);
  const [lateralbarVisibility, setLateralbarVisibility] = useState(false)

  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [userDataPopUp, setUserDataPopUp] = useState(false)
  const [userToken, setUserToken] = useState("")
  const [userAlias, setUserAlias] = useState("")

  //BARRA LATERAL DERECHA PARA SELECCIONAR UN COCHE PARA AGREGARLO A LA CUENTA
  //BARRA LATERAL DE AGREGAR COCHE QUE MUESTRA LAS MARCAS
  const [addCarMenu, setAddCarMenu] = useState(false)

  //BARRA LATERAL DE AGREGAR COCHE QUE MUESTRA LOS MODELOS
  const [addCarTab, setAddCarTab] = useState(false)

  //BARRA LATERA EXTENDIDA PARA MOSTRAR LOS DATOS DEL COCHE
  const [selectCarMenu, setSelectCarMenu] = useState(false)

  const currentLayer = mapLayerJson[layerIndex];

  const handleClick = useCallback(() => {
    setLoginPopUpVisibility(prev => !prev)
  }, [])

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
      <lrmCarDetailContext.Provider value={{visibility, setVisibility, car, setCar}}>
        <lateralbarContext.Provider value={{layerIndex, setLayerIndex}}>
          <div style={{ overflow: 'hidden' }}>

            <loginContext.Provider value={{
              userToken, setUserToken, 
              userLoggedIn, setUserLoggedIn, 
              setLoginPopUpVisibility, 
              setUserAlias, userDataPopUp, 
              userAlias, setUserDataPopUp
              }}>
              <div className='pop-up-div'>
                <LoginPopUp visibility={loginPopUpVisibility} handleClick={handleClick}/>
              </div>
            
              <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }} className={`root-div ${loginPopUpVisibility ? 'active-blur' : ''}`}>
                <lateralbarAddCarContext.Provider value={{addCarMenu, setAddCarMenu, addCarTab, setAddCarTab}}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 900 }}>
                      <Navbar/>
                    </div>
                </lateralbarAddCarContext.Provider>

                <div style={{ flex: 1, position: 'relative' }}>
                  { !userLoggedIn && 
                  <button className='login-account' onClick={() => setLoginPopUpVisibility(!loginPopUpVisibility)}> 
                    <img src={notloggedImg} alt='account' className='login-account-img'/>
                  </button>
                  }

                  { userLoggedIn &&
                    <LoginStatusPopUp userAlias={userAlias} userToken={userToken}/>
                  }

                  <MapContainer center={[lat, lon]} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false} attributionControl={false}>
                    <TileLayer key={currentLayer.url} url={currentLayer.url} attribution={currentLayer.attribution}/>
                    <EstacionesLayer estaciones={estaciones} />
                  </MapContainer>
                </div>

                <Rlateralbar visible={visibility}/>
              </div>
            </loginContext.Provider>
          </div>
        </lateralbarContext.Provider>
      </lrmCarDetailContext.Provider>
  );
}