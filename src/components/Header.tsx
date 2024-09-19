import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import axios from 'axios';

interface Destination {
  id: number; // Ajout de l'ID pour la redirection
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

  // Fetch destinations from the API
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

  // Fetch themes from the API
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
    <header className="bg-gray-800 text-white p-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl">A travers le globe</h1>
        <Link to="/api/home">
          <img src={Logo} alt="Logo" className="w-32" />
        </Link>

        <nav className="relative flex space-x-4">
          {/* Destinations */}
          <div
            className="relative inline-block"
            onMouseEnter={() => setIsDestinationsMenuOpen(true)}
            onMouseLeave={() => setIsDestinationsMenuOpen(false)}
          >
            <button className="hover:underline">
              Destinations
            </button>

            {/* Sous-menu des destinations */}
            {isDestinationsMenuOpen && destinations.length > 0 && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                {destinations.map((destination) => (
                  <Link
                    key={destination.id}
                    to={`/api/articles/destination/${destination.id}`} // Redirection vers l'API avec l'ID
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    {destination.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Thèmes */}
          <div
            className="relative inline-block"
            onMouseEnter={() => setIsThemesMenuOpen(true)}
            onMouseLeave={() => setIsThemesMenuOpen(false)}
          >
            <button className="hover:underline">
              Thèmes
            </button>

            {/* Sous-menu des thèmes */}
            {isThemesMenuOpen && themes.length > 0 && (
              <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                {themes.map((theme) => (
                  <Link
                    key={theme.id}
                    to={`/api/themes/${theme.slug}`}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    {theme.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Menu mobile */}
        <button className="lg:hidden p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
