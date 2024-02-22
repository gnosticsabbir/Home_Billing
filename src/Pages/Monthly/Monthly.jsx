import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { FaHome } from "react-icons/fa";
import { useNavigate,Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';







const Monthly = () => {
  const navigate = useNavigate();
  const db = getFirestore();


  const getMonth= collection(db, "month")
    
    const [month, setMonth] = useState([]);
    useEffect(()=>{
      const getData = async()=>{
        const dbVal = await  getDocs(getMonth)
        setMonth(dbVal.docs.map(doc =>({...doc.data()})))
        
      }
      getData(); 
    })


  const [countt,setCountt] = useState([])
  const count = collection(db, "count")

  useEffect(()=>{
    const getData = async()=>{
        const dbVall = await getDocs(count)
        setCountt(dbVall.docs.map(doc =>({...doc.data()})))
      }
      getData(); 

      

    })

    const setmonth = month.map(item =>item.monthName);
    const setYearr = month.map(item =>item.year);

    const everyMonth = setmonth[0];
    const everyYear = setYearr[0];




    const value= collection(db, "dataSet")
    
    const [val, setVal] = useState([]);
    useEffect(()=>{
      const getData = async()=>{
        const dbVal = await  getDocs(value)
        setVal(dbVal.docs.map(doc =>({...doc.data(),id:doc.id})))
        
      }
      getData(); 
      
      
    })

    const c = countt.map(item => item.count1)
    const c1 = c[0]

    const roomNo = val.map(item =>item.roomNo);
    const billigId = val.map(item =>item.billigId);
    const name = val.map(item =>item.name);
    const phoneNumber = val.map(item =>item.phoneNumber);
    const roomRent = val.map(item =>item.roomRent);
    const waterBill = val.map(item =>item.waterBill);
    const due = val.map(item =>item.due);

    const roomNoo = roomNo[c1];
    const billigIdd = billigId[c1];
    const namee = name[c1];
    const phoneNumberr = phoneNumber[c1];
    const roomRentt = roomRent[c1];
    const waterBilll = waterBill[c1];
    const duee = due[c1];

    
    const [electricBill,setElectricBill] =useState();
    const [pay,setPay] = useState();

    const handleElectricBill = (e)=>{
      setElectricBill(e.target.value);
  }
  const handlePay = (e)=>{
    setPay(e.target.value);
  }

  const monthwise = everyMonth + everyYear;


  const next = (()=>{

    



    if( c1 < val.length){

      setDoc(doc(db,"dataSet", roomNoo ), {
        billigId : billigIdd,
        roomNo : roomNoo,
        name: namee,
        phoneNumber : phoneNumberr,
        roomRent: roomRentt,
        waterBill: waterBilll,
        due :  roomRentt + waterBilll + electricBill + duee - pay,
      });

      setDoc(doc(db  ,monthwise , roomNoo), {

        billigId : billigIdd,
        roomNo : roomNoo,
        name: namee,
        phoneNumber : phoneNumberr,
        roomRent: roomRentt,
        waterBill: waterBilll,
        electricBill : electricBill,
        due : duee ,
        total :  roomRentt + waterBilll + electricBill + duee,
        
      });

      setDoc(doc(db   , roomNoo ,monthwise), {

        billigId : billigIdd,
        roomNo : roomNoo,
        name: namee,
        phoneNumber : phoneNumberr,
        roomRent: roomRentt,
        waterBill: waterBilll,
        electricBill : electricBill,
        due : duee ,
        total :  roomRentt + waterBilll + electricBill + duee,
        pay : pay,
        newDue :  roomRentt + waterBilll + electricBill + duee - pay,
      });

      setElectricBill('');
      setPay('');
      toast.success(`Room No ...${ roomNoo }...  SAVED`);







      
    }

    if(c1 < val.length - 1){

      setDoc(doc(db, "count" , 'count1'), {
        count1 : c1 + 1,
      });
      
      
      
      
      
    }
    
    else{
      setDoc(doc(db, "count" , 'count1'), {
        count1 : 0,
      });
      setDoc(doc(db, "month" , 'monthly'), {
        monthName : '',
        year : '',
      });

      setTimeout (() => {
        navigate('/')
                
    },2000);


    }

      
  })


  
  return (

    <div className='bg-homeImg w-[100vw] h-screen  bg-no-repeat bg-cover object-cover'>
      <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
            />
            <div className='w-full h-screen bg-[rgba(0,0,0,0.7)]'>
            <div className='absolute'>
                <div className='flex gap-2 items-center relative  left-[12px] top-[15px]'>
                    <FaHome className='text-[28px] text-white'/>
                    <p className='text-white font-poppins text-[14px] '>RENTER BILLING APP</p>
                </div>
            </div>

            <div className='px-3  mb-[15px] pt-[65px]'>
            <h1 className='w-full  rounded-full py-1 text-center bg-green-500 font-opensans font-bold text-[20px] text-white tracking-[1px] '>MONTH WISE</h1> 
            </div>
                <p className='w-3/5 mx-auto  rounded-full py-2 text-center bg-yellow-500 font-opensans font-bold text-[24px] text-black tracking-[1px] mb-[30px]'>{everyMonth} {everyYear} </p>

                <div className='bg-black'>
                 <div className='w-full px-3 mb-7'>

                  <div className='flex mb-2'>
                    <p  className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>NAME</p>
                    <p  className=' w-1/2 font-nunito text-[18px] px-2 py-1 bg-white'>{namee} </p>
                  </div>

                    <div className="flex mb-2">
                    <p className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>ROOM NO</p>
                     <p className='w-1/2 font-nunito text-[18px] px-2 py-1 bg-white'>{roomNoo} </p>
                    </div>
                    
                    <div className="flex mb-2">
                    <p className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>BILLING ID</p>
                     <p className='w-1/2 font-nunito text-[18px] px-2 py-1 bg-white'>{billigIdd}</p>
                    </div>
                    
                    <div className="flex mb-2">
                    <p className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>ELECTRIC BILL</p>
                     <input onChange={handleElectricBill} className='border w-1/2 font-nunito text-[18px] px-2 py-1 focus:border-[5px] focus:outline-none focus:border-green-500 ' value={electricBill} type='number'></input>
                    </div>

                    <div className="flex">
                      <p  className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>PAY</p>
                      <input onChange={handlePay}  className='border w-1/2 font-nunito text-[18px] px-2 py-1 focus:border-[5px] focus:outline-none focus:border-green-500 ' value={pay} type='number'></input>
                  </div>
                    </div>

                    {
                      electricBill && pay ?
                    <div className='flex justify-start mx-3 mt-[30px] '>
                      <button  className='w-1/3 text-center rounded-[14px] text-[24px] font-opensans font-bold active:bg-green-900 text-white bg-green-500 py-1 tracking-[1px] ' onClick={next}>NEXT</button>
                    </div>
                    :
                    <div className='flex justify-center'>
                      <button className='w-1/2   text-[18px] font-opensans font-semibold active:bg-red-500 text-red-700 bg-white py-2 border-red-500 border-[5px]'>*Fill Up All Data</button>
                    </div>
                    }

    </div>

         
     </div>


            <div className='fixed bottom-0 w-full '>
                <p className=' w-full py-3 text-center bg-white text-black text-2xl font-semibold font-opensans tracking-[1px] active:bg-blue-400'><Link to='/' > HOME </Link> </p>
            </div>
        


        </div>
    
  );
};

export default Monthly;







// import React, { useEffect, useState } from 'react'
// import { FaHome } from "react-icons/fa";
// import {  collection, count, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

// const Monthly = () => {
//   const db = getFirestore();

//   const getMonth= collection(db, "month")
    
//     const [month, setMonth] = useState([]);
//     const [monthName,setMonthName] = useState();
//     const [year,setYear] = useState();
//     useEffect(()=>{
//       const getData = async()=>{
//         const dbVal = await  getDocs(getMonth)
//         setMonth(dbVal.docs.map(doc =>({...doc.data()})))
        
//       }
//       getData(); 
//     })
    

    




  
//   const navigate =  useNavigate();

//   const [countt,setCountt] = useState('')
//   const count = collection(db, "count")

//   useEffect(()=>{
//     const getData = async()=>{
//         const dbVall = await getDocs(count)
//         setCountt(dbVall.docs.map(doc =>({...doc.data()})))
//       }
//       getData(); 

      

//     })
    

    
      
      
//       const [onetime,setonetime] = useState([]);
//       const [electricBill,setElectricBill] =useState('');
      
//       const [pay,setPay] = useState();
      
      
      
//       const handleSave = (() => {
//         countt.map((e)=>{
//           console.log(e.count1,'qwewqr')
//         })
//       onetime.map((e)=>{
//         setDoc(doc(db,everymonth , e.roomNo ), {

//           billigId : e.billigId,
//           roomNo : e.roomNo,
//           name: e.name,
//           phoneNumber : e.phoneNumber,
//           roomRent: e.roomRent,
//           waterBill: e.waterBill,
//           due: e.due,
//           electricBill : electricBill,
//           total :  e.roomRent + e.waterBill + electricBill + e.due,
//         });
//         setDoc(doc(db , e.roomNo ,everymonth ), {

//           billigId : e.billigId,
//           roomNo : e.roomNo,
//           name: e.name,
//           phoneNumber : e.phoneNumber,
//           roomRent: e.roomRent,
//           waterBill: e.waterBill,
//           due: e.due,
//           electricBill : electricBill,
//           total :  e.roomRent + e.waterBill + electricBill + e.due,
//         });
//       })

//       onetime.map((e)=>{
//         setDoc(doc(db,"dataSet", e.roomNo ), {
//           billigId : e.billigId,
//           roomNo : e.roomNo,
//           name: e.name,
//           phoneNumber : e.phoneNumber,
//           roomRent: e.roomRent,
//           waterBill: e.waterBill,
//           due :  e.roomRent + e.waterBill + electricBill + e.due - pay,
//         });
//       })

      

//       countt.map((e)=>{

//         if (e.count2 < val.length) {
//           setDoc(doc(db, "count" , 'count1'), {
//             count1 : e.count1 + 1,
//             count2 : e.count2 + 1,
//           });



//         }else{
          
//           setDoc(doc(db, "count" , 'count1'), {
//             count1 : 0,
//             count2 : 1,
//           });
//             // navigate('/')
//         }
//         setonetime(val.slice(e.count1,e.count2))
//         // setonetime(val.slice(1,2))  
//        })
      

//       month.map((e)=>{
//         setMonthName(e.monthName);
//         setYear(e.year)
//       })
      
//     })
//     const everymonth = monthName + year;
    
//     const value= collection(db, "dataSet")
    
//     const [val, setVal] = useState([]);
//     useEffect(()=>{
//       const getData = async()=>{
//         const dbVal = await  getDocs(value)
//         setVal(dbVal.docs.map(doc =>({...doc.data(),id:doc.id})))
        
//       }
//       getData(); 
      
      
//     })
  
  
    
 
    

    

//     const handleElectricBill = (e)=>{
//         setElectricBill(parseInt(e.target.value, 10));
//     }
//     // const HandleMonthName = (e)=>{
//     //   setMonthName(e.target.value);
//     // }
//     const handlePay = (e)=>{
//       setPay(parseInt(e.target.value, 10));
//     }





//   return (

//     <div className='bg-homeImg w-[100vw] h-screen  bg-no-repeat bg-cover object-cover'>
//             <div className='w-full h-screen bg-[rgba(0,0,0,0.7)]'>
//             <div className='absolute'>
//                 <div className='flex gap-2 items-center relative  left-[12px] top-[15px]'>
//                     <FaHome className='text-[28px] text-white'/>
//                     <p className='text-white font-poppins text-[14px] '>RENTER BILLING APP</p>
//                 </div>
//             </div>

//             <div className='px-3  mb-[15px] pt-[65px]'>
//             <h1 className='w-full  rounded-full py-1 text-center bg-green-500 font-opensans font-bold text-[20px] text-white tracking-[1px] '>MONTH WISE</h1> 
//             </div>
//                 <p className='w-3/5 mx-auto  rounded-full py-2 text-center bg-yellow-500 font-opensans font-bold text-[24px] text-black tracking-[1px] mb-[30px]'>{monthName} {year} </p>
//          {
            
//             onetime.map((e)=>(
//                  <div className='w-full px-3'>

//                   <div className='flex mb-2'>
//                     <p  className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>NAME</p>
//                     <p  className=' w-1/2 font-nunito text-[18px] px-2 py-1 bg-white'>{e.name} </p>
//                   </div>

//                     <div className="flex mb-2">
//                     <p className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>ROOM NO</p>
//                      <p className='w-1/2 font-nunito text-[18px] px-2 py-1 bg-white'>{e.roomNo} </p>
//                     </div>
                    
//                     <div className="flex mb-2">
//                     <p className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>BILLING ID</p>
//                      <p className='w-1/2 font-nunito text-[18px] px-2 py-1 bg-white'>{e.billigId}</p>
//                     </div>
                    
//                     <div className="flex mb-2">
//                     <p className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>ELECTRIC BILL</p>
//                      <input onChange={handleElectricBill} className='border w-1/2 font-nunito text-[18px] px-2 py-1 focus:border-[5px] focus:outline-none focus:border-green-500 '></input>
//                     </div>

//                     <div className="flex">
//                     <p  className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>PAY</p>
//                      <input onChange={handlePay}  className='border w-1/2 font-nunito text-[18px] px-2 py-1 focus:border-[5px] focus:outline-none focus:border-green-500 '></input>
//                  </div>
//                     </div>


//              ))
//          }
//          <div className='flex justify-center mx-3 mt-[30px] '>
//          <p onClick={handleSave} className='w-1/2 text-center rounded-[14px] text-[24px] font-opensans font-bold active:bg-green-900 text-white bg-green-500 py-2 tracking-[1px]'>NEXT</p>
//          </div>
//      </div>

//             //..........


//             <div className='fixed bottom-0 w-full '>
//                 <button className=' w-full py-3 text-center bg-white text-black text-2xl mb-2 font-semibold font-opensans tracking-[1px] active:bg-blue-400'>HOME</button>
//                     <div >
//                         <button className='w-1/5 py-1 text-center bg-red-500 font-opensans font-bold text-[24px] text-white tracking-[1px] active:bg-red-900'>PDF</button>
//                         <button className='w-3/5 py-1 text-center bg-green-500 font-opensans font-bold text-[24px] text-white active:bg-green-900' >MONTH</button>
//                         <button className='w-1/5 py-1 text-center bg-blue-500 font-opensans font-bold text-[24px] text-white tracking-[1px] active:bg-blue-900'>SET</button>
//                     </div>
//                 </div>
        


//         </div>


//     // <div>
//     //     <br />
//     //     <br />

//     //     <input onChange={HandleMonthName}  className='border border-black ' type='text'></input>
//     //     <br />
//     //     <br />
//     //     <button>monthly list</button>
//     //     <br />
//     //     <br />
//     //     <div className='flex'>
//     //         <input value={'NAME'} className='border border-black w-[200px]' type='text'></input>
//     //         <input value={'ROOM NO'} className='border border-black w-[200px]' type='text'></input>
//     //         <input value={'BILLING ID'} className='border border-black w-[200px]' type='text'></input>
//     //         <input value={'ELECTRIC BILL'} className='border border-black w-[200px]' type='text'></input>
//     //         <input value={'PAY'} className='border border-black w-[200px]' type='text'></input>
//     //     </div>
//     //     {
            
//     //         onetime.map((e)=>(
//     //             <div className='flex'>
//     //                 <p  className='border border-black p-2 w-[200px]'>{e.name} </p>
//     //                 <p className='border border-black p-2 w-[200px]'>{e.roomNo} </p>
//     //                 <p className='border border-black p-2 w-[200px]'>{e.billigId}</p>
                    
//     //                 <input onChange={handleElectricBill} className='border border-black p-2 w-[200px]'></input>
//     //                 <input onChange={handlePay}  className='border border-black p-2 w-[200px]'></input>
//     //             </div>


//     //         ))
//     //     }
//     //     <br />
//     //     <button onClick={handleSave} className='text-3xl'>save</button>
//     // </div>
//   )
// }

// export default Monthly