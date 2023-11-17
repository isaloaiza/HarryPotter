import React from 'react';
import { NavLink } from 'react-router-dom';



export const Header = () => {

    return (
        <header>
            <h1 className="title">Libros Harry Potter</h1>
            <div>
                <NavLink to='/' className="link">Libros</NavLink >
                <NavLink to='/Carrito' className="link">carrito </NavLink>
            </div>
        </header>

    )
}