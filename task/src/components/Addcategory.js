import React, { useState } from 'react';
import ApiPath from '../ApiPath';

export default function AddCategory() {
    const [catname, setcatname]=useState('');
    const [Error, setError]=useState('');
    const addcategory =(ev)=>{
        ev.preventDefault();
       // console.log('test')
       if(catname==''){
        setError('category Required')
       }
       else{
        fetch(ApiPath+'add-category',{           
             method:"POST",
             headers: new Headers({'content-type': 'application/json'}),
        body:JSON.stringify(
            {
                name:catname
            }
        )
    })
    .then(res=>res.json())
    .then(result=>{
        console.log(result)
        setError('category Add data')
    }
        )
       }
    }
    const getCategory=(ev)=>{
        setcatname(ev.target.value);

    }
    return (
        <div className='container'>
            <h1 className='text-center'>Add Category</h1>
            <form onSubmit={addcategory}>
                <input type="text" onChange={getCategory} className="form-control"/><br />
                <button className='btn btn-dark'>Add Category</button>
                <p>{Error}</p>
            </form>
            </div>
    )}