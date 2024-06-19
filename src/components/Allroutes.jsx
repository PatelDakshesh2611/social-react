import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './Register'
import Createpost from './Createposts'
import Homepage from './Homepage'
import Myprofile from './Myprofile'
import Showpeople from './Showpeople'
import Notification from './Notification'
import Protectedroutes from './Protectedroutes'

const Allroutes = (props) => {
  return (
    <div>
      <Routes>
        {
          props.usersdata._id && props.id ? <Route path='/' element={<Homepage usersdata={props.usersdata} id={props.id} />}></Route> : <Route path='/' element={<Register setid={props.setid} setudata={props.setudata} />}></Route>
        }
        <Route path='/login' element={<Register setid={props.setid} setudata={props.setudata} />}></Route>
        <Route element={<Protectedroutes id={props.id} data={props.usersdata} />}>
          <Route path='/showpost' element={<Homepage usersdata={props.usersdata} id={props.id} />}></Route>
          <Route path='/createpost' element={<Createpost id={props.id} />}></Route>
          <Route path='/myprofile' element={<Myprofile id={props.id} setudata={props.setudata} setid={props.setid} imageloader={props.imageloader} usersdata={props.usersdata} setimageloader={props.setimageloader} />}></Route>
          <Route path='/showpeople' element={<Showpeople id={props.id} />}></Route>
          <Route path='/getnotifications' element={<Notification userdata={props.usersdata} />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default Allroutes
