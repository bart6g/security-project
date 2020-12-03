import React , {useState}from "react"
import axios from 'axios'

const ExpiredPage = () => {

    const [email,setEmail] = useState('')
    const handleSubmit = async (e) =>{
            e.preventDefault();

        try{
            const emailResponse = await axios.post("http://localhost:4000/users/expired-token", {email});
            console.log(emailResponse)
        } catch(err) {
            console.log(err.message)
        }

    }

    return ( 
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email"onChange={(e)=> setEmail(e.target.value)} value={email}/>
                <button type="submit">click</button>
            </form>
        </div>
    )
}

export default ExpiredPage;