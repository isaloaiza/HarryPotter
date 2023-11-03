import React from 'react';
import { NavLink } from 'react-router-dom';



export const Header = ({}) => {

    return (
        <header>
            <NavLink to='/' className="link">Libros</NavLink >
            <NavLink to='/Carrito' className="link">carrito </NavLink>
        </header>
        
    )
}