import React, { useState } from 'react'
import Header from '../components/Header'
import CreateAPodcastForm from "../components/CreateAPodcastForm";
function CreateAPodcast() {
   

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create A Podcast</h1>
        <CreateAPodcastForm />
      </div>
    </div>
  );
}

export default CreateAPodcast