import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Article {
  id: number;
  title: string;
  image: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/home') // fetch the articles from the API
        .then(response => {
            console.log('Réponse API:', response.data); 
            if (Array.isArray(response.data.article)) {
                setArticles(response.data.article);
            } else {
                setError('Les articles ne sont pas au format attendu.');
            }
        })
        .catch(error => {
            console.error('Erreur lors du chargement des articles', error);
            setError('Erreur lors du chargement des articles');
        });
}, []);

if (error) {
    return <div>{error}</div>;
}

// display the articles: images and content
return (
    <main className="p-4">
      {error && <div className="text-red-500">{error}</div>}
      <section>
        <h2 className="text-2xl font-bold mb-4">À la une</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map(article => (
            <article key={article.id} className="p-4 border border-gray-200 rounded-lg">
              {/* Display the image */}
              <img src={article.image} alt={article.title} className="mb-2 w-full h-auto rounded-lg" />
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p className="text-sm text-gray-500">{new Date(article.createdAt).toLocaleDateString()}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
