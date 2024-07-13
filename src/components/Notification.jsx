import axios from 'axios'
import Notificationcard from './Notificationcard'
import { Text, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'

const Notification = (props) => {
  const [noti, setnoti] = useState([])
  const [loader, setloader] = useState(0)
  const getnotification = async () => {
    try {
      setloader(1)
      const res = await axios.get(`${props.connection}/getnotifications/${props.userdata._id}`)
      setnoti(res.data.notidata)
      setloader(0)
    } catch (e) {
      swal('Error occured at backend')
    }
  }
  useEffect(() => {
    getnotification()
  }, [])
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',marginTop:'30px' }}>
        {
          noti.length > 0 ? <Text as={'bold'} fontSize={'large'}>Requests from friends</Text> : ''
        }
        {
          loader ? <Spinner size={['sm', 'sm', 'xl', 'xl']}>

          </Spinner> : <>
            {
              noti.length > 0 ? noti.map((u) => {
                return <>
                  <Notificationcard noti={noti} getnotification={getnotification} setnoti={setnoti} user={u} id={props.userdata._id} connection={props.connection}></Notificationcard>
                </>
              }) : <Text>No friend request</Text>
            }
          </>
        }

      </div>

    </div>
  )
}

export default Notification
