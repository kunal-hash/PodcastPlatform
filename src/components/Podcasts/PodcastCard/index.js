import React from 'react'
import "./style.css"
import {Link} from "react-router-dom"


function PodcastsCard({id,title, displayImage }) {
  
  return (
    <Link to={`/podcast/${id}`}>
      <div className="podcast-card">
        <img
          className="display-image-podcast"
          alt="podcast"
          src={displayImage}
        />
        <p className="title-podcast my-element">{title}</p>
      </div>
    </Link>
  );
}

export default PodcastsCard