import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Article {
  id: number;
  title: string;
  content: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8001/api/home') //fetch the articles from the API
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
    <main className="p-4">
      {error && <div className="text-red-500">{error}</div>}
      <section>
        <h2 className="text-2xl font-bold mb-4">Derniers Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map(article => (
            <article key={article.id} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold">{article.title}</h3>
              <p>{article.content}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
