import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiPath from "../ApiPath";

export default function Updateproduct(){
   let {id} = useParams();
   const [cat , setcat]=useState("");
   const [pro , setpro]=useState("");
   var x1 =useRef();
   let navigate = useNavigate();
   useEffect(()=>{
    fetch(ApiPath+`get-product-category/`+id)
    .then(res=>res.json())
    .then(val=>{
       console.log(val);
      
       setcat(val['catRec']);
       setpro(val['proRec'])
    })
   },[])
   var  proUpdate =(ev)=>{
      ev.preventDefault();
      fetch(ApiPath+`pro-edit/${id}`,{
         method:"PUT",
         headers: new Headers({ 'content-type': 'application/json' }),
         body: JSON.stringify({
            name:pro,
            catid:x1.current.value
         })
      })
      .then(res=>res.json())
      .then(result=>{
         console.log(result);
         navigate('/show-pro')
      })
   }
   return(
      <div className="container">
         <form onSubmit={proUpdate}>
            <h1>Update Product</h1>
            <select className="form-control" ref={x1}>
               <option value="" >Please Select category</option>
               {
                  cat && cat.map(val=>
                     <option value={val._id}>{val.name}</option>
                     )
               }
            </select>
            <br />
            <input type="text" value={pro.name} onChange={(ev)=>{setpro(ev.target.value)}} className="form-control"/>
            <br/>
            <button>Update</button>
         </form>
      </div>
   )
}