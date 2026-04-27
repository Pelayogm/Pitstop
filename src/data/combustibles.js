const API = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/';
const parseCoord = (s) => parseFloat((s || '').replace(',', '.'));

export async function fetchEstaciones() {
  const r = await fetch(API);
  const data = await r.json();
  return data.ListaEESSPrecio.filter((e) => {
    const lat = parseCoord(e['Latitud']);
    const lng = parseCoord(e['Longitud (WGS84)']);
    return !isNaN(lat) && !isNaN(lng);
  });
}