import React, { useState } from 'react';

interface CommentFormProps {
  articleId: string;
}

// CommentFormprops is a functional component that allows users to submit comments
const CommentForm: React.FC<CommentFormProps> = ({ articleId }) => {
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [statusMessage, setStatusMessage] = useState(""); // message for success or error

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new comment object
    const newComment = {
      author,
      email,
      content,
      article_id: articleId, 
    };

    // Send a POST request to the API and convert the response to JSON
    try {
      const response = await fetch("http://localhost:8000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });
      
      // If the response is successful, display a success message and form is cleared
      if (response.ok) {
        setStatusMessage("Commentaire ajouté avec succès !");
        setAuthor("");
        setEmail("");
        setContent("");
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.error || "Erreur lors de l'ajout du commentaire");
      } // catch is used to handle network errors
    } catch (error) {
      setStatusMessage("Erreur réseau");
    }
  };

  return (
    <div>
      <h2>Laissez un commentaire</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Commentaire :</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Laisser un commentaire</button>
      </form>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default CommentForm;
