import { PDFDownloadLink } from '@react-pdf/renderer';
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState,useEffect } from 'react'
import { FaHome } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Statement from '../Statement/Statement';
import { saveAs } from 'file-saver';
import Test from '../Test/Test'
import Pdf from '../Pdf/Pdf';
import { ToastContainer, toast } from 'react-toastify';
const home = () => {
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
    const setmonth = month.map(item =>item.monthName);
    const setYearr = month.map(item =>item.year);

    const everyMonth = setmonth[0];
    const everyYear = setYearr[0];

    const monthwise = everyMonth + everyYear;



    


    const [currentMonth, setCurrentMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    // Update the current month
    const updateMonth = () => {
      const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ];

      const currentDateTime = new Date();
      const monthIndex = currentDateTime.getMonth();
      const Year = currentDateTime.getFullYear();
      setYear(Year)
      const monthName = months[monthIndex];

      setCurrentMonth(monthName);
    };

    // Update initially and every time the component mounts
    updateMonth();


  }, []);



    const [show,setShow] = useState(false);
    const [pdfShow,setPdfShow] = useState(false);
    const [statementShow,setStatementShow] = useState(false);

    const [inputMonth,setInputMonth] = useState();
    const [inputYear,setInputYear] = useState();

    const inputM = (e)=>{
        setInputMonth(e.target.value)
        console.log(e.target.value)
    }
    const inputY = (e)=>{
        setInputYear(e.target.value)
        console.log(e.target.value)
    }
 
    const handleOk = ()=>{

        



        if(currentMonth == inputMonth && year == inputYear ){

            setDoc(doc(db, "month" , 'monthly'), {
                monthName :inputMonth ,
                year :inputYear ,
            });

            setTimeout (() => {
                navigate('/month')    
            },2000);

        }else{
            console.log('vhul');

        }
    }

    const [pdfM,setPdfM] = useState();
    const [pdfY,setPdfY] = useState();

    const inputPdfM = ((e)=>{
        setPdfM(e.target.value)

    })
    const inputPdfY = ((e)=>{
        setPdfY(e.target.value)

    })

    const handlePdf = (()=>{
        localStorage.setItem('pdf', pdfM+pdfY );

        setTimeout (() => {
            navigate('/pdf')    
        },2000);
    })

    const [roomNo,setRoomNo] = useState();

    const inputStatement = ((e)=>{
        setRoomNo(e.target.value)

    })

    const handleStatement = (()=>{
        localStorage.setItem('statement', roomNo );
        setTimeout (() => {
            navigate('/statement')    
        },2000);
    })

    const handleAlreadyMonthSet = () => {

        if(!monthwise==''){
            console.log(' not nulll');

        }else{
            console.log('nulll');
            toast.error( `Month don't find` );
        }

    }
    
  return (
    <div className='bg-homeImg w-[100vw] h-screen  bg-no-repeat bg-cover object-cover'>
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
        <div className='w-full h-screen bg-[rgba(0,0,0,0.7)] '>
            <div className='absolute'>
                <div className='flex gap-2 items-center relative  left-[12px] top-[15px]'>
                    <FaHome className='text-[28px] text-white'/>
                    <p className='text-white font-poppins text-[14px] '>RENTER BILLING APP</p>
                </div>
            </div>
            <div className='flex items-center justify-center w-full h-screen'>
                <div>
                    <p className='text-white font-opensans text-[36px] font-bold text-center'>M/S MITALI HOUSE</p>
                    <p className='text-[rgb(241,237,237)] font-opensans text-[20px] text-center'> Poschim Shibrampur , Gopalganj</p> 
                    <div className=' mt-[80px] '>
                    <div className=' bg-white py-3 border-[2px] border-red-500  rounded-[15px]  drop-shadow-shadow text-center'>
                        <p className='text-red-500 text-[20px]'>*** Input Data Is Very Sensitive</p>
                        <p className='text-red-700 mt-2 text-[18px]'>So, CareFully Fillup Input Data ***</p>
                {/* <PDFDownloadLink document={<Test/>} fileName="FORM">
                    {({loading}) => loading ? <button>loading</button> : <button>download</button>
                    }
                </PDFDownloadLink> */}
            </div>
                    </div>
                    </div>
                    
                </div>

            <div className=''>
                <div className='fixed bottom-0 w-full '>
                    {
                        show ? <div><div className='flex w-full px-3 mb-3 gap-x-3'>
                        <input className='border w-1/2 font-nunito text-[18px] px-2 py-1 focus:border-[5px] focus:outline-none focus:border-green-500 ' onChange={inputM} type="text" placeholder='Type Current MONTH'/>
                        <input input className='border w-1/2 font-nunito text-[18px] px-2 py-1 focus:border-[5px] focus:outline-none focus:border-green-500 ' onChange={inputY} type="number" placeholder='Type Current YEAR'/>
                    </div>
                    <div className='flex justify-center w-full mb-5 gap-x-3'>
                        <button className='w-1/3 py-1 text-center bg-white font-opensans font-semibold text-[18px] text-black  active:bg-blue-900' onClick={handleAlreadyMonthSet} >Already Month Set</button>
                        <button className='w-1/3 py-1 text-center bg-blue-500 font-opensans font-bold text-[24px] text-white tracking-[1px] active:bg-blue-900' onClick={handleOk} >OK</button>
                    </div>

                        </div>

                        :null
                    }

                    

                    {
                        pdfShow ? <div><div className='flex w-full px-3 mb-3 gap-x-3'>
                        <input className='border w-1/2 font-nunito text-[18px] px-2 py-1 focus:border-[5px] focus:outline-none focus:border-green-500 ' onChange={inputPdfM}  type="text" placeholder='MONTH'/>
                        <input input className='border w-1/2 font-nunito text-[18px] px-2 py-1 focus:border-[5px] focus:outline-none focus:border-green-500 ' onChange={inputPdfY} type="text" placeholder='YEAR'/>
                    </div>
                    <div className='flex justify-center w-full mb-5 '>
                        <button className=' py-1 px-3 text-center bg-red-500 font-opensans font-bold text-[24px] text-white tracking-[1px] active:bg-red-900' onClick={handlePdf} >PDF Search</button>
                    </div>

                        </div>

                        :null
                    }

                    {
                        statementShow ? <div><div className='w-full px-3 mb-3'>
                        <input className='border w-full  font-nunito text-[18px] px-2 py-1 focus:border-[5px] focus:outline-none focus:border-green-500 ' onChange={inputStatement}  type="text" placeholder='Enter Room No'/>
                    </div>
                    <div className='flex justify-center w-full mb-5 '>
                        <button className=' py-1 px-3 text-center bg-white font-opensans font-bold text-[24px] text-black tracking-[1px] active:bg-red-900' onClick={handleStatement} >SHOW</button>
                    </div>

                        </div>

                        :null
                    }

                    
                    
                    <div className=''>
                        <button className='w-full py-3 mb-2 text-2xl font-semibold text-center text-black bg-white font-opensans' onClick={()=> setStatementShow(!statementShow)}> {statementShow ?  'CLOSE' : 'STATEMENT' }</button>
                    </div>
                    <div >
                        
                        <button className='w-1/3 py-1 text-center bg-red-500 font-opensans font-bold text-[24px] text-white tracking-[1px] active:bg-red-900' onClick={()=>setPdfShow(!pdfShow) } >{pdfShow ?  'CLOSE' : 'PDF' }</button>
                        
                         
                        <button className='w-1/3 py-1 text-center bg-green-500 font-opensans font-bold text-[24px] text-white active:bg-green-900' onClick={()=>setShow(!show)} >{show ?  'CLOSE' : 'MONTH' }</button>

                        
                        
                        
                        <Link to='/setdata'> 
                            <button  className='w-1/3 py-1 text-center bg-blue-500 font-opensans font-bold text-[24px] text-white tracking-[1px] active:bg-blue-900'>
                                SET
                        </button>
                        </Link>
                    </div>
                </div>
             </div>
        
        </div>

        
    


    </div>


    // <div>

    //     <div className='bg-homeImg'>
    //         <div className='w-full h-screen bg-[rgba(0,0,0,0.7)]'>
    //         <div className='flex items-center gap-2 py-5 ml-3'>
    //             <FaHome className='text-[28px] text-white'/>
    //             <p className='text-white font-poppins text-[14px] '>RENTER BILLING APP</p>
    //         </div>
    //         <div className='flex justify-center '>
    //             <div>
    //                 <p className='text-white font-opensans text-[40px] font-bold'>M/S MITALI HOUSE</p>
    //                 <p className='text-[rgb(241,237,237)] font-opensans'> Poschim Shibrampur , Gopalganj , 
    //             </div>
    //         </div>


    //     <div className='text-white z-2'>rghtryhythythythtyhtyhdfsgdfs</div>
            
    //         </div>
    //     </div>
    //         <div className='static'>
    //         <div className='absolute bottom-0 w-full'>
    //             <div className='mx-5  bg-white p-5 border-[5px] border-red-500  rounded-[20px]  drop-shadow-shadow mb-[100px] text-center'>
    //                 <p className='text-red-500 text-[24px]'>*** Input Data Is Very Sensitive</p>
    //                 <p className='text-red-700 mt-3 text-[22px]'>So, CareFully Fillup Input Data ***</p>
    //             </div>
                
    //             <div className='flex justify-between gap-3'>
    //                 <p className='w-1/2 py-3 text-2xl font-semibold text-center text-white bg-blue-500 '>Room Wise</p>
    //                 <p className='w-1/2 py-3 text-2xl font-semibold text-center text-black bg-white'>Month Wise</p>
    //             </div>
    //             <div >
    //                 <button className='w-1/3 py-4 text-center bg-red-500'>PDF</button>
    //                 <button className='w-1/3 py-4 text-center bg-blue-500' >MONTHLY</button>
    //                 <button className='w-1/3 py-4 text-center bg-green-500'>SET</button>
    //             </div>
    //         </div>
    //         </div>
        
    // </div>
  )
}

export default home