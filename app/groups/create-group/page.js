"use client"
import React, { Suspense} from "react";
import Form from "./(components-group)/Form";

export default function Page(){

    return(
        <Suspense>
           <Form></Form>
        </Suspense>
    )
}