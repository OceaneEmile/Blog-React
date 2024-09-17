import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Vous pouvez remplacer ou ajouter des fichiers CSS ou Tailwind ici
import App from './App';
// import reportWebVitals from './reportWebVitals';

// Assurez-vous que `root` est non nul
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No root element found');
}
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si vous souhaitez mesurer les performances de votre application, passez une fonction
// pour enregistrer les résultats (par exemple : reportWebVitals(console.log))
// ou envoyez-les à un point de terminaison d'analyse. En savoir plus : https://bit.ly/CRA-vitals
// reportWebVitals();
