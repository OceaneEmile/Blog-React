import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentForm from "./CommentForm";
import ScrollToTop from '../components/ScrollToTop';

interface Article {
  id: string;
  title: string;
  image: string;
  createdAt: string;
  content: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  articleId: string;
}

const ArticlesbyId: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // récupérer l'ID depuis l'URL
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Récupérer l'article avec l'ID spécifié
  useEffect(() => {
    axios.get(`http://localhost:8000/api/article/${id}`)
      .then(response => {
        setSelectedArticle(response.data); // Enregistrer l'article dans l'état
      })
      .catch(error => {
        console.error('Erreur lors du chargement de l\'article', error);
        setError('Erreur lors du chargement de l\'article');
      });
  }, [id]);

  // Récupérer les commentaires de l'article avec l'ID spécifié
  useEffect(() => {
    axios.get(`http://localhost:8000/api/articles/${id}/comments`)
      .then(response => {
        setComments(response.data); // Enregistrer les commentaires dans l'état
      })
      .catch(error => {
        console.error('Erreur lors du chargement des commentaires', error);
        setError('Erreur lors du chargement des commentaires');
      });
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!selectedArticle) {
    return <div>Chargement de l'article...</div>;
  }

  return (
    <main className="p-6 md:p-12">
      <section className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne gauche : Article */}
        <article className="lg:col-span-2">
          {/* Titre de l'article */}
          <h1 className="mb-18 text-3xl font-bold mb-6 text-center text-blue-800">{selectedArticle.title}</h1>
          
          {/* Image réduite avec une bordure douce */}
          <div className="mb-6">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full max-w-3xl h-auto mx-auto rounded-lg shadow-md"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>

          {/* Date et contenu */}
          <p className="text-sm text-gray-500 mb-6 text-center">
            Publié le {new Date(selectedArticle.createdAt).toLocaleDateString()}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">{selectedArticle.content}</p>
          
          {/* Section des commentaires */}
          <div className="mt-12">
            <CommentForm articleId={selectedArticle.id} />
          </div>
          
          {/* Liste des commentaires */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-4">Commentaires</h3>
            {comments.length > 0 ? (
              <ul className="space-y-4">
                {comments.map(comment => (
                  <li key={comment.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600">
                      <strong>{comment.author}</strong> le {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-base text-gray-700 mt-2">{comment.content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Aucun commentaire pour cet article.</p>
            )}
          </div>
        </article>

        {/* Colonne droite : À propos de moi */}
        <aside className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-semibold mb-4">Travel with me</h2>
          <p className="text-gray-700 mb-6">
            Hello! Moi c'est Océane, passionnée de voyages et d'aventures, toujours à la recherche de nouvelles expériences et de lieux fascinants à explorer. Mon premier voyage où je suis partie vraiment seule était Taiwan à l'âge de 20 ans et depuis j'ai enchaîné les destinations. Voyager seule ne m'a plus fait peur. Mon blog s'adresse à tous les voyageurs en quête d'inspiration et de conseils pour organiser leur prochain voyage et pour tous les budgets.
          </p>
          <h2 className="text-center text-2xl font-semibold mb-4">Suivez-moi sur Instagram</h2>
          <div className="text-center mt-4">
            <a
              href="https://www.instagram.com/oce2/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              Découvrir Instagram
            </a>
          </div>
        </aside>
      </section>
      <ScrollToTop />
    </main>
  );
};

export default ArticlesbyId;
