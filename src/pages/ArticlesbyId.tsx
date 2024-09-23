import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentForm from "./CommentForm"; 

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
        <div>
          {/* Form to let a comment */}
          {/* articleid is a prop*/}
          <CommentForm articleId={selectedArticle.id}/>
        </div>
        {/* Display the comments */}
                <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Commentaires</h3>
          {comments.length > 0 ? (
            <ul>
              {comments.map(comment => (
                <li key={comment.id} className="mb-4 p-4 bg-gray-100 rounded-md shadow">
                  <p className="text-gray-700"><strong>{comment.author}</strong> - {new Date(comment.createdAt).toLocaleDateString()}</p>
                  <p className="text-gray-600">{comment.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucun commentaire pour cet article.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default ArticlesbyId;
