import React from 'react';
import axios from 'axios';
import WebcamCapture from '../components/CameraUpload';

const API_KEY = '9450b6830d814671cbd9aca632586394'; // Ganti dengan API key Anda
const baseURL = 'https://api.themoviedb.org/3';

const MovieList = () => {
  // State untuk daftar film dan kategori
  const [movies, setMovies] = React.useState([]);
  const [category, setCategory] = React.useState('now_playing');

  // Ambil data film dari API saat komponen dimuat
  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [category]);

  // Fungsi untuk mengubah kategori film
  const handleChangeCategory = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movie List</h1>
      <div className="flex space-x-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handleChangeCategory('now_playing')}
        >
          Now Playing
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handleChangeCategory('popular')}
        >
          Popular
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handleChangeCategory('top_rated')}
        >
          Top Rated
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handleChangeCategory('upcoming')}
        >
          Upcoming
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="mb-2"
            />
            <p className="text-sm">{movie.overview}</p>
            {/* Tambahkan komponen CameraUpload di sini */}
            <WebcamCapture movieId={movie.id} movieTitle={movie.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
