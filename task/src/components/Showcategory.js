
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiPath from '../ApiPath';
export default function Showcategory() {
  var [api,setApi]=useState([]);
  useEffect(()=>{
    fetch(ApiPath+'Show-category')

.then(res=>res.json())
.then(result=>{
 console.log(result)
 setApi(result)
}
 )
},[])

    return (
        <div className='container'>
            <h1 className='text-center'>Show Category</h1>
            <table class="table">
  <thead>
    <tr>
    <th scope="col">Category Id</th>
      <th scope="col">Category Name</th>
      <th scope='col'>Update</th>
      <th scope='col'>Delete</th>

      
    </tr>
  </thead>
  <tbody>
    {
    api && api.map(val=>
<tr>
      
      <td>{val._id}</td>
      <td>{val.name}</td>
      <td><Link className='btn btn-primary' to={"/cat-update/"+val._id}>Update</Link></td>
      <td><Link className='btn btn-danger' to={"/cat-delete/"+val._id}>Delete</Link></td>
    </tr>
    )
}
    
  </tbody>
</table>
 </div>
    )}