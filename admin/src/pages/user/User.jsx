import './user.css';
import { Link } from "react-router-dom";
import{ CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from "@material-ui/icons"
const User = () => {
  return (
    <div className='user'>
        <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to="/newUser"> 
            <button className="userAddButton">Create</button>
            </Link>
        </div>
        <div className="userContainer">
            <div className="userShow">
            <div className="userShowTop">
            <img src="https://i.ibb.co/yn2ymkF/user.jpg" alt="" className="userShowImg" />
            <div className="userShowTopTitle">
                <span className="userShowUsername">Jon snow</span>
                <span className="userShowUserTitle">Software Engineer</span>
            </div>
            </div>
            
            <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
            <PermIdentity className='userShowIcon'/>
            <span className="userShowInfoTitle">prathamsharma</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
            <CalendarToday className='userShowIcon'/>
            <span className="userShowInfoTitle">02/07/2002</span>
            </div>
            <div className="userShowInfo">
            <PhoneAndroid className='userShowIcon'/>
            <span className="userShowInfoTitle">9798798787</span>
            </div>
            <div className="userShowInfo">
            <MailOutline className='userShowIcon'/>
            <span className="userShowInfoTitle">pratham@gmail.com</span>
            </div>
            <div className="userShowInfo">
            <LocationSearching className='userShowIcon'/>
            <span className="userShowInfoTitle">Firozpur Punjab</span>
            </div>
            </div>
            </div>
            <div className="userUpdate">
                <span className="userUpdateTitle"></span>
                <form className="userUpdateForm">
                    <div className="userUpdateLeft">
                    <div className="userUpdateItem">
                        <label>Username</label>
                        <input 
                        type="text"
                        placeholder='prathamsharma' 
                        className='userUpdateInput'/>
                    </div>
                    <div className="userUpdateItem">
                        <label>Full Name</label>
                        <input 
                        type="text"
                        placeholder='Pratham' 
                        className='userUpdateInput'/>
                    </div>
                    <div className="userUpdateItem">
                        <label>Email</label>
                        <input 
                        type="text"
                        placeholder='prathamfzr@gmail.com' 
                        className='userUpdateInput'/>
                    </div>
                    <div className="userUpdateItem">
                        <label>Phone </label>
                        <input 
                        type="text"
                        placeholder='9798798787' 
                        className='userUpdateInput'/>
                    </div>
                    <div className="userUpdateItem">
                        <label>Address</label>
                        <input 
                        type="text"
                        placeholder='Firozpur Punjab' 
                        className='userUpdateInput'/>
                    </div>
                    </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img src="https://i.ibb.co/yn2ymkF/user.jpg" alt="" className="userUpdateImg" />
                            <label htmlFor="file"><Publish className='userUpdateIcon'/></label>
                            <input type="file" id="file" style={{display:"none"}}/>
                            </div>
                            <button className="userUpdateButton">Update</button>
                        
                    </div>
                </form>
            </div> 
        </div>
    </div>
  )
}

export default User