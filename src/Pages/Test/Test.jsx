import React, { useEffect, useRef, useState } from 'react'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { FaHome } from "react-icons/fa";
// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// import { Link } from 'react-router-dom';
// import { useReactToPrint } from 'react-to-print';

import {Document,Page,Text,StyleSheet, View} from "@react-pdf/renderer"



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
    },
    // className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '
    line:{
      width : '50%',
      color : 'black',
      fontSize:'50px'


    },
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4'
    },
});

const pdf = () => {
  const A4_WIDTH_POINTS = 210 * 72 / 25.4; // Convert mm to points
  const A4_HEIGHT_POINTS = 297 * 72 / 25.4; // Convert mm to points
  const HalfA4_WIDTH_POINTS = A4_WIDTH_POINTS ;
  const HalfA4_HEIGHT_POINTS = A4_HEIGHT_POINTS ;
    // const data= useRef();

    const download = () =>{
        console.log('ok');
    }
 
//   const pdf = localStorage.getItem('pdf');
    const db = getFirestore();

    const month = collection(db, 'December2023')

    const [monthh,setMonthh] = useState([]);

  useEffect(()=>{
    const getData = async()=>{
        const dbVall = await getDocs(month)
        setMonthh(dbVall.docs.map(doc =>({...doc.data(),id:doc.id})))
      }
      getData(); 
    })

  return (
      
    
      <Document className='mb-[60px]  pt-[60px]'>
      
    {
        monthh.map((e)=>(
            <Page className='w-full px-3 pt-[30px]  ' size="A4" orientation="landscape" >
              <Text style={styles.header} fixed ></Text>

<View className='mb-[20px] '>
<Text className='w-full  rounded-full py-1 text-center bg-green-500 font-opensans font-bold text-[20px] text-Black tracking-[2px] '>{e.roomNo}</Text> 
</View>


<Text className='flex mb-2'>

<Text className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white ' style={styles.line}>Room No </Text>
<Text className=' w-1/2 font-nunito text-[18px] px-2 py-1 bg-white'>{e.roomNo}</Text>
</Text>

<Text className='flex mb-2'>

<Text className='w-1/2 text-white font-poppins text-[18px] items-center flex  border-b-2 border-white '>Billing ID</Text>
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
  </Document>
    



    
  )
}

export default pdf
