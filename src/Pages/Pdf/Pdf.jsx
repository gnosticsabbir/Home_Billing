import React, { useEffect, useRef, useState } from 'react'
// import { Document, Page, Text } from '@react-pdf/renderer';
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
// import { useReactToPrint } from 'react-to-print';

import {Document,Page,Text,StyleSheet, PDFDownloadLink} from "@react-pdf/renderer"
const styles = StyleSheet.create({
    body :{
        paddingTop :35,
        paddingBottom: 65,
        paddingHorizontal: 34
    },
    title : {
        fontSize : 24,
        textAlign : 'center',

    },
    header :{
        marginBottom : 20,
        fontSize: 12,
        textAlign : 'center',
        color : "grey"
    },
    text:{
        margin : 12,
        fontSize: 14,
        textAlign : 'justify',
        fontFamily : 'Times-Roman',
    },
    pageNumber:{
        position : 'absolute',
        fontSize : 12,
        bottom : 30,
        left: 0,
        right: 0,
        textAlign : 'center',
        color: "grey"
    }
});




const Pdf = () => {

  // const componenetPdf = useRef();
  // const download = useReactToPrint({
  //   content: ()=>componenetPdf.current,
  //   documentTitle: "userData"
  // })

  // const pdf = localStorage.getItem('pdf');
    const db = getFirestore();

    const month = collection(db, 'January2024')

    const [monthh,setMonthh] = useState([]);

  useEffect(()=>{
    const getData = async()=>{
        const dbVall = await getDocs(month)
        setMonthh(dbVall.docs.map(doc =>({...doc.data(),id:doc.id})))
      }
      getData(); 
    })

  return (
    <Document>
      <div className='bg-homeImg w-[100vw] h-screen  bg-no-repeat bg-cover object-cover overflow-hidden hover:overflow-y-scroll'>
            <div className='w-full h-100% bg-[rgba(0,0,0,0.7)]'>
            <div className='absolute w-full px-3 '>
                <div className=' flex justify-between items-center relative  left-[0px] top-[15px] '>
                    <div className='flex items-center gap-2 '>
                      <FaHome className='text-[28px] text-white'/>
                      <p className='text-white font-poppins text-[14px] '>RENTER BILLING APP</p>
                    </div>

                  
                    <h1 className='rounded-full py-2 px-3  text-center bg-red-500 font-opensans font-semibold text-[18px] text-white tracking-[2px] '>utfu</h1> 
                    
                </div>
                {/* <p className='text-3xl text-white' onClick={download}>dnld</p> */}
            </div>
            


          <div className='mb-[60px]  pt-[60px]'>
            {
                monthh.map((e)=>(
                    <Page className='w-full px-3 pt-[30px]  ' style={styles.body}>
                      <Text style={styles.header} fixed ></Text>

      <Text className='mb-[20px] '>
        <Text className='w-full  rounded-full py-1 text-center bg-green-500 font-opensans font-bold text-[20px] text-Black tracking-[2px] '>{e.roomNo}</Text> 
      </Text>

      
      <Text className='flex mb-2'>
        
      <Text className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>Room No </Text>
      <Text className=' w-1/2 font-nunito text-[18px] px-2 py-1 bg-white'>{e.roomNo}</Text>
      </Text>

      <Text className='flex mb-2'>

      <Text className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '> Billing ID</Text>
      <Text className=' w-1/2 font-nunito text-[18px] px-2 py-1 bg-white'>{e.billigId}</Text>
      </Text>
      
      
      <Text className='flex mb-2'>

      <Text className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>Name</Text>
      <Text className=' w-1/2 font-nunito text-[18px] px-2 py-1 bg-white'>{e.name}</Text>
      </Text>

      <Text className='flex mb-2'>

      <Text className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>Phone Number</Text>
      <Text className=' w-1/2 font-nunito text-[18px] px-2 py-1 bg-white'>{e.phoneNumber}</Text>
      </Text>

      <Text className='flex mb-2'>

      <Text className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>Room Rent</Text>
      <Text className=' w-1/2 font-nunito text-[18px] px-2 py-1 bg-white'>{e.roomRent}</Text>
      </Text>

      <Text className='flex mb-2'>

      <Text className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>Water Bill</Text>
      <Text className=' w-1/2 font-nunito text-[18px] px-2 py-1 bg-white'>{e.waterBill}</Text>
      </Text>

      <Text className='flex mb-2'>

      <Text className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>Electric Bill</Text>
      <Text className=' w-1/2 font-nunito text-[18px] px-2 py-1 bg-white'>{e.electricBill}</Text>
      
      </Text>

      <Text className='flex mb-2'>

      <Text className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>Previous Due</Text>
      <Text className=' w-1/2 font-nunito text-[18px] px-2 py-1 bg-white'>{e.due}</Text>
      </Text>

      <Text className='flex mb-2'>
        
      <Text className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>Total</Text>
      <Text className=' w-1/2 font-nunito text-[18px] px-2 py-1 bg-white'>{e.total}</Text>
      </Text>

      
                    </Page>
                    
                ))
            }
          </div>





            {/* <div className='fixed bottom-0 w-full '>
                <button className=' w-full py-3 text-center bg-red-500 text-black text-2xl font-bold font-opensans tracking-[1px] active:bg-red-900'> <Link to='/'>HOME</Link> </button>
                </div> */}
        


        </div>
        </div>
    </Document>
    
  )
}

export default Pdf