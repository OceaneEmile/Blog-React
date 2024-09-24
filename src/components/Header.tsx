import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import axios from 'axios';

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
  const [isDestinationsMenuOpen, setIsDestinationsMenuOpen] = useState(false); //False by default to close the sub-menu
  const [isThemesMenuOpen, setIsThemesMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Useref for the destinations and themes sub-menus
  // Refs are used to access the DOM elements directly
  const destinationsRef = useRef<HTMLDivElement>(null);
  const themesRef = useRef<HTMLDivElement>(null);

  // Fetch destinations
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
 // Fetch themes
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

  //Function handleClickoutside called when the user clicks outside the sub-menu ( event Mousedown)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the Destinations sub-menu, then close it
      // by using useref to know if the click is outside the sub-menu
      if (destinationsRef.current && !destinationsRef.current.contains(event.target as Node)) {
        setIsDestinationsMenuOpen(false); // when set to false, the sub-menu will be closed, when set to true, the sub-menu will be open
      }
      // Check if the click is outside the Theme sub-menu
      if (themesRef.current && !themesRef.current.contains(event.target as Node)) {
        setIsThemesMenuOpen(false);
      }
    };

    // Add event mousedown (js event)to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  return (
    <>
     <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between py-2 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/api/home">
              <img src={Logo} alt="Logo" className="w-16" /> {/* Small size */}
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="ml-auto flex space-x-5">  
            <Link to="/api/home" className="text-black hover:underline">
              Accueil
            </Link>

            {/* Destinations - Menu déroulant */}
            <div className="relative" ref={destinationsRef}>
              <button
                className="text-black hover:underline"
                onClick={() => setIsDestinationsMenuOpen(!isDestinationsMenuOpen)}
              >
                Destinations
              </button>
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

            {/* Themes - Menu déroulant */}
            <div className="relative" ref={themesRef}>
              <button
                className="text-black hover:underline"
                onClick={() => setIsThemesMenuOpen(!isThemesMenuOpen)}
              >
                Thèmes
              </button>
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

            <Link to="/api/about" className="text-black hover:underline">
              A propos
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};


export default Header;
