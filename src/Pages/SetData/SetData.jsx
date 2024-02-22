import React, { useEffect, useState } from 'react'
import { FaHome } from "react-icons/fa";
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SetData = () => {

    const db = getFirestore();

    const [billingId1,setBillingId1] = useState('');
    const [roomNo1,setRoomNo1] = useState('');
    const [name1,setName1] = useState('');
    const [phoneNumber1,setPhoneNumber1] = useState('');
    const [roomRent1,setRoomRent1] = useState('');
    const [waterBill1,setWaterBill1] = useState('');
    const [previousDue,setPreviousDue] = useState('');
    const [error,setError] = useState('');

    const handleBillingId1 = ((e)=>{
        setBillingId1(e.target.value);
    })

    const handleRoomNo1 = ((e)=>{
        setRoomNo1(e.target.value);
    })

    const handleName1 = ((e)=>{
        setName1(e.target.value.toUpperCase());
    })
    
    const handlePhoneNumber1 = ((e)=>{
        setPhoneNumber1(e.target.value);
    })

    const handleRoomRent1 = ((e)=>{
        setRoomRent1(e.target.value);
    })

    const handleWaterBill1 = ((e)=>{
        setWaterBill1(e.target.value);
    })

    const handlePreviousDue = ((e)=>{
        setPreviousDue(e.target.value);
    })
    
    const handleSave = (()=>{

        if(!billingId1=='' && !roomNo1=='' && !name1== '' && !phoneNumber1== '' && !roomRent1== '' && !waterBill1== '' && !previousDue == '') {
            console.log('fill');
            setDoc(doc(db, "dataSet" , roomNo1), {
                billigId : billingId1,
                roomNo : roomNo1,
                name: name1,
                phoneNumber : phoneNumber1,
                roomRent: roomRent1,
                waterBill: waterBill1,
                due : previousDue,
            });


            toast.success('SAVED');
            setBillingId1('');
            setRoomNo1('');
            setName1('');
            setPhoneNumber1('');
            setRoomRent1('');
            setWaterBill1('');
            setPreviousDue('');
            
            


        }else{
            
            console.log("faka");
        }

        //.....set Data
        
        
    })

    return (
        <div>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
            />

        <div className='bg-homeImg w-[100vw] h-screen  bg-no-repeat bg-cover object-cover'>
        
            <div className='w-full h-screen bg-[rgba(0,0,0,0.7)]'>
            
            <div className='absolute'>
                <div className='flex gap-2 items-center relative  left-[12px] top-[15px]'>
                    <FaHome className='text-[28px] text-white'/>
                    <p className='text-white font-poppins text-[14px] '>RENTER BILLING APP</p>
                </div>
            </div>
            <div className='px-3  mb-[50px] pt-[65px]'>
            <h1 className='w-full  rounded-full py-1 text-center bg-blue-500 font-opensans font-bold text-[20px] text-white tracking-[1px] '>SET DATA</h1> 
            </div>

            <div className='w-full px-3'>
                <div className='flex mb-2'>
                    <p  className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white ' type="text">ROOM NO</p>
                    <input className='border w-1/2 font-nunito text-[18px] px-2 py-1 focus:border-[5px] focus:outline-none focus:border-blue-500' value={roomNo1} onChange={handleRoomNo1} type='text'></input>
                </div>

                <div className='flex mb-2'>
                    <p  className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '> BILLING ID</p>
                    <input className='border w-1/2 font-nunito text-[18px] px-2 py-1 focus:border-[5px] focus:outline-none focus:border-blue-500' value={billingId1} onChange={handleBillingId1} type='text'></input>
                </div>

                

                <div className='flex mb-2'>
                    <p  className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>NAME</p>
                    <input className='border w-1/2 font-nunito text-[18px] px-2 py-1 focus:border-[5px] focus:outline-none focus:border-blue-500' value={name1} onChange={handleName1} type='text'></input>
                </div>

                <div className='flex mb-2'>
                    <p  className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>PHONE NUMBER</p>
                    <input className='border w-1/2 font-nunito text-[18px] px-2 py-1 focus:border-[5px] focus:outline-none focus:border-blue-500' value={phoneNumber1} onChange={handlePhoneNumber1} type='number'></input>
                </div>

                <div className='flex mb-2'>
                    <p   className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>ROOM RENT</p>
                    <input className='border w-1/2 font-nunito text-[18px] px-2 py-1 focus:border-[5px] focus:outline-none focus:border-blue-500' value={roomRent1} onChange={handleRoomRent1} type='number'></input>
                </div>

                <div className="flex mb-2 ">
                    <p   className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white ' type="text"> WATER BILL</p>
                    <input className='border w-1/2 font-nunito text-[18px] px-2 py-1 focus:border-[5px] focus:outline-none focus:border-blue-500' value={waterBill1} onChange={handleWaterBill1} type='number'></input>
                </div>

                <div className="flex ">
                    <p  className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white ' type="text">PREVIOUS DUE</p>
                    <input className='border w-1/2 font-nunito text-[18px] px-2 py-1 focus:border-[5px] focus:outline-none focus:border-blue-500' value={previousDue} onChange={handlePreviousDue} type='number'></input>
                </div>
            </div>
            <div className='flex w-full px-3 mt-10 gap-x-2'>
                <Link to='/show'  className='w-1/2 text-[24px] flex justify-center items-center font-opensans active:bg-blue-400 font-semibold bg-white text-black py-2'>SHOW
                </Link>
                {
                    (billingId1 && roomNo1 && name1 && phoneNumber1 && roomRent1 && waterBill1 && previousDue ) ?
                    <button onClick={handleSave} className='w-1/2 px-3  text-[24px] font-opensans font-semibold active:bg-blue-900 text-white bg-blue-500 py-2 '>SAVE</button>
                    :
                    <button className='w-1/2 px-3  text-[24px] font-opensans font-semibold active:bg-red-500 text-red-700 bg-white py-2  border-red-500 border-[5px]'>*Fill Up All Data</button>


                }
            </div>

            <div className='fixed bottom-0 w-full '>
                <p className=' w-full py-3 text-center bg-white text-black text-2xl font-semibold font-opensans tracking-[1px] active:bg-blue-400'><Link to='/' > HOME </Link> </p>
            </div>
        


        </div>
        </div>
        </div>
    )
}

export default SetData;