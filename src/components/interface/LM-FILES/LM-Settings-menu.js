import '../interface_CSS/LM-CSS/LM-Settings-Menu.css'
import { lateralbarContext } from '../LM-FILES/Lateralbar-Context'
import { useState, useEffect, useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import temaClaro from '../../../img/ui/tema-claro.svg'
import temaOscuro from '../../../img/ui/tema-oscuro.svg'

export default function SettingsMenu() {
    const { layerIndex, setLayerIndex } = useContext(lateralbarContext);

    return (
        <div className="div-root-settings">

            <h1 className="root-title">Configuración</h1>
                <Accordion>
                    <Accordion.Item eventKey="0" flush>
                        <Accordion.Header className='collapsable-button'>Estilos del mapa</Accordion.Header>
                            <Accordion.Body className='map-styles-configuration'>
                              <ul className="map-styles-list">
                                  <li className="map-style-list-entry">
                                        <button className="map-style-list-entry-div" onClick={() => setLayerIndex(0)}>
                                            <div className="map-thumb thumb-trad">
                                                <div className="road road-light" style={{ left:10, top:20, width:44, height:2,  transform:'rotate(15deg)'  }} />
                                                <div className="road road-light" style={{ left:20, top:10, width:2,  height:32, transform:'rotate(-5deg)' }} />
                                                <div className="road road-light" style={{ left:35, top:8,  width:2,  height:22, transform:'rotate(10deg)'  }} />
                                                <div className="block block-trad-a" style={{ left:8,  top:8,    width:10, height:10 }} />
                                                <div className="block block-trad-b" style={{ right:8, bottom:8, width:14, height:9  }} />
                                            </div>
                                            <p className='map-text-button'>Tradicional</p>
                                        </button>
                                        <button className="map-style-list-entry-div" onClick={() => setLayerIndex(1)}>
                                            <div className="map-thumb thumb-esencial">
                                                <div className="road road-mid" style={{ left:10, top:22, width:44, height:1.5, transform:'rotate(15deg)'  }} />
                                                <div className="road road-mid" style={{ left:22, top:8,  width:1.5, height:32, transform:'rotate(-5deg)' }} />
                                            </div>
                                          <p className='map-text-button'>Esencial</p>
                                        </button>
                                        <button className="map-style-list-entry-div" onClick={() => setLayerIndex(2)}>
                                            <div className="map-thumb thumb-oscuro">
                                                <div className="road road-dark" style={{ left:10, top:20, width:44, height:2,  transform:'rotate(15deg)'  }} />
                                                <div className="road road-dark" style={{ left:20, top:10, width:2,  height:32, transform:'rotate(-5deg)' }} />
                                                <div className="road road-dark" style={{ left:35, top:8,  width:2,  height:22, transform:'rotate(10deg)'  }} />
                                                <div className="block block-oscuro-a" style={{ left:8,  top:8,    width:10, height:10 }} />
                                                <div className="block block-oscuro-b" style={{ right:8, bottom:8, width:14, height:9  }} />
                                            </div>
                                          <p className='map-text-button'>Oscuro</p>
                                      </button>
                                  </li>
                              </ul>
                            </Accordion.Body>
                    </Accordion.Item>
                
                <Accordion.Item eventKey="1">
                    <Accordion.Header className='collapsable-button'>Temas</Accordion.Header>
                        <Accordion.Body className="collapsable-content">
                            <div className="map-styles-configuration">
                                <ul className="map-styles-list">
                                    <li className="map-style-list-entry">
                                        <div className="map-style-list-entry-div">
                                            <img src={temaClaro}/>
                                            <p>Claro</p>
                                        </div>
                                        <div className="map-style-list-entry-div">
                                            <img src={temaOscuro}/>
                                            <p>Oscuro</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="2">
                    <Accordion.Header className='collapsable-button'>Configuración avanzada</Accordion.Header>
                        <Accordion.Body className="collapsable-content">
                            <div className="map-styles-configuration">
                                <ul className="map-styles-list">
                                    <li className="map-style-list-entry">
                                        <div className="map-style-list-entry-div">
                                            <button className='settings-button'>Eliminar todos los vehículos</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

//VISTAS DE MAPA
//CAMBIAR TEMA
//RESTABLECER CUENTA