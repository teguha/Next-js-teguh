"use client";

import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useRef } from "react";


export default function CardComponent({ data, onUpdateCart, delQty, dataImage }) {
  const [qty, setQty] = useState({}); 
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollRef = useRef(null);

  const handlePlus = (rate) => {
    setQty((prev) => {
      const newQty = (prev[rate.id] || 0) + 1;
      if(newQty > rate.qty){
        return prev;
      }else{
        const updatedQty = { ...prev, [rate.id]: newQty };
        return updatedQty;
      }
    });

    onUpdateCart(
      {
        id: data.id,
        name: data.name,
        rateId: rate.id,
        rateName: rate.name,
        price: rate.price,
        qty: qty,
      },
      "plus"
    );
  };

  const handleMinus = (rate) => {
    setQty((prev) => {
      const currentQty = prev[rate.id] || 0;
      const newQty = Math.max(currentQty - 1, 0);
      const updatedQty = { ...prev, [rate.id]: newQty };

      // console.log(updatedQty);
      return updatedQty;
    });

    if(qty > 0){
      onUpdateCart(
          {
            id: data.id,
            name: data.name,
            rateId: rate.id,
            rateName: rate.name,
            price: rate.price,
            qty: qty,
          },
          "minus"
        );
    }
  };

  useEffect(() => {
    if(delQty && delQty.id === data.id ){
      setQty((prev) => ({
        ...prev, 
        [delQty.rateId] : 0,
      }))
    }
  }, [delQty?.ts]);

  const scroll = (direction) => {
    if(direction==="left"){
      // jika index sebelumnya === 0 maka digeser kekiri yaitu data terakhir
      setCurrentIndex((prev) => prev === 0 ? dataImage.length - 1 : prev - 1);
      console.log(currentIndex);
    }else{
      // jika index sebelumnya === data terakhir maka digeser kekiri data ke 0
      // console.log(currentIndex ===  dataImage.length -1);
      setCurrentIndex((prev) => prev === dataImage.length -1  ? 0 :  prev + 1);
    }
  }




  return (
    <div className="relative w-full h-full border border-gray-300 rounded-xl shadow-lg">
      <Image
        src="/img/spa.jpg"
        alt={data.name}
        width={800}
        height={800}
        className="w-full h-48 object-cover rounded-t-xl shadow-lg"
      />

      <button className="relative text-white text-[12px] top-[-25] left-5" onClick={() => setOpenImage(!openImage)}>Show All Image</button>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-[18px] text-gray-800 font-normal tracking-normal text-left mx-2">
          {data.name}
        </p>

        <p className="text-[16px] text-gray-800 font-normal tracking-normal text-left mx-2 font-semibold">
          {data.date}
        </p>
      </div>


      <button key={data.id} onClick={() => setOpen(!open)} className="text-[14px] text-blue-500 hover:text-blue-800 font-normal tracking-normal mt-2 text-left mx-2">
        Detail
      </button>

      <div className="w-full flex flex-col justify-center items-center py-2 gap-2">
        {data.rate.map((item) => (
          <div
            key={`${data.id}-${item.id}`}
            className="w-[32vh] border border-gray-300 rounded-xl px-2 py-1 flex flex-row justify-between items-center"
          >

            <p className="w-full text-[14px]">{item.name}</p>
              
          {
            (qty[item.id] || 0) <= 0 ? 
            (
              <button
                className="w-full bg-black text-white mx-2 rounded-xl"
                onClick={() => handlePlus(item)}
              >
                Select
              </button>
            )
            : 
            (
              <div className="flex items-center">
              <button
                className="bg-black text-white mx-2 rounded-xl px-3"
                onClick={() => handleMinus(item)}
              >
                −
              </button>
              <input
                type="number"
                min={0}
                value={qty[item.id] || 0}
                readOnly
                className="w-12 text-center border rounded"
              />
              <button
                className="bg-black text-white mx-2 rounded-xl px-3"
                onClick={() => handlePlus(item)}
              >
                +
              </button>
            </div>
            )
          }
          </div>
        ))}
      </div>

      {
        open && (
          <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[400px] max-w-[50vw] max-h-[50vh] p-4 relative">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-lg font-bold"
              >
                ✕
              </button>
              <p className="text-[15px] text-gray-800 font-semibold">{data.name}</p>
              {
                data.rate.map((item) => (
                  <div className="w-full flex flex-row justify-start items-center gap-2">

                   
                      <p className="text-[12px] text-gray-500">{item.name}</p>
                      <p className="text-[12px] text-gray-500">IDR {item.price}</p>
                      {/* <p className="text-[12px] text-gray-500">{item.qty}</p> */}
                   
                  </div>
                ))
              }
          </div>
        </div>
        )
      }

      {
        openImage && (
          <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-full bg-white rounded-lg shadow-lg w-[400px] max-w-[50vw] max-h-[50vh] p-4 relative">
              <button
                onClick={() => setOpenImage(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-lg font-bold"
              >
                ✕
              </button>

              {
                
                  <div className="w-full flex flex-row justify-between items-center px-2 py-2 gap-2">
                    
                    <ChevronLeft onClick={() => scroll("left")} className="w-6 h-6 text-gray-700" />
                    
                    <Image
                      src={dataImage[currentIndex].image_file}
                      alt={`Image ${currentIndex}`}
                      width={400}
                      height={400}
                      className="w-[30vw] h-[30vh] object-cover rounded-t-xl shadow-lg"
                    />

                    <ChevronRight onClick={() => scroll("right")} className="w-6 h-6 text-gray-700" />
                  
                  </div>
                
              }

              <div className="mt-3 text-sm text-gray-500">
                {currentIndex + 1} / {dataImage.length}
              </div>

            </div>


          </div>
        )
      }
    </div>
  );
}

  // 0 , 1 , 2 , 3
  // data image length = 4
  // index sebelunya = 0
  // geser kanan
  // 0 === 3 =? false maka (prev + 1) : 0