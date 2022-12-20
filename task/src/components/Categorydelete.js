import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import ApiPath from "../ApiPath";

export default function Categorydelete(){
    var {id} = useParams();
    var navigate = useNavigate();

    useEffect(()=>{
        fetch(ApiPath+'cat-delete/'+id,{
            method:"DELETE"
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            if(result['msg']){
                navigate('/show-cat')
            }
        })
    },[])
    return(
        <div>DELETE PRODUCTS</div>
    )
}