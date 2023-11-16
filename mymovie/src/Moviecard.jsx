import React from "react"


function Moviecard ({props}){

    return (
        <div>
        <h2>
            {props.Title}
        </h2>
        <h3>
            {props.Year}
        </h3>
        <h4>
            {props.Type}
            </h4>
    <img src={props.Poster} alt="Poster"/>
        </div>
    )
}
export default Moviecard
