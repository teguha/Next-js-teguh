"use client";
import { Users } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

export default function FilterComponent({date, promo , onUpdateFilter}){
    const today = new Date().toISOString().split("T")[0];
    const [d, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [p, setPromo] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(d);
        onUpdateFilter(d, p);
    }


    return (
        <div className="relative w-full container mx-auto border border-gray-300 shadow-lg rounded-lg h-[8vh] bg-white mt-2 mb-2">

            <form onSubmit={handleSubmit} className="relative w-full flex flex-row justify-center items-center px-2 py-4 h-full container mx-auto">
                <Flatpickr
                    value={d}
                    
                    options={{
                        minDate : today,
                        dateFormat: "Y-m-d",        // format yang disimpan → “2025-10-26”
                        altInput: true,             // membuat input alternatif untuk tampilan
                        altFormat: "D, M j Y",       // format tampilan → “Sun, Oct 26 2025”
                        // altFormat bisa juga: "l, F j, Y" untuk “Sunday, October 26, 2025”
                        allowInput: false
                    }}
                    onChange={(selectedDates, dateStr, instance) => {
                        // dateStr akan dalam format Y-m-d karena dateFormat di atas
                        setDate(dateStr);
                    }}
                    className="w-full text-center border-r border-gray-300 rounded-md py-2 text-[16px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                
                <input type="text" value={p} className="w-full relative text-gray-700 text-[16px] text-center h-auto focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg py-2 px-2" placeholder="promo code" onChange={(e) => setPromo(e.target.value, "promo")} />
                <button className="w-[30vh] h-[4vh] text-white bg-blue-500 rounded-lg px-2 mx-2" type="submit">Find</button>
            </form>
            
        </div>
    )
}