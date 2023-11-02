import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Producto = ({
  allProducts,
  setAllProducts,
  total,
  setTotal,
}) => {
  const [movies, setMovies] = useState([]);
  const defaultPrice = 10; // Precio predeterminado para todos los productos

  const onAddProductToCart = (product) => {
    // Resta la cantidad personalizada del total predeterminado
    const nuevaCantidadTotal = product.availableQuantity - product.quantity;

    if (nuevaCantidadTotal < 0) {
      alert('No puedes agregar más de este producto al carrito');
      return;
    }

    if (nuevaCantidadTotal === 0) {
      alert('Producto agotado');
    }

    // Actualiza la cantidad disponible y la cantidad personalizada en el estado de las películas
    const updatedMovies = movies.map(movie =>
      movie.id === product.id ? { ...movie, availableQuantity: nuevaCantidadTotal, quantity: 1 } : movie
    );
    setMovies(updatedMovies);

    const existingProduct = allProducts.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si el producto ya existe en el carrito, actualiza su cantidad
      const updatedProducts = allProducts.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      );
      setAllProducts(updatedProducts);
    } else {
      // Si el producto no existe en el carrito, agrégalo con los valores predeterminados
      const newProduct = {
        id: product.id,
        nameProduct: product.title,
        description: product.overview,
        price: defaultPrice,
        quantity: product.quantity,
      };
      setAllProducts([...allProducts, newProduct]);
    }

    // Actualiza el contador y el total
    setTotal(total + defaultPrice * product.quantity);
  };

  useEffect(() => {
    // Consulta a la API de películas
    async function fetchMovies() {
      try {
        const movieResponse = await axios.get(
          'https://api.themoviedb.org/3/search/movie',
          {
            params: {
              api_key: 'd738c5cc1dcf80efed561b5a678ed8cb', // Reemplaza esto con tu clave de API de TMDb
              query: 'Harry Potter',
              language: 'es',
            },
          }
        );

        // Agrega availableQuantity y quantity a cada película
        const moviesWithQuantity = movieResponse.data.results.map(movie => ({
          ...movie,
          availableQuantity: 10, // o cualquier cantidad inicial que desees
          quantity: 1, // cantidad inicial para cada producto
        }));

        setMovies(moviesWithQuantity);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    }

    fetchMovies();
  }, []);

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
              <h2>{movie.title}</h2><br />
              <p>Precio: $10</p>
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

                  const updatedMovies = movies.map(m =>
                    m.id === movie.id ? { ...m, quantity: newQuantity } : m
                  );
  
                  setMovies(updatedMovies);
                }}
              /><br /><br />
              <button onClick={() => onAddProductToCart(movie)} className='post'>Agregar al carrito</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};


