"use  client";

import { useState } from "react"
import Image from "next/image"
// import CardComponent from "./CardComponent"
import { ChevronDown } from "lucide-react"


export default function CartComponent({cart, setCart, handleDeleteCart}){

    const [open, setOpen] = useState(false);

return(

<div className="w-full relative border border-gray-300 rounded-lg shadow-lg mx-2 px-2 py-2 min-h-[10vh] h-auto bg-white">
    <p className="mt-2 text-left text-[20px] text-gray-800">Shopping Cart</p>
    <div className="flex flex-col mt-2">
        <div className="border border-gray-300 rounded-lg bg-white shadow px-2 py-2 mx-2">
            <div className="flex flex-row justify-between items-center">
                <p className="w-[4vw] bg-black text-white px-2 rounded-lg text-center text-[16px] font-bold">
                    {cart.length} items
                </p>
                <button
                    className="flex justify-between items-center p-4 text-left font-semibold text-gray-800"
                    onClick={() => setOpen(!open)}
                >
                    <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                        open ? "rotate-180" : ""
                        }`}
                    />
                </button>
                
            </div>
            {
                open && (
                    cart.length === 0 ? (
                        <p className="text-gray-600 text-left p-2">Cart is empty</p>
                    ) : (
                        cart.map((item) => (
                            <div key={`${item.id}-${item.rateId}`} className="flex flex-row justify-between items-center py-2 border-b border-gray-200">
                                <div className="flex flex-col">
                                    <p className="text-[14px] font-bold">{item.name} ({item.rateName})</p>
                                    <p className="text-[14px] text-gray-800">Rp {item.price} x {item.qty}</p>
                                    <p className="text-[14px] text-gray-800">Rp {(item.price * item.qty).toLocaleString()}</p>
                                </div>
                                <button
                                    className="text-red-500 font-bold text-[18px]"
                                    onClick={() => handleDeleteCart(item.id, item.rateId)}
                                    // onClick={() => deleteChart(setDelete(item.id[item.rateId]))}
                                >
                                    X
                                </button>
                            </div>
                        ))
                    )
                )
            }
        </div>      
    </div>

    <div className="text-[18px] font-bold mt-2">
        Total Rp {cart.reduce((acc, item) => acc + item.price * item.qty, 0)}
    </div>

    <button className="text-[16px] text-white bg-blue-500 hover:bg-blue-700 border border-blue-500 rounded-lg shadow-sm px-2 py-2 mt-2 w-full"> Checkout</button>
</div>


 )
}