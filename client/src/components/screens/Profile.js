import React,{useContext, useEffect, useState} from "react";
import { UserContext } from "../../App";

const Profile = ()=>{
    const [mypics,setPics] = useState([])
    const user = JSON.parse(localStorage.getItem("user"))
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
    },[])
    return(
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                display: 'flex',
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src={user?user.pic:"loading"} />
                </div>
                <div>
                 <h4>{user.name}</h4>
                 <h5>{user.email}</h5>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h5>{mypics.length} Posts</h5>
                        <h5>{user.followers.length}followers</h5>
                        <h5>{user.following.length}following</h5>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title}/> 
                        )
                    })
                }
              
              
              
            </div>
        </div>
    )
}

export default Profile;