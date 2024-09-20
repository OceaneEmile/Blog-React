import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Interface pour la page About
interface AboutPageData {
  message: string;
}

const About: React.FC<{ message: string }> = ({ message }) => {
  return (
    <section>
      <div className="p-4">
        <h1 className="text-2xl font-bold">{message}</h1>
      </div>
    </section>
  );
};

const AboutPage: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutPageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/about')
      .then(response => {
        setAboutData(response.data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des About', error);
        setError('Erreur lors du chargement des About');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="p-4">
      {aboutData ? <About message={aboutData.message} /> : <p>Loading...</p>}
    </main>
  );
};

export default AboutPage;
