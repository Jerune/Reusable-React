import PropTypes from "prop-types";
import React from "react";

export default function Badge({children, color}){
    return (
        <div className={`badge ${color}`}>
            {children}
        </div>
    )
}

Badge.propTypes = {
    children: PropTypes.any,
    color: PropTypes.string
}