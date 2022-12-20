import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiPath from '../ApiPath';


export default function Showproduct() {
  var [api, setApi] = useState([]);
  var[count,setCount] = useState(0);
  var[page,setPage] = useState(0);
  var[pagearr,setPagearr] = useState([]);
  var[perpage,setPerpage] = useState(10);
  
  useEffect(() => {
    fetch(ApiPath + 'Show-product')

      .then(res => res.json())
      .then(result => {
        console.log(result)
        setApi(result)
        var{ans_product,ans_count} = result;

        console.log(ans_count);
        setApi(ans_product);
        setCount(ans_count);

        var totalPages=Math.ceil(ans_count/perpage);

        setPage(totalPages );

        var arrPage = [];
        for(var i=1;i<=totalPages;i++){
            // console.log(i);
            arrPage.push(i);
        }
        console.log(arrPage);
        setPagearr(arrPage);

      }
      )
  },[])
  function product(ev){
    ev.preventDefault();
    console.log(ev.target.attributes.for.value);
    var pageno = ev.target.attributes.for.value;
    console.log(perpage);

    var skipvalue = perpage * pageno - perpage;
    console.log(skipvalue , pageno);
    console.log(`show-pro/${skipvalue}/${perpage}`);
    fetch(`${ ApiPath}show-pro/${skipvalue}/${perpage}`)
    .then(res=>res.json())
    .then(ans=>{
        console.log("After Pagination");
        console.log(ans);
        var{ans_product,ans_count} =ans;
        setApi(ans_product);
    })
}
    return (
        <div className='container'>
           <hr />
        {count} , {page}

        <hr />
        {
            pagearr && pagearr.length>0 && pagearr.map(val=>
                
                <span>
                    <a href='#' for={val} onClick={product}>Page {val} </a> &nbsp;
                </span>    
            )
        }
            <h1 className='text-center'>Show Product</h1>
            <table class="table">
  <thead>
    <tr>
    <th scope="col">Product Id</th>
      <th scope="col">Product Name</th>
      <th scope="col">Category Id</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>
      
    </tr>
  </thead>
  <tbody>
    {
      api && api.map(val=>

        <tr>
        
           <td>{val._id}</td>
        <td>{val.name}</td>
        <td>{val.catid}</td>
        <td><Link className='btn btn-primary' to={"pro-update/"+val._id}>Update</Link></td>
      <td><Link className='btn btn-danger' to={"/pro-delete/"+val._id}>Delete</Link></td>
    </tr>
        )
    }
    
  </tbody>
</table>
            </div>
    )}