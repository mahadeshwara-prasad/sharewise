"use client"
import React, { Suspense, useEffect, useState } from "react";
import Form from "./(components-group)/Form";




export default function Page(){
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true)
      }, [])
    return(
        <Suspense>
           {isClient?<Form></Form>:""}
        </Suspense>
    )
}