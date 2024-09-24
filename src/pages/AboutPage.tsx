// src/components/About.
import './About.css'; // Assure-toi d'ajouter ce fichier pour personnaliser les styles.

const About = () => {
  return (
    <div className="about-container">
      <div className="image-container">
        {/* Ajoute ici l'image en modifiant le chemin */}
        <img src={require('../assets/moi.jpg')} alt="Ton nom" className="profile-image" />
      </div>
      <div className="text-container">
        <h1 className="title">À propos de moi</h1>
        <p className="description">
          Je suis [Ton nom], une passionnée de voyages et d'aventures à travers le monde. 
          Chaque destination que je découvre est une nouvelle histoire, un nouveau souffle 
          d'inspiration. Mon objectif est de partager ces récits avec vous pour vous 
          transporter dans mes aventures.
        </p>
      </div>
    </div>
  );
}

export default About;
