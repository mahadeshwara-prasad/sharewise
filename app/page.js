import React from "react";
import Hero1 from "./(components-root)/Hero1";
import Body from "./(components-root)/Body";

export default function Page(){

    return(
        <>
            
            <div className="bg-gradient-to-t from-[#eefcff] to-[#ffffff] py-5">
                <Hero1/>
            </div>
            <div className="py-14">
                <Body/>
            </div>
        </>
    )
}