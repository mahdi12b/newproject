import axios from 'axios'
import React, { useEffect, useState } from 'react'
import User from '../../Components/user/User'


const UsersManagment = () => {
const [users, setUsers] = useState([])


    useEffect(() => {
       axios.get('/api/users/getusers').then((response)=>{
           if(response.data){
               console.log(response.data.listStudent)
            setUsers(response.data.listStudent)
           }
           else{

               alert('failed to get users list')
           }
       })
    }, [])
    console.log(users)
    return (
        <div>
           {users.map((user)=>{
               <User key={user._id} Users={users}/>
           })}
           aaaaaaa
        </div>
    )
}

export default UsersManagment
