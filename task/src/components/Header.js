import React from 'react';
import { Link } from 'react-router-dom';
export default function Header() {
    return (
        <div className='container'><ul class="nav">
            <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="add-cat">Add Category</Link>
            </li>
           
            <li class="nav-item">
                <Link class="nav-link" to="add-pro">Add Product</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="show-cat">Show Category</Link>
            </li>
            
            <li class="nav-item">
                <Link class="nav-link" to="show-pro">Show Product</Link>
            </li>
            
        </ul>
        </div>
    )
}