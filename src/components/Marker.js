import L from 'leaflet';
import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
import MarkerPopup from './MarkerPopup';

const CIRCLE_OPTIONS = {
  radius:      12,
  color:       '#c0392b',
  fillColor:   '#e74c3c',
  fillOpacity: 0.75,
  weight:      1,
};

export function createStationMarker(estacion) {
  const container = document.createElement('div');
  const popup     = L.popup({ maxWidth: 300 }).setContent(container);
  const marker    = L.circleMarker(
    [estacion._lat, estacion._lng],
    CIRCLE_OPTIONS
  ).bindPopup(popup);

  let root = createRoot(container);
  root.render(createElement(MarkerPopup, { estacion }));
  let closeTimeout = null;

  marker.on('popupopen', function () {
    if (!root) {
      root = createRoot(container);
    }
    root.render(createElement(MarkerPopup, { estacion }));

    const popupEl = this.getPopup().getElement();
    if (popupEl) {
      popupEl.addEventListener('mouseenter', () => clearTimeout(closeTimeout));
      popupEl.addEventListener('mouseleave', () => {
        closeTimeout = setTimeout(() => marker.closePopup(), 200);
      });
    }
  });

  marker.on('mouseover', function () {
    clearTimeout(closeTimeout);
    this.openPopup();
  });

  marker.on('mouseout', function () {
    const self = this;
    closeTimeout = setTimeout(() => self.closePopup(), 200);
  });

  const destroy = () => root?.unmount();

  return { marker, destroy };
}