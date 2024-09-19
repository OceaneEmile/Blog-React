import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Article {
  id: number;
  title: string;
  image: string;
  content: string;
  createdAt: string;
}
interface Theme {
  id: number;
  name: string;
}

const ArticlesByTheme: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID depuis les paramètres d'URL
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [Theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Récupérer les articles par Theme
    axios.get(`http://localhost:8000/api/articles/theme/${id}`)
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des articles', error);
        setError('Erreur lors du chargement des articles');
      });

    // Récupérer le nom de la Theme
    axios.get(`http://localhost:8000/api/theme/${id}`)
      .then(response => {
        setTheme(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement de la Theme', error);
        setError('Erreur lors du chargement de la Theme');
      });
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl mb-4">{Theme ? Theme.name : 'Theme'}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map(article => (
          <article key={article.id} className="p-4 border border-gray-200 rounded-lg">
          <a href={`/api/article/${article.id}`} className="block">
            <img src={article.image} alt={article.title} className="mb-2 w-full h-auto rounded-lg" loading="lazy" />
          </a>
          <h3 className="text-xl font-semibold">{article.title}</h3>
          <p className="text-sm text-gray-500">{new Date(article.createdAt).toLocaleDateString()}</p>
        </article>
        ))}
      </div>
    </div>
  );
};

export default ArticlesByTheme;
