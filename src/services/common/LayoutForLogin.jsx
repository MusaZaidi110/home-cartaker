import React from 'react'
import SidebarMenu from '../Components/Sidebar/Sidebar'
import Navbar from '../Components/Navbar/Navbar'
import "../index.css"

const LayoutForLogin = ({children, pageTitle}) => {
  return (
    <>
      <SidebarMenu />
      <Navbar pageTitle={pageTitle} />
      <main>{children}</main>  
    </>
  )
}

export default LayoutForLogin
