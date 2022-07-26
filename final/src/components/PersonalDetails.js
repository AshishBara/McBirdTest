import React, { useEffect, useState } from 'react';
import { arrDay, arrMonth, arrYear } from '../utils/data';
import { publicIpv4 } from 'public-ip';
import { duplicate, sendSystemDetails, submit } from '../service/api';
import { Link, useNavigate } from 'react-router-dom'


const initialValue = {
    firstname: '',
    lastname: '',
    dob: null,
}

const initValue = {
    ip_address: "",
    device_type: "",
    browser_type: "",
    user_agent: ""
}

function PersonalDetails() {
    const [systemDetail, setSystemDetail] = useState(initValue);
    const [userDetails, setUserDetails] = useState(initialValue);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [ip, setIp] = useState('');
    const [next, setNext] = useState(false);
    const [error, setError] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [visitorId, setVisitorId] = useState('');
    const [userId, setUserId] = useState(10);

    const [fake, setFake] = useState(false);

    const navigation = useNavigate();

    useEffect(() => {
        getIPFromAmazon();
        setSystemDetail({
            ...systemDetail,
            ip_address: ip,
            device_type: window.navigator.platform,
            browser_type: window.navigator.appName,
            user_agent: window.navigator.userAgent
        })
    }, [ip]);

    const sendSystemDetail = async () => {
        let response = await sendSystemDetails();
        setVisitorId(response.data.data.visitorId)
    }

    const getIPFromAmazon = async () => {
        const ipv4 = await publicIpv4()
        setIp(ipv4);
    }

    const handleNext = () => {
        if (userDetails.dob === "--") {
            setError("Date of birth not set")
        } if (firstname === "") {
            setError("First Name is empty")
        } if (lastname === "") {
            setError("Last Name is empty")
        } else {
            setUserDetails({
                ...userDetails,
                firstname: firstname,
                lastname: lastname,
                dob: `${year}-${month}-${day}`
            })
            setNext(!next)
            sendSystemDetail(systemDetail);
        }
    }


    const handleSubmit = async () => {
        let res = await duplicate({
            email: email,
            telephone: phone,
        })

       if(res.data.status === "Failed" && res.data.response.indexOf("exists") !== -1){
        setFake(!fake)
       }else{
        let response = await submit({

            visitor_id: visitorId,
            first_name: firstname,
            last_name: lastname,
            telephone: phone,
            email: email,
            dob: `${year}-${month}-${day}`

        });
        setUserId(response.data.data.userId)

        navigation(`/address/${userId}`)
       }

    }




    return (

        <div className='flex bg-white p-[200px]'>

            {next == true ?

                <>

                    <div className='bg-gray-100 w-[80%] rounded-md py-2'>
                        <span className='mx-[200px] text-2xl text-gray-800 py-2'>Enter Your Contact Details</span>
                        <div className='p-4 space-y-3'>
                            <div className='space-y-1'>
                                <p className='text-gray-700 text-md'>Email Address</p>
                                <input onChange={(e) => setEmail(e.target.email)} name="email" className='w-full p-1 outline-none' type="text" placeholder="Email Address" />
                            </div>
                            <div className='space-y-1'>
                                <p className='text-gray-700 text-md'>Phone Number</p>
                                <input onChange={(e) => setPhone(e.target.value)} name="phone" className='w-full p-1 outline-none' type="text" placeholder="Phone Number" />
                            </div>


                            <button onClick={handleSubmit} className='mx-[40%] bg-green-700 text-gray-100 px-14 py-2 rounded-sm'><Link to={`/address/${userId}`}>Submit</Link></button>

                            {fake && 
                            <>
                            <p className='text-red-500'>Email or Phone already exists. Try again with different Email and Phone</p>
                            </>}
                        </div>

                    </div>

                </> :

                <>
                    <div className='bg-gray-100 w-[80%] rounded-md py-2'>
                        <span className='mx-[200px] text-2xl text-gray-800 py-2'>Enter Your Personal Details</span>
                        <div className='p-4 space-y-3'>
                            <div className='space-y-1'>
                                <p className='text-gray-700 text-md'>First Name</p>
                                <input onChange={(e) => setFirstname(e.target.value)} name="firstname" className='w-full p-1 outline-none' type="text" placeholder="First Name" />
                            </div>
                            <div className='space-y-1'>
                                <p className='text-gray-700 text-md'>Last Name</p>
                                <input onChange={(e) => setLastname(e.target.value)} name="lastname" className='w-full p-1 outline-none' type="text" placeholder="Last Name" />
                            </div>
                            <p className='text-gray-700 text-md mb-2'>Enter Your Date of Birth</p>
                            <div className='relative flex justify-between p-3 rounded-md border border-gray-400'>
                                <div className='absolute py-0.5 px-2 bg-gray-100 -mt-7'>
                                    <p className='text-gray-700 text-md'>Date of Birth</p>
                                </div>

                                <select onChange={(e) => setDay(e.target.value)} className='p-1 w-[200px] outline-none'>
                                    <option value={null}>Day</option>
                                    {arrDay.map(item => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}

                                </select>
                                <select onChange={(e) => setMonth(e.target.value)} className='p-1 w-[200px] outline-none'>
                                    <option value={null}>Month</option>
                                    {arrMonth.map((item, index) => (
                                        <option key={item} value={index + 1}>{item}</option>
                                    ))}

                                </select>

                                <select onChange={(e) => setYear(e.target.value)} className='p-1 w-[200px] outline-none'>
                                    <option value={null}>Year</option>
                                    {arrYear.map(item => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}

                                </select>

                            </div>

                            <button onClick={handleNext} className='mx-[40%] bg-yellow-500 text-gray-800 px-14 py-2 rounded-sm'>Next</button>
                            {error && <div><p className='text-red-500 text-xs'>{error}</p></div>}
                        </div>

                    </div>

                </>}


        </div>

    )
}

export default PersonalDetails