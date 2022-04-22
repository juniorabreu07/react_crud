
import React, { ReactElement } from 'react';

interface Props{
  children:ReactElement
}

const AuthCard = (props:Props) =>{
  return(
    <div className="container  mycontainer">
      <div className="d-flex justify-content-center">
          <div className="col-md-12 col-10">
              <div className="shadow-sm rounded p-3">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        { props.children }
                    </div>
                </div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default  AuthCard;