
import React, { useEffect, useRef, useState } from 'react';
import ApiPath from '../ApiPath';

export default function Addproduct() {
  var x1 = useRef();
  var x2 = useRef();
  var [api, setApi] = useState([]);
  const [Error, setError]=useState('');
  useEffect(() => {
    fetch(ApiPath + 'add-category')

      .then(res => res.json())
      .then(result => {
        console.log(result)
        setApi(result)
      }
      )
  }, [])
  var addproduct = () => {

    var cat_id = x1.current.value;
    var add_pro = x2.current.value;
    //   console.log(cat_id)
    //  console.log(add_pro)
    if (cat_id != "" && add_pro != ""){ 
      fetch(ApiPath+ 'add-product', {
        method: "POST",
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(
          {
            name: add_pro,
            catid: cat_id
          }
        )
      })
        .then(res => res.json())
        .then(result => {
          console.log(result)
        }
        )
      }
    else {
      alert('value require')
    }
  }
  return (
    <div className='container'>
      <h1 className='text-center'>Add Product</h1>
      <select className='form-control' ref={x1}>
        <option>Please  Select categories</option>
        {
          api && api.map(val =>
            <option value={val._id}>{val.name}</option>
          )}
      </select>
      <br />
      <input type="text" className='form-control' ref={x2} />
      <br />
      <button onClick={addproduct} className='btn btn-dark'>Add Product</button>
      <br/>
      <p>{Error}</p>

    </div>
  )
}