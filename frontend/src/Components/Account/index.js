import React from 'react'
import { isAutheticated } from '../../Auth'

const Account = () =>  {
    const user = isAutheticated().user;
    return (
        <div className="container-fluid p-0 m-0 text-break">
          <div className="row p-0 m-0 no-glutter">
            <div className="col-10 offset-1 col-md-8 offset-md-2  text-white text-center">
                <h1>{user.name}</h1>
                <h5>{user.email}</h5>
            </div>
          </div>
        </div>
    )
}

export default Account ;