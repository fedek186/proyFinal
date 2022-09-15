import React from "react";
import './notFound.css'

function NotFound() {
    console.log('NOT_FOUND')
    return (
        <React.Fragment>
            <div className="container">
              <img className="gif"src='img/error.gif'/>
            </div>
        </React.Fragment>

    );
}

export default NotFound;