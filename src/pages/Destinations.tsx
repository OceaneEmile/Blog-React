import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Interface
interface Destination {
  id: number;
  name: string;
  image: string;
}

// All the destinations
// Component for section "Destinations" (5 destinations)
const Destinations: React.FC<{ destinations: Destination[] }> = ({ destinations }) => {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-4">Destinations2</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.slice(0, 5).map(destination => (
            <article key={destination.id} className="p-4 border border-gray-200 rounded-lg">
              <a href={`/api/destination/${destination.id}`} className="block">
                <img src={destination.image} alt={destination.name} className="mb-2 w-full h-auto rounded-lg" loading="lazy" />
              </a>
              <h3 className="text-xl font-semibold">{destination.name}</h3>
            </article>
          ))}
        </div>
      </section>
    );
  };

 
  const DestinationsPage: React.FC = () => {

    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [error, setError] = useState<string | null>(null);  
    
    useEffect(() => {
      axios.get('http://localhost:8000/api/destinations')
        .then(response => {
          setDestinations(response.data);
        })
        .catch(error => {
          console.error('Erreur lors du chargement des destinations', error);
          setError('Erreur lors du chargement des destinations');
        });
    }, []);
    if (error) {
        return <div>{error}</div>;
      }
    
      return (
        <main className="p-4">
          <Destinations destinations={destinations} />
        </main>
      );
    };
    
    export default DestinationsPage;
    