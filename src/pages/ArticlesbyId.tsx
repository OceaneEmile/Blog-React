import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Interface pour un article
interface Article {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  content: string;
}

const ArticlesbyId: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID depuis les paramètres d'URL
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null); // État pour un article spécifique
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Récupérer l'article spécifique par ID
    axios.get(`http://localhost:8000/api/article/${id}`)
      .then(response => {
        setSelectedArticle(response.data); // Stocker l'article spécifique
      })
      .catch(error => {
        console.error('Erreur lors du chargement de l\'article', error);
        setError('Erreur lors du chargement de l\'article');
      });
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!selectedArticle) {
    return <div>Chargement de l'article...</div>; // Afficher un message de chargement pendant l'appel API
  }

  return (
    <main className="p-4">
      <section>
        <h2 className="text-2xl font-bold mb-4">{selectedArticle.title}</h2>
        <div className="p-4 border border-gray-200 rounded-lg">
          <img
            src={selectedArticle.image}
            alt={selectedArticle.title}
            className="mb-2 w-full h-auto rounded-lg"
            loading="lazy"
          />
          <p className="text-sm text-gray-500">{new Date(selectedArticle.createdAt).toLocaleDateString()}</p>
          <p className="text-gray-500">{selectedArticle.content}</p>
        </div>
      </section>
    </main>
  );
};

export default ArticlesbyId;
