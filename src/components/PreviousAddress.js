import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom";
import { addressSubmit } from '../service/api';


const initialValue = {
    user_id: "",
    previousAddress: {
        no:{
            prev_address_line1: "",
            prev_address_line2: "",
            prev_address_line3: ""
        }
    },

}


function PreviousAddress() {
    const { id } = useParams();

    const [addressCount, setAddressCount] = useState([1]);
    const [address, setAddress] = useState(initialValue);
    const [add1, setAdd1] = useState([]);
    const [add2, setAdd2] = useState([]);
    const [add3, setAdd3] = useState([]);

    const handleSubmit = async() => {
        for(let i=0; i<addressCount.length; i++){
            setAddress({...address, user_id: id,
            previousAddress: {
                i:{
                    prev_address_line1: add1[i],
                    prev_address_line2: add2[i],
                    prev_address_line3: add3[i]
                }
            }})
        }
        
       let response = await addressSubmit(address);
       console.log(response)
    }

    const handleAdd = () => {
        setAddressCount([...addressCount, 1])
    }
    const handleRemove = () => {
        setAddressCount(addressCount.filter((item, index) => { return index !== addressCount.length - 1 }))
    }
    return (

        <div className='bg-white py-[200px] px-[100px] ml-[200px]'>
            <div className='bg-gray-100 w-[80%] rounded-md py-2'>
                <span className='mx-[200px] text-2xl text-gray-800 py-2'>Enter Your Previous Address</span>
                <div className='p-4 space-y-5'>
                    {addressCount.map((item, index) => (
                        <div className='space-y-2'>
                            <p className='text-gray-700 text-sm'>Previous Address {index + 1}</p>
                            <input onChange={(e)=>setAdd1[index](e.target.value)} name="prev_address_line1" className='w-full p-1 outline-none text-xs' type="text" placeholder="Address Line 1" />
                            <input onChange={(e)=>setAdd2[index](e.target.value)} name="prev_address_line2" className='w-full p-1 outline-none text-xs' type="text" placeholder="Address Line 2" />
                            <input onChange={(e)=>setAdd3[index](e.target.value)} name="prev_address_line3" className='w-full p-1 outline-none text-xs' type="text" placeholder="Address Line 3" />
                        </div>
                    ))}


                    <div className='flex-col items-center mx-[250px] justify-center'>
                        <button onClick={handleSubmit} className=' bg-green-700 text-gray-100 px-14 py-2 rounded-sm'>Submit</button>
                        <p onClick={handleAdd} className='text-blue-500 underline cursor-pointer text-xs mx-5'>Add Another Address</p>
                        {addressCount.length > 1 ?
                            <p onClick={handleRemove} className='text-blue-500 underline cursor-pointer text-xs mx-7'>Remove Address</p>
                            : <Link to="/"><p className='text-blue-500 underline cursor-pointer text-xs ml-10'>{`<<Back`}</p></Link>
                        }

                    </div>

                </div>

            </div>
        </div>
    )
}

export default PreviousAddress