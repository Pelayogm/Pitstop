import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { createStationMarker } from './Marker';

const parseCoord = (s) => parseFloat((s || '').replace(',', '.'));

function prepareEstacion(e) {
  const lat = parseCoord(e['Latitud']);
  const lng  = parseCoord(e['Longitud (WGS84)']);
  if (isNaN(lat) || isNaN(lng)) return null;
  return { ...e, _lat: lat, _lng: lng };
}

export default function EstacionesLayer({ estaciones }) {
  const map = useMap();

  useEffect(() => {
    if (!estaciones.length) return;

    const group    = L.featureGroup();
    const cleanups = [];

    estaciones.forEach((e) => {
      const estacion = prepareEstacion(e);
      if (!estacion) return;

      const { marker, destroy } = createStationMarker(estacion);
      marker.addTo(group);
      cleanups.push(destroy);
    });

    group.addTo(map);

    return () => {
      cleanups.forEach((fn) => fn());
      group.remove();
    };
  }, [map, estaciones]);

  return null;
}