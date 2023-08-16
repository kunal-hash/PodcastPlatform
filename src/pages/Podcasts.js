import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import InputComponent from "../components/Input";

import { setPodcast } from "../slices/podcastSlice";
import PodcastsCard from '../components/Podcasts/PodcastCard';
import { Link } from 'react-router-dom';
function Podcasts() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
   const [search, setSearch] = useState("");
    const podcasts = useSelector((state) => state.podcast.podcast);
      useEffect(() => {
        const unsubscribe = onSnapshot(
          query(collection(db, "podcasts")),
          (querySnapshot) => {
            const podcastsData = [];
            querySnapshot.forEach((doc) => {
              podcastsData.push({ id: doc.id, ...doc.data() });
            });
            dispatch(setPodcast(podcastsData));
            console.log("datataa", podcastsData);
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching podcasts:", error);
          }
        );

        return () => {
          unsubscribe();
        };
      }, [dispatch]);

  console.log("podcast", podcasts);
    var filteredPodcasts = podcasts.filter((item) =>
      item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    );
  return (
    <>
      <div>
        <Header />
        <div className="input-wrapper" style={{ marginTop: "2rem" }}>
          <h1>Discover Podcasts</h1>
          <InputComponent
            state={search}
            setState={setSearch}
            placeholder="Search By Title"
            type="text"
          />
          
              {filteredPodcasts.length>0? (
                  <div className="podcasts-flex" style={{ marginTop: "2rem" }}>
                    {filteredPodcasts.map((items) => {
                      return (
                      
                          <PodcastsCard
                            key={items.id}
                            id={items.id}
                            title={items.title}
                            displayImage={items.displayImage}
                          />
                     
                      );
                    })}
                  </div>
              
                ) :
                  (<p>{search ? "Podcast Not Found" : "No Podcasts On The Platform"}</p>)
              }
          
          
        </div>
      </div>
    </>
  );
}

export default Podcasts