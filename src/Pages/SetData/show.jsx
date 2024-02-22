import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const show = () => {
    const db = getFirestore();
    const value= collection(db, "dataSet")
    const [val, setVal] = useState([]);
    useEffect(()=>{
        const getData = async()=>{
            const dbVal = await getDocs(value)
            setVal(dbVal.docs.map(doc =>({...doc.data(),id:doc.id})))
        }
        getData(); 
    })
  return (
    <div className='bg-homeImg w-[100vw] h-screen  bg-no-repeat bg-cover object-cover overflow-hidden hover:overflow-y-scroll' >
        <div className='w-full h-100% bg-[rgba(0,0,0,0.7)]'>
            <div className='absolute flex justify-between w-full'>
                <div className='flex gap-2 items-center relative  left-[12px] top-[15px]'>
                    <FaHome className='text-[28px] text-white'/>
                    <p className='text-white font-poppins text-[14px] '>RENTER BILLING APP</p>
                </div>
                <div className='pt-[25px] w-1/3 mx-[50px]'>
                <Link to='/setdata'  className=''>
                    <div className='text-[24px] text-center  font-opensans  font-bold py-2 bg-blue-400 active:bg-blue-900 text-white rounded-xl'>
                        HIDE
                    </div>
                </Link>
                </div>


            </div>


            <div className='overflow-hidden overflow-y-scroll pb-[100px]'>

            {
                
                val.map((e)=>(
                    <div className=''>
                        <div className='px-[50px] pt-[100px] mb-[20px]'>
                            <h1 className='w-full  rounded-full py-1 text-center bg-white font-opensans font-bold text-[20px] text-Black tracking-[1px] '>ROOM NO : {e.roomNo}</h1> 
                        </div>
                        <div className='px-[50px] text-white  w-full mt-[10px]'>
                        <div className='flex mb-2'>
                            <p  className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>billing </p>
                            <p className='border w-1/2 font-nunito text-[18px] font-semibold px-2  py-2 bg-white text-black'>{e.billigId}</p>
                        </div>
                        <div className='flex mb-2'>
                            
                            <p className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>room </p>
                            <p className='border w-1/2 font-nunito text-[18px] font-semibold px-2  py-2 bg-white text-black'>{e.roomNo} </p>
                        </div>
                        <div className='flex mb-2'>

                            
                            <p  className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>name </p>
                            <p  className='border w-1/2 font-nunito text-[18px] font-semibold px-2  py-2 bg-white text-black'>{e.name} </p>
                        </div>
                        <div className='flex mb-2'>

                            <p  className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>phn  </p>
                            <p  className='border w-1/2 font-nunito text-[18px] font-semibold px-2  py-2 bg-white text-black'>{e.phoneNumber} </p>
                        </div>
                        <div className='flex mb-2'>

                            <p  className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>room rent  </p>
                            <p  className='border w-1/2 font-nunito text-[18px] font-semibold px-2  py-2 bg-white text-black'>{e.roomRent} </p>
                        </div>
                        <div className='flex'>

                            <p  className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>water bill  </p>
                            <p  className='border w-1/2 font-nunito text-[18px] font-semibold px-2  py-2 bg-white text-black'>{e.waterBill} </p>
                        </div>
                    </div>
                    </div>
                    
                    


                ))
            }

            </div>

        
            


        </div>
    </div>
  )
}

export default show