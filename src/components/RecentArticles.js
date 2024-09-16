import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecentArticles = () => {
    const [articles, setArticles] = useState([]); //initiate the state with an empty array
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/home') //fetch the articles from the API
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
    // other error handling
    if (error) {
        return <div>{error}</div>;
    }
    // display the articles : titles and content
    return (
        <div>
            {articles.length === 0 ? (
                <p>Aucun article disponible.</p>
            ) : (
                <ul>
                    {articles.map(article => (
                        <li key={article.id}>
                            <h2>{article.title}</h2>
                            <p>{article.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecentArticles;
