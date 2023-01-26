import React from 'react'
import { SidebarData } from './SidebarData'
import './sidebar.css'

const Sidebar = () => {
  return (
    <div className='Sidebar'>
      <ul className='SidebarList'>
        {SidebarData.map((val, key) => {
          return (
            <li className='row' key={key} onClick={() => {window.location.pathname = val.link}}>
            <div id='title'>{val.title}</div>
            <div id='icon'>{val.icon}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Sidebar