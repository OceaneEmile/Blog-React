import React, { useState } from 'react';

interface CommentFormProps {
  articleId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleId }) => {
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newComment = {
      author,
      email,
      content,
      article_id: articleId,
    };

    try {
      const response = await fetch("http://localhost:8000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        setStatusMessage("Commentaire ajouté avec succès !");
        setAuthor("");
        setEmail("");
        setContent("");
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.error || "Erreur lors de l'ajout du commentaire");
      }
    } catch (error) {
      setStatusMessage("Erreur réseau");
    }
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md w-full mx-auto mt-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Laissez un commentaire</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-blue-700 mb-1">Nom :</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full p-3 border-2 border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-blue-700 mb-1">Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border-2 border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Votre email"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-blue-700 mb-1">Commentaire :</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full h-32 p-3 border-2 border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Votre commentaire"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-yellow-400 text-blue-800 font-bold py-3 px-6 rounded-md hover:bg-yellow-300 transition-colors w-full"
        >
          Laisser un commentaire
        </button>
      </form>
      {statusMessage && (
        <p className={`mt-4 text-center ${statusMessage.includes("succès") ? "text-green-600" : "text-red-600"}`}>
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default CommentForm;
