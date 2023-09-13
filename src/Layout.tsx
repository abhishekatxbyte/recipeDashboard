import React from 'react'
import Sidebar from './components/sidebar/Sidebar'

const Layout = ({ component }: any) => {
    return (
        <div style={{ display: 'flex' }}> <Sidebar />{component}</div>
    )
}

export default Layout