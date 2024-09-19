import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import axios from 'axios';
import bannerImage from '../assets/banner.png'; // Assurez-vous que le chemin est correct

interface Destination {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface Theme {
  id: number;
  name: string;
  slug: string;
  description: string;
}

const Header: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isDestinationsMenuOpen, setIsDestinationsMenuOpen] = useState(false);
  const [isThemesMenuOpen, setIsThemesMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/destinations')
      .then(response => {
        setDestinations(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des destinations', error);
        setError('Erreur lors du chargement des destinations');
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/api/themes')
      .then(response => {
        setThemes(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des thèmes', error);
        setError('Erreur lors du chargement des thèmes');
      });
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-2 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-4">
          <Link to="/api/home">
            <img src={Logo} alt="Logo" className="w-32" />
          </Link>
          </div>

            {/* Navigation Menu */}
            <nav className="flex space-x-4">
            {/* Accueil */}
            <Link to="/api/home" className="text-black hover:underline">
              Accueil
            </Link>
            {/* Destinations */}
            <div
              className="relative inline-block"
              onMouseEnter={() => setIsDestinationsMenuOpen(true)}
              onMouseLeave={() => setIsDestinationsMenuOpen(false)}
            >
              <button className="text-black hover:underline">
                Destinations
              </button>
              {isDestinationsMenuOpen && destinations.length > 0 && (
                <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                  {destinations.map((destination) => (
                    <Link
                      key={destination.id}
                      to={`api/articles/destination/${destination.id}`}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      {destination.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Themes */}
            <div
              className="relative inline-block"
              onMouseEnter={() => setIsThemesMenuOpen(true)}
              onMouseLeave={() => setIsThemesMenuOpen(false)}
            >
              <button className="text-black hover:underline">
                Thèmes
              </button>
              {isThemesMenuOpen && themes.length > 0 && (
                <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                  {themes.map((theme) => (
                    <Link
                      key={theme.id}
                      to={`api/themes/${theme.id}`}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      {theme.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
      

      {/* Bannière d'Image avec Texte */}
      <div
        className="relative w-full h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white">
          <h1 className="text-5xl font-bold font-rainbow mt-10">Bienvenue sur mon blog</h1>
        </div>
      </div>
    </>
  );
};

export default Header;
