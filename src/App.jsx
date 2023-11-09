import { Route, Routes } from 'react-router-dom'
import './index.css'
import { useState } from 'react';
import { Header } from './component/Header'
import { Carrito } from './component/carrito'
import { Producto } from './component/Productos'



function App() {

  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [availableQuantity, setAvailableQuantity] = useState(15);


  return (
    <>
      
      <h1 className='title'>Tienda de harry Potter</h1>
        
      <Header />
      <Routes >
        <Route path='/' element={<Producto
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          total={total}
          setTotal={setTotal}
          availableQuantity={availableQuantity}
          setAvailableQuantity={setAvailableQuantity}/>} />

        <Route path='/carrito' element={<Carrito
          allProducts={allProducts}
          setAllProducts={setAllProducts}
          total={total}
          setTotal={setTotal}
          availableQuantity={availableQuantity}
          setAvailableQuantity={setAvailableQuantity}/>} />
      </Routes>
      
  
    </>
  )
}

export default App
