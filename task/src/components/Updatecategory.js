// import axios from "axios";
 import { useEffect, useState } from "react";
 import { useNavigate, useParams } from "react-router-dom"
 import ApiPath from "../ApiPath";


 export default function Updatecategory(){
    var [name, setcatname]=useState("");
    var navigate = useNavigate();
     let {id} = useParams();
    useEffect(()=>{
     fetch(ApiPath+'Show-category/'+id)
      .then(res=>res.json())
      .then(val=>{
         console.log(val);
         var{_id,name}=val;
         setcatname(name);

      })
     },[])
      function update(ev){
        ev.preventDefault();
        var categoryname = name;
        fetch(ApiPath+ 'cat-edit/'+id,{
            method: "PUT",
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify(
              {
                name:categoryname
              }
            )
          })
          .then(res=>res.json())
          .then(val=>{
             console.log(val);
          
             if(val['msg']){
               navigate("/show-cat")
                alert()
             }
            
    
          })
      }
     return(
         <div className="container">
            <form onSubmit={update}>
             <h1>Update Category</h1>
             <input type="text" value={name} onChange={(ev)=>{setcatname(ev.target.value)}}  className="form-control"/>
             <br/>
             <button>Update</button>
             </form>
         </div>
     )
 }