"use client"

import { useState } from "react"
import Image from "next/image"
import CardComponent from "./CardComponent"
import CartComponent from "./CartComponent"
import FilterComponent from "./FilterComponent"
import { Car } from "lucide-react"
import filterPage from "../filter/filter"

const dataPackage =
    [
        {
            'id' :1,
            'name' : 'Spa B Package',
            'date' : '2025-10-27',
            'promo': 'spaBBP',
            'rate' : [
                {
                    'id' : 1,
                    'name' : 'Base Rate',
                    'price' : 100000,
                    'qty'  : 5
                },
                {
                    'id' : 2,
                    'name' : 'Premium Rate',
                    'price' : 200000,
                    'qty'  : 5
                },
            ]
        },

        {
            'id' :2,
            'name' : 'Spa X Package',
            'date' : '2025-10-26',
            'promo': 'spaXXP',
            'rate' : [
                {
                    'id' : 1,
                    'name' : 'Base Rate',
                    'price' : 100000,
                    'qty'  : 5
                },
                {
                    'id' : 2,
                    'name' : 'Premium Rate',
                    'price' : 200000,
                    'qty'  : 5
                },
            ]
        },

        {
            'id' :3,
            'name' : 'Spa A Package',
            'date' : '2025-10-26',
            'promo': 'spaAAP',
            'rate' : [
                {
                    'id' : 1,
                    'name' : 'Base Rate',
                    'price' : 100000,
                    'qty'  : 5
                },
                {
                    'id' : 2,
                    'name' : 'Premium Rate',
                    'price' : 200000,
                    'qty'  : 5
                },
            ]
        },

        {
            'id' :4,
            'name' : 'Spa C Package',
            'date' : '2025-10-27',
            'promo': 'spaAAP',
            'rate' : [
                {
                    'id' : 1,
                    'name' : 'Base Rate',
                    'price' : 100000,
                    'qty'  : 5
                },
                {
                    'id' : 2,
                    'name' : 'Premium Rate',
                    'price' : 200000,
                    'qty'  : 5
                },
            ]
        }
    ];

const dataImage = [
        {
            // 'id' : 1,
            'image_file' : '/img/spa.jpg'
        },
        {
            // 'id' : 3,
            'image_file' : '/img/alam1.jpg'
        },
        {
            // 'id' : 1,
            'image_file' : '/img/alam2.jpg'
        },
        {
            // 'id' : 1,
            'image_file' : '/img/alam1.jpg'
        },
    
    ];

export default function HomePage(){
    const [cart, setCart] = useState([]);
    const [delQty, setDeleteQty] = useState({});

    // const [filter, setFilter] = useState([]);
    const [date,  setDate] = useState("");
    const [promo, setPromo] = useState("");
    const [visibleCard, setVisibleCard] = useState(3);

    const handleFilter = (valueDate, valuePromo) => {
        setDate(valueDate);
        setPromo(valuePromo);
    };

    const handleUpdateCart = (item) => {
        setCart((prev) => {

            if(item.qty == 0){
                return prev.filter((p) => !(p.id === item.id && p.rateId === item.rateId));
            }

            const existing = prev.find((p) => p.id === item.id && p.rateId === item.rateId);
            
            if (existing) {

                // if(item.qty <= 0){
                //     return prev.filter((p) => !(p.id === item.id && p.rateId === item.rateId));
                    
                // }else{
                return prev.map((p) =>
                    p.id === item.id && p.rateId === item.rateId ? { ...p, qty: item.qty } : p
                );
                // }

            } else {
                return [...prev, { ...item }];
            }
        });
    };

    const handleDeleteCart = (itemId , itemRateId) => {
        setCart((prev) => prev.filter((p) => !(p.id === itemId && p.rateId === itemRateId)));
        setDeleteQty (
            {
                id : itemId,
                rateId : itemRateId,
                ts : Date.now(),
            }
        );
    };

    const filterPackage = dataPackage.filter((item) => {
        if(date  && promo){
            return item.date === date && item.promo === promo;
        }else if(date){
            return item.date === date;
        }else if(promo){
            return item.promo === promo;
        }else{
            return item;
        }
    });

    const handleShowMoreCard = () => {
        console.log(visibleCard);
        setVisibleCard((prev) =>
            Math.min(prev +3, filterPackage.length)
        );

    };

    const visiblePackages = filterPackage.slice(0, visibleCard);

    return(
        <div>
            <FilterComponent date={date} promo={promo} onUpdateFilter={handleFilter}  />
            <div className="relative grid grid-cols-[70%_30%] gap-2 container mx-auto px-10 mt-5">

                <div className="relative w-full max-w-7xl h-[30vh] grid grid-cols-3 gap-4">
                    
                    {/* card component */}
                    {
                        visiblePackages.map((item) => (
                            <CardComponent key={item.id}
                                data={item}
                                onUpdateCart = {handleUpdateCart}
                                delQty = {delQty}
                                dataImage = {dataImage}
                            />
                        ))
                    }
                    
                    {
                        filterPackage.length > visibleCard && (
                            <button className="border border-gray-300 rounded-lg px-2 py-2 mx-2 shadow-lg" onClick={handleShowMoreCard}>Show More</button>
                        )
                    }
                </div>



                {/* cart component */}
                <CartComponent cart={cart} setCart={setCart} handleDeleteCart={handleDeleteCart} />

            </div>
        </div>
    )
}