import React from 'react';

export const Carrito = ({
    allProducts,
    setAllProducts,
    total,
    setTotal,
}) => {

    const onDeleteProduct = product => {
        const results = allProducts.filter(
            item => item.id !== product.id
        );

        setTotal(total - product.price * product.quantity);
        setAllProducts(results);
    };

    const onCleanCart = () => {
        setAllProducts([]);
        setTotal(0);
    };

    return (
        <header>
            <div>
                {allProducts.length ? (
                    <>
                        <div className='row-product'>
                            {allProducts.map(product => (
                                <div className='cart-product' key={product.id}>
                                    <div className='info-cart-product'>
                                        <span className='cantidad-producto-carrito'>
                                            {product.quantity}
                                        </span>
                                        <p className='titulo-producto-carrito'>
                                            {product.nameProduct}
                                        </p>
                                        <span className='precio-producto-carrito'>
                                            ${product.price} 
                                        </span>
                                        <span className='total-producto-carrito'>
                                            Total: ${product.price * product.quantity}
                                        </span>
                                    </div>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth='1.5'
                                        stroke='currentColor'
                                        className='icon-close'
                                        onClick={() => onDeleteProduct(product)}
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M6 18L18 6M6 6l12 12'
                                        />
                                    </svg>
                                </div>
                            ))}
                        </div>

                        <div className='cart-total'>
                            <h3>Total:</h3>
                            <span className='total-pagar'>${total}</span>
                        </div>

                        <button className='btn-clear-all' onClick={onCleanCart}>
                            Vaciar Carrito
                        </button>
                    </>
                ) : (
                    <p className='cart-empty'>El carrito está vacío</p>
                )}
            </div>
        </header>
    );
};
