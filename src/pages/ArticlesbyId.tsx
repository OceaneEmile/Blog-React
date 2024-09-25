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
  const { id } = useParams<{ id: string }>(); //retrieving the ID from the URL
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch the article with the specified ID
  useEffect(() => {
    axios.get(`http://localhost:8000/api/article/${id}`)
      .then(response => {
        setSelectedArticle(response.data); // Save the article in the state
      })
      .catch(error => {
        console.error('Erreur lors du chargement de l\'article', error);
        setError('Erreur lors du chargement de l\'article');
      });
  }, [id]);

  // Fetch the comments of the article with the specified ID
  useEffect(() => {
    axios.get(`http://localhost:8000/api/articles/${id}/comments`)
      .then(response => {
        setComments(response.data); // Save the comments in the state
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
    <main className=" p-6 md:p-12">
      <section className="mt-20">
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
          <CommentForm articleId={selectedArticle.id}/>
        </div>
        
        {/* Liste des commentaires */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Commentaires</h3>
          {comments.length > 0 ? (
            <ul className="space-y-4">
              {comments.map(comment => (
                <li key={comment.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600"><strong>{comment.author}</strong> le {new Date(comment.createdAt).toLocaleDateString()}</p>
                  <p className="text-base text-gray-700 mt-2">{comment.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucun commentaire pour cet article.</p>
          )}
        </div>
      </section>
      <ScrollToTop />
    </main>
  );
};


export default ArticlesbyId;
