"use client"
import React, { Suspense } from "react";
import RenderCards from "./(components-home)/RenderCards";
import { useState, useEffect } from 'react';
import Loading from "./(components-home)/Loading";

export default function Page(){

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
      }, [])
    return(
        <Suspense>
            {isClient?<div className="">
                <RenderCards></RenderCards>
            </div>:<Loading></Loading>}
            
        </Suspense>
    )
}