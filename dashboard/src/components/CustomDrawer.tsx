import { Drawer } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import {DashboardFilled,SettingFilled, NotificationFilled, AlertOutlined} from '@ant-design/icons'
import './CustomDrawer.css'

interface CustomDrawerProps{
    showMenu: boolean;
    setShowMenu: (value: boolean) => void;
}

export const CustomDrawer:React.FC<CustomDrawerProps> = ({ showMenu,setShowMenu }) => {
  return (
    <Drawer style={{direction:"rtl"}} open={showMenu} title={"System Menu"} onClose={()=>{setShowMenu(false);}} placement='left'>
        <Link to="/dashboard" className='listStyle'>
        <DashboardFilled className='notIcon' />
          <p>Dashboard</p>
        </Link>


        <Link to="/violations">
        <div className="listStyle">
          <AlertOutlined className='notIcon' />
          <p>Violations</p>
        </div>
        </Link>

        
        <Link to="/settings">
        <div className="listStyle">
          <SettingFilled className='notIcon' />
          <p>Settings</p>
        </div>
        </Link>

        <Link to="/notifications">
        <div className="listStyle">
          <NotificationFilled className='notIcon' />
          <p>Notifications</p>
        </div>
        </Link>
    </Drawer>
  )
}
