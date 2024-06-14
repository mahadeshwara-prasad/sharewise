import Config from "./(components-root)/Config.js";
import Navbar from "./(components-root)/Navbar.js";
import Footer from "./(components-root)/Footer.js";
import "../public/styles/globals.css"
import Head from "next/head.js";
export const metadata = {
  title: 'ShareWise',
  description: 'Created by MP',
}


export default function RootLayout({ children }) {

 return (
    <html lang="en">
      <Head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.1.1/flowbite.min.css" rel="stylesheet" />
        <script>document.documentElement.classList.add('js')</script>
      </Head>
      <body>
        <Config>

        
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
        </Config>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.1.1/flowbite.min.js"></script>
        <script src="https://unpkg.com/taos@1.0.5/dist/taos.js"></script>
      </body>
    </html>
  )
}
