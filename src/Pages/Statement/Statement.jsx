import { Document, PDFDownloadLink, Page, StyleSheet, Text } from '@react-pdf/renderer';
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React, { useEffect, useRef, useState } from 'react'
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
// import Pdf from '../Pdf/Pdf';
import Home from '../Home/home';
import { useReactToPrint } from 'react-to-print';

// const styles = StyleSheet.create({
//     body :{
//         paddingTop :35,
//         paddingBottom: 65,
//         paddingHorizontal: 34
//     },
//     title : {
//         fontSize : 24,
//         textAlign : 'center',

//     },
//     header :{
//         marginBottom : 20,
//         fontSize: 12,
//         textAlign : 'center',
//         color : "grey"
//     },
//     text:{
//         margin : 12,
//         fontSize: 14,
//         textAlign : 'justify',
//         fontFamily : 'Times-Roman',
//     },
//     pageNumber:{
//         position : 'absolute',
//         fontSize : 12,
//         bottom : 30,
//         left: 0,
//         right: 0,
//         textAlign : 'center',
//         color: "grey"
//     }
// });



const Statement = () => {

  const componenetPdf = useRef();
  const download = useReactToPrint({
    content: ()=> componenetPdf.current,
    documentTitle: "userData"
  })

  const statement = localStorage.getItem('statement');
  // const statement = 101;

    const db = getFirestore();

    const roomwise = collection(db, statement)

    const [monthh,setMonthh] = useState([]);

  useEffect(()=>{
    const getData = async()=>{
        const dbVall = await getDocs(roomwise)
        setMonthh(dbVall.docs.map(doc =>({...doc.data(),id:doc.id})))
      }
      getData(); 
    },[])

  


  const pdfRef = useRef();

  return (
    <div className='overflow-hidden overflow-x-scroll'>
      <div className='bg-homeImg w-[100vw] h-screen  bg-no-repeat bg-cover object-cover overflow-hidden hover:overflow-y-scroll '>
            <div className='w-full h-100% bg-[rgba(241,239,239,0.9)]'>
            <div className='absolute w-full px-3 '>
                <div className=' flex justify-between items-center relative  left-[0px] top-[15px] '>
                    <div className='flex items-center gap-2 '>
                      <FaHome className='text-[28px] text-white'/>
                      <p className='text-white font-poppins text-[14px] '>RENTER BILLING APP</p>
                    </div>

                  
                    <h1 className='rounded-full py-2 px-3  text-center bg-red-500 font-opensans font-semibold text-[18px] text-white tracking-[2px] '>{statement}</h1> 
                    


                    
                    
                </div>
                <button className='text-3xl bg-green-500'  onClick={download}>dwnld</button>
            </div>

          <div className='overflow-hidden overflow-x-scroll'>

            <div className='px-3 '  ref={componenetPdf} >
            <div className='pt-[100px] '>
              <p className='border flex justify-center  py-2 font-bold w-[680px] border-black'>Room ID : {statement}</p>
              <div className='flex '>
                <div className='text-black py-1 text-[16px] w-[90px] text-center border border-black font-poppins font-semibold   items-center flex justify-center ' >
                  <div>
                    
                <p className=''>Month</p>
                <p>----</p>
                <p >Billing ID</p>
                  </div>
                </div>
                <div className='text-black py-1 text-[16px] w-[170px] text-center border border-black font-poppins font-semibold   items-center flex justify-center' >
                  <div>

                <p className=''>Name</p>
                <p>----</p>
                <p >Number</p>
                  </div>
                </div>
                <div className='text-black py-1 text-[16px] w-[60px] text-center border border-black font-poppins font-semibold items-center flex justify-center' >
                  <div>

                <p className=''>Room</p>
                <p className=''>Rent</p>
                  </div>
                </div>
                <div className='text-black py-1 text-[16px] w-[60px] text-center border border-black font-poppins font-semibold items-center flex justify-center' >
                  <div>

                <p className=''>Water</p>
                <p className=''>Bill</p>
                  </div>
                </div>
                <div className='text-black py-1 text-[16px] w-[60px] text-center border border-black font-poppins font-semibold items-center flex justify-center' >
                  <div>

                <p className=''>Elec-</p>
                <p className=''>tricity</p>
                  </div>
                </div>
                <div className='items-center flex justify-center text-black py-1 text-[16px] w-[60px] text-center border border-black font-poppins font-semibold'>

                <div >
                <p className=''>Pre</p>
                <p className=''>Due</p>
                </div>
                </div>
                <div className='text-black text-[16px] w-[60px] border border-black font-poppins font-semibold items-center flex justify-center' >
                <p className=''>Total</p>
                </div>
                <div className='text-black text-[16px] w-[60px]  border border-black font-poppins font-semibold items-center flex justify-center' >
                <p className=''>Pay</p>
                </div>
                <div className='text-black text-[16px] w-[60px] border border-black font-poppins font-semibold  items-center flex justify-center' >
                <p className=''>Due</p>
                </div>
              </div>

            </div>


            <div className='' >
            {
              monthh.map((e)=>(
                <div>

                  <div className='flex' >
                <div className=' font-nunito text-[15px]  py-1  border border-black w-[90px] font-bold text-center'>
                <p>{e.id}</p>
                <p >{e.billigId}</p>
                </div>
                <div className=' font-nunito text-[15px]  py-1  border border-black w-[170px] font-semibold text-center'>
                <p>{e.name}</p>
                <p >{e.phoneNumber}</p>
                </div>
                <div className=' font-nunito text-[15px]  border border-black w-[60px] font-semibold text-center items-center flex justify-center'>
                <p>{e.roomRent}</p>
                </div>
                <div className=' font-nunito text-[15px]  border border-black w-[60px] font-semibold text-center items-center flex justify-center'>
                <p>{e.waterBill}</p>
                </div>
                <div className=' font-nunito text-[15px]  border border-black w-[60px] font-semibold text-center items-center flex justify-center'>
                <p>{e.electricBill}</p>
                </div>
                <div className=' font-nunito text-[15px]  border border-black w-[60px] font-semibold text-center items-center flex justify-center'>
                <p>{e.due}</p>
                </div>
                <div className=' font-nunito text-[15px]  border border-black w-[60px] font-semibold text-center items-center flex justify-center'>
                <p>{e.total}</p>
                </div>
                <div className=' font-nunito text-[15px]  border border-black w-[60px] font-semibold text-center items-center flex justify-center'>
                <p>{e.pay}</p>
                </div>
                <div className=' font-nunito text-[15px]  border border-black w-[60px] font-semibold text-center items-center flex justify-center'>
                <p >{e.newDue}</p>
                
                </div>
                  </div>
                </div>
                  
            

            



              ))
            }
            
            </div>          

            </div>
          </div>
            <br />
            
          {/* <div className='w-full overflow-hidden overflow-x-scroll pt-[100px] px-3'>

        

              <div   > 
              {
                monthh.map((e)=>(

                    <div >
                      <Text fixed ></Text>
                    <Text className=''>
                      <Text className='flex'>
                        
                        <Text className='flex'>
                          
                        <Text className=' font-nunito text-[18px]  py-2 bg-white border border-black w-[120px] font-semibold text-center'>{e.roomNo}</Text>
                        </Text>
                        <Text className='flex'>
                          
                        <Text className=' font-nunito text-[18px]  py-2 bg-white border border-black w-[180px] font-semibold text-center'>{e.billigId}</Text>
                        </Text>
                        <Text className='flex'>
                          
                        <Text className=' font-nunito text-[18px]  py-2 bg-white border border-black w-[300px] font-semibold text-center'>{e.name}</Text>
                        </Text>
                        <Text className='flex'>
                          
                        <Text className=' font-nunito text-[18px]  py-2 bg-white border border-black w-[200px] font-semibold text-center'>{e.phoneNumber}</Text>
                        </Text>
                        <Text className='flex'>
                          
                        <Text className=' font-nunito text-[18px]  py-2 bg-white border border-black w-[150px] font-semibold text-center'>{e.roomRent}</Text>
                        </Text>
                        <Text className='flex'>
                          
                        <Text className=' font-nunito text-[18px]  py-2 bg-white border border-black w-[120px] font-semibold text-center'>{e.waterBill}</Text>
                        </Text>
                        <Text className='flex'>
                          
                        <Text className=' font-nunito text-[18px]  py-2 bg-white border border-black w-[200px] font-semibold text-center'>{e.electricBill}</Text>
                        </Text>
                        <Text className='flex'>
                          
                        <Text className=' font-nunito text-[18px]  py-2 bg-white border border-black w-[250px] font-semibold text-center'>{e.due}</Text>
                        </Text>
                        <Text className='flex'>
                          
                        <Text className=' font-nunito text-[18px]  py-2 bg-white border border-black w-[250px] font-semibold text-center'>{e.total}</Text>
                        </Text>
                      </Text>
                        
                        <Text className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>{e.id}</Text>

                        
                      </Text>
                      
                    </div>
                    
                    ))
                  }
                  </div>

            
            
          </div> */}
          


          {/* <PDFDownloadLink document={Statement} fileName='FORM'>
              {({loading}) => loading ? (<button>loading</button>) : (<button>download</button>)
              }
            </PDFDownloadLink> */}

             
            <div className='fixed bottom-0 w-full '>
                <button className=' w-full py-3 text-center bg-yellow-400 text-black text-2xl font-bold font-opensans tracking-[1px] active:bg-yellow-600'> <Link to='/'>HOME</Link> </button>
            </div>
        


        </div>
        </div>
    </div>
    
  )
}

export default Statement