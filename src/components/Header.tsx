import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import axios from 'axios';
import bannerImage from '../assets/banner.png';

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

  // Créer des références pour chaque sous-menu
  const destinationsRef = useRef<HTMLDivElement>(null);
  const themesRef = useRef<HTMLDivElement>(null);

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

  // useEffect pour fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Vérifier si le clic est à l'extérieur du sous-menu Destinations
      if (destinationsRef.current && !destinationsRef.current.contains(event.target as Node)) {
        setIsDestinationsMenuOpen(false);
      }
      // Vérifier si le clic est à l'extérieur du sous-menu Thèmes
      if (themesRef.current && !themesRef.current.contains(event.target as Node)) {
        setIsThemesMenuOpen(false);
      }
    };

    // Ajouter l'événement qui écoute les clics sur tout le document
    document.addEventListener("mousedown", handleClickOutside);

    // Nettoyer l'événement lors du démontage du composant pour éviter les fuites
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
          <nav className="flex space-x-5">
            {/* Accueil */}
            <Link to="/api/home" className="text-black hover:underline">
              Accueil
            </Link>

            {/* Destinations - Menu déroulant avec onClick */}
            <div className="relative" ref={destinationsRef}>
              <button
                className="text-black hover:underline"
                onClick={() => setIsDestinationsMenuOpen(!isDestinationsMenuOpen)}
              >
                Destinations
              </button>
              {/* Sous-menu */}
              {isDestinationsMenuOpen && (
                <div className="absolute bg-white text-black mt-2 rounded-md shadow-lg z-20 w-48">
                  {destinations.length > 0 ? (
                    destinations.map((destination) => (
                      <Link
                        key={destination.id}
                        to={`api/articles/destination/${destination.id}`}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        {destination.name}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-2">Pas de destinations</div>
                  )}
                </div>
              )}
            </div>

            {/* Themes - Menu déroulant avec onClick */}
            <div className="relative" ref={themesRef}>
              <button
                className="text-black hover:underline"
                onClick={() => setIsThemesMenuOpen(!isThemesMenuOpen)}
              >
                Thèmes
              </button>
              {/* Sous-menu */}
              {isThemesMenuOpen && (
                <div className="absolute bg-white text-black mt-2 rounded-md shadow-lg z-20 w-48">
                  {themes.length > 0 ? (
                    themes.map((theme) => (
                      <Link
                        key={theme.id}
                        to={`api/theme/${theme.id}`}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        {theme.name}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-2">Pas de thèmes</div>
                  )}
                </div>
              )}
            </div>

            {/* A propos */}
            <Link to="/api/about" className="text-black hover:underline">
              A propos
            </Link>
          </nav>
        </div>
      </header>

      {/* Bannière d'Image avec Texte */}
      <div
        className="relative w-full h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white">
          <h1 className="text-5xl font-bold font-rainbow mt-10">
            Bienvenue sur mon blog
          </h1>
        </div>
      </div>
    </>
  );
};

export default Header;
