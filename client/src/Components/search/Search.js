import React from 'react'
import {Form} from 'react-bootstrap'



import './Search.css'


const SearchByName = ({setSearchTitle,setSearchCategory}) => {
    
    return (
        <div>
                <Form.Control className='InputSearch' type="text" placeholder="7eme...Bac||Matiere"  onChange={e=>setSearchTitle(e.target.value)}  onChange={e=>setSearchCategory(e.target.value)} />
                
                
        </div>
    )
}

export default SearchByName