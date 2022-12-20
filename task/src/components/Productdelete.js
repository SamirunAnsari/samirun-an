import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import ApiPath from "../ApiPath";

export default function Productdelete(){
    var {id} = useParams();
    var navigate = useNavigate();

    useEffect(()=>{
        fetch(ApiPath+'show-delete/'+id,{
            method:"DELETE"
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            if(result['msg']){
                navigate('/show-pro')
            }
        })
    },[])
    return(
        <div>DELETE PRODUCTS</div>
    )
}