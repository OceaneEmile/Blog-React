import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bannerImage from '../assets/banner.png';


// Interfaces
interface Article {
  id: number;
  title: string;
  image: string;
  createdAt: string;
}

interface Theme {
  id: number;
  name: string;
  image: string;
}

interface Destination {
  id: number;
  name: string;
  image: string;
}

// Component for section "À la Une"
const ALaUne: React.FC<{ articles: Article[] }> = ({ articles }) => {
  return (

    <section>
      <div className="relative flex items-center justify-center my-8">
        <hr className="border-t border-gray-300 w-full" />
        <span className="absolute px-4 bg-white text-2xl font-bold font-ptserif">À la une</span>
      </div>
      <p className="mb-4">Les derniers articles du blog</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.slice(0, 3).map(article => (
          <article key={article.id} className="p-4 border border-gray-200 rounded-lg">
            <a href={`/api/article/${article.id}`} className="block">
              <img src={article.image} alt={article.title} className="mb-2 w-full h-auto rounded-lg" loading="lazy" />
            </a>
            <h3 className="text-xl font-semibold">{article.title}</h3>
            <p className="text-sm text-gray-500">{new Date(article.createdAt).toLocaleDateString()}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

// Component for section "Thèmes"
const Themes: React.FC<{ themes: Theme[] }> = ({ themes }) => {
  return (
    <section>
      <div className="relative flex items-center justify-center my-8">
        <hr className="border-t border-gray-300 w-full" />
        <span className="absolute px-4 bg-white text-2xl font-bold font-ptserif">Themes</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map(theme => (
          <article key={theme.id} className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-semibold">{theme.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
};

// Component for section "Destinations" (5 destinations)
const Destinations: React.FC<{ destinations: Destination[] }> = ({ destinations }) => {
  return (
    <section>      
      <div className="relative flex items-center justify-center my-8">
    <hr className="border-t border-gray-300 w-full" />
    <span className="absolute px-4 bg-white text-2xl font-bold font-ptserif">Destinations</span>
  </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.slice(0, 5).map(destination => (
          <article key={destination.id} className="p-4 border border-gray-200 rounded-lg">
            <a href={`/api/destination/${destination.id}`} className="block">
              <img src={destination.image} alt={destination.name} className="mb-2 w-full h-auto rounded-lg" loading="lazy" />
            </a>
            <h3 className="text-xl font-semibold">{destination.name}</h3>
          </article>
        ))}
      </div>
     
    </section>
  );
};

// Main Blog Page Component
const Home: React.FC = () => {

  const [articles, setArticles] = useState<Article[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch articles, themes, and destinations in one API call
    axios.get('http://localhost:8000/api/home')
      .then(response => {
        console.log('API Response:', response.data); // Debug
        const { article, destination, theme } = response.data;

        if (Array.isArray(article)) {
          setArticles(article);
        } else {
          setError('Les articles ne sont pas au format attendu.');
        }

        if (Array.isArray(destination)) {
          setDestinations(destination);
        } else {
          setError('Les destinations ne sont pas au format attendu.');
        }

        if (Array.isArray(theme)) {
          setThemes(theme);
        } else {
          setError('Les thèmes ne sont pas au format attendu.');
        }
      })
      .catch(error => {
        console.error('Erreur lors du chargement des données', error);
        setError('Erreur lors du chargement des données');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="p-4">
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
      <ALaUne articles={articles} />
      <Themes themes={themes} />
      <Destinations destinations={destinations} />
    </main>
  );
};

export default Home;
