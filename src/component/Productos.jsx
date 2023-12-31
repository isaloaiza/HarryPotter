import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AvailableQuantityContext } from '../AvailableQuantityContext';

export const Producto = ({ allProducts, setAllProducts, total, setTotal }) => {
  const { availableQuantity, setAvailableQuantity } = useContext(AvailableQuantityContext);
  const [movies, setMovies] = useState([]);
  const defaultPrice = 50;

  useEffect(() => {
    async function fetchMovies() {
      try {
        const movieResponse = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: 'd738c5cc1dcf80efed561b5a678ed8cb', // Reemplaza con tu clave de API
            query: 'Harry Potter',
            language: 'es',
          },
        });

        const moviesWithQuantity = movieResponse.data.results.map((movie) => {
          // Intenta obtener la cantidad del localStorage
          const storedQuantity = parseInt(localStorage.getItem(`quantity_${movie.id}`), 10);
          return {
            ...movie,
            availableQuantity: availableQuantity - (storedQuantity || 0),
            quantity: storedQuantity || 1,
          };
        });

        setMovies(moviesWithQuantity);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    }

    fetchMovies();
  }, [availableQuantity[movies.id]]); 

  const onAddProductToCart = (product) => {
    const nuevaCantidadTotal = availableQuantity - product.quantity;

    if (nuevaCantidadTotal < 0) {
      alert('No puedes agregar más de este producto al carrito');
      return;
    }

    if (nuevaCantidadTotal === 0) {
      alert('Producto agotado');
    }

    // Guarda la nueva cantidad en localStorage
    localStorage.setItem(`quantity_${product.id}`, product.quantity.toString());

    setAvailableQuantity((prev) => prev - product.quantity);

    const updatedMovies = movies.map((movie) =>
      movie.id === product.id ? { ...movie, availableQuantity: nuevaCantidadTotal } : movie
    );
    setMovies(updatedMovies);

    const existingProduct = allProducts.find((item) => item.id === product.id);

    if (existingProduct) {
      setAllProducts((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
        )
      );
    } else {
      const newProduct = {
        id: product.id,
        nameProduct: product.title,
        description: product.overview,
        price: defaultPrice,
        quantity: product.quantity,
      };
      setAllProducts([...allProducts, newProduct]);
    }

    setTotal((prev) => prev + defaultPrice * product.quantity);
  };

  return (
    <div className="App">
      <main>
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={movie.title}
              />
              <h2>{movie.title}</h2>
              <br />
              <p>Precio: ${defaultPrice}</p>
              <p>Cantidad disponible: {movie.availableQuantity}</p>
              <input
                type="number"
                placeholder="Cantidad personalizada"
                value={movie.quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value) || 1;

                  if (newQuantity > movie.availableQuantity) {
                    alert('No puedes agregar más de este producto al carrito');
                    return;
                  }

                  setMovies((prev) =>
                    prev.map((m) => (m.id === movie.id ? { ...m, quantity: newQuantity } : m))
                  );
                  localStorage.setItem(`quantity_${movie.id}`, newQuantity.toString());
                }}
              />
              <br />
              <br />
              <button onClick={() => onAddProductToCart(movie)} className="post">
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
