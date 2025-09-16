import React, { useContext, useState } from 'react'
import Logo from "../assets/vcart-logo.png"
import google from "../assets/gogle.png"

import { useNavigate } from 'react-router-dom'

import { IoEyeOutline } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa"; 
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

function Login(){

    let [show,Setshow] = useState(false) ;
        let [email , setEmail] = useState("") 
        let [password , setPassword] = useState("")
        let {serverUrl} = useContext(authDataContext)

    let navigate = useNavigate()

    const handleLogin = async(e) =>{
        e.preventDefault() 
        try {

            let result = await axios.post(serverUrl+'/api/auth/login',{
                email , password
            },{withCredentials : true})
                console.log(result.data)
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-t from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
            {/* when we click on the logo of one cart or on title we navigate on home page  */}
            <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>

                <img className='w-[40px]' src={Logo} alt="Logo of the company" />
                <h1 className='text-[22px] font-sans'>OneCart</h1>
            
            </div>

            <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
                <span className='text-[25px] font-semibold'>Login page</span>
                <span className='text-[16px]'>Welcome to OneCart , Place your order</span>

            </div>

            <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
                <form action="" onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
                    <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer'>
                       <img src={google} alt="" className='w-[20px]' /> Registration with Google
                    </div>
                    <div className='w-[100%] h-[20%] flex  items-center justify-center gap-[10px]'>
                            <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
                    </div>
                    <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
                    
                        {/* email */}
                            <input type="email" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} value = {email}/>

                            {/* password */}

                            <input type={show?"text" : "password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value = {password}/>


                           { show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer  right-[5%] bottom-[57%] absolute'onClick={()=>Setshow(prev => !prev)}/>}
                            {!show && <FaEyeSlash className='w-[20px] h-[20px] cursor-pointer  right-[5%] bottom-[57%] absolute'onClick={()=>Setshow(prev => !prev)}/>}

                            <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semib  old'>Login</button>

                            <p className='flex gap-[10px]'>If you haven't any account ? <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={()=>navigate("/signup")}>Create New Account</span></p>
                    </div>
                </form>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Login


