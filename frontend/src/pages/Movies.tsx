import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RentModal from '../components/RentModal';

interface Movie {
  id: number;
  title: string;
  quantity: number;
}

interface MoviesProps {
  token: string;
  isAdmin: boolean;
}

const Movies: React.FC<MoviesProps> = ({ token, isAdmin }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [rentalDays, setRentalDays] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  const fetchMovies = async () => {
      const response = await axios.get('http://localhost:3333/api/movies', { headers: { Authorization: `Bearer ${token}` } });
      setMovies(response.data);
  };

  useEffect(() => {
    fetchMovies();
  }, [token]);

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  }

  const handleRent = async () => {
    if (selectedMovie) {
      try {
        await axios.post('http://localhost:3333/api/rentMovie', { movieId: selectedMovie.id, days: rentalDays }, { headers: { Authorization: `Bearer ${token}` } });
        setShowModal(false);
        await fetchMovies();

      } catch (error) {
        console.error('Erro ao alugar filme', error);
      }
    }
  };

  const exportToCSV = () => {
    const csvRows: string[] = [];
    const headers = Object.keys(movies[0]);
    csvRows.push(headers.join(';'));

    for (const movie of movies) {
      const values = headers.map(header => {
        const value = movie[header as keyof Movie];
        return typeof value === 'string' ? `"${value}"` : value;
      });
      csvRows.push(values.join(';'));
    }

    const csvString = '\uFEFF' + csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'movies.csv';
    a.click();
    URL.revokeObjectURL(url);
  };


  return (
    <div className="container mt-5">
      <h2>{isAdmin ? ' Administrar Filmes Disponíveis' : 'Filmes Disponíveis'}</h2>
      {isAdmin && (
        <button  className="btn btn-primary mb-3" onClick={exportToCSV}>Exportar para CSV</button>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Disponível</th>
            {!isAdmin ? (
            <th>Ações</th>
            ) : ("")}
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.quantity}</td>
              {!isAdmin ? (
              <td>
                <button className="btn btn-primary" onClick={() => { handleSelect(movie); }}>Alugar</button>
              </td>
              ) : ("")}
            </tr>
          ))}
        </tbody>
      </table>



      <RentModal
        show={showModal}
        onHide={() => setShowModal(false)}
        selectedMovie={selectedMovie}
        rentalDays={rentalDays}
        setRentalDays={setRentalDays}
        handleRent={handleRent}
      />

    </div>
  );
};

export default Movies;
