import React from 'react'
import "./topbar.css";
import {LanguageOutlined, NotificationsNoneOutlined, Settings} from '@material-ui/icons';

const Topbar = () => {
  return (
    <div className='topbar'>
        <div className='topbarWrapper'>
          <div className='topleft'>
            <span className='logo'>
                Sharma Admin.
            </span>
           </div>
           <div className='topRight'>
            <div className="topbarIconContainer">
                <NotificationsNoneOutlined/>
                <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
                <LanguageOutlined/>
                <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
                <Settings/>
            </div>
            <img src="https://i.ibb.co/6PvGchp/adminphoto.jpg" alt="" className="topAvatar" />
           </div>
        </div>
        </div>
  )
}

export default Topbar