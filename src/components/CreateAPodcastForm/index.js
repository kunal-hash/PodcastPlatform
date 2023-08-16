import React, { useState } from "react";
import InputComponent from "../Input";
import Button from "../Button";
import FileComponent from "../FileComponent/FileComponent";
import { toast } from "react-toastify";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth,db} from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


function CreateAPodcastForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const bannerHandleFnc = (file) => {
    setBannerImage(file);
  };
  const displayHandleFnc = (file) => {
    setDisplayImage(file);
  };
  const handleCreatePodcast = async () => {
    try {
      if (title && desc && bannerImage && displayImage) {
        setLoading(true);
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        const upload = await uploadBytes(storageRef, bannerImage);

        const storageRefDref = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        const uploadsec = await uploadBytes(storageRefDref, displayImage);
        console.log(upload);

        const bannerImageUrl = await getDownloadURL(storageRef);
        const displayImageUrl = await getDownloadURL(storageRefDref);

        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
          
        };
        const docRef = await addDoc(collection(db, "podcasts"), podcastData);
        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        toast.success("podcasts created successfully");

        console.log(
          "bannerImageURL >>>",
          bannerImageUrl,
          "displayImageURL >>>",
          displayImageUrl
        );
        toast.success("File uploaded successfully");
         setLoading(false);
        navigate("/podcasts");
      } else {
        toast.error("Please fill all the values");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
       setLoading(false);
    }
  };

  return (
    <>
      <InputComponent
        state={title}
        setState={setTitle}
        placeholder="Title"
        type="text"
        required={true}
      />

      <InputComponent
        state={desc}
        setState={setDesc}
        placeholder="Description"
        type="text"
        required={true}
      />
      <FileComponent
        accept={"image/*"}
        id="banner-image-input"
        fileHandleFnc={bannerHandleFnc}
        text={"Display Image Upload"}
      ></FileComponent>
      <FileComponent
        accept={"image/*"}
        id="display-image-input"
        fileHandleFnc={displayHandleFnc}
        text={"Banner Image Upload"}
      ></FileComponent>
      <Button
        text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleCreatePodcast}
      ></Button>
    </>
  );
}

export default CreateAPodcastForm;
