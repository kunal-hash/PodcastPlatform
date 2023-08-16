import './App.css';
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
import SignInSignUp from './pages/SignInSignUp';
import Profile from "./pages/Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import PrivateRoutes from './pages/PrivateRoute';
import CreateAPodcast from './pages/CreateAPodcast';
import Podcasts from './pages/Podcasts';
import PodcastDetailPage from './pages/PodcastDetailPage';
import CreateAnEpisode from './pages/CreateAnEpisode';
function App() {
  const dispatch = useDispatch();
  var cursor;
  var cursorPointer;

  useEffect(() => {
    cursor = document.getElementById("cursor");
    cursorPointer = document.getElementById("cursor-pointer");

    document.body.addEventListener("mousemove", function (e) {
      return (
        (cursor.style.left = e.clientX + "px"),
        (cursor.style.top = e.clientY + "px"),
        (cursorPointer.style.left = e.clientX + "px"),
        (cursorPointer.style.top = e.clientY + "px")
      );
    });

    document.body.addEventListener("mousedown", function (e) {
      return (
        (cursor.style.height = "0.5rem"),
        (cursor.style.width = "0.5rem"),
        (cursorPointer.style.height = "3rem"),
        (cursorPointer.style.width = "3rem")
      );
    });

    document.body.addEventListener("mouseup", function (e) {
      return (
        (cursor.style.height = "0.3rem"),
        (cursor.style.width = "0.3rem"),
        (cursorPointer.style.height = "2rem"),
        (cursorPointer.style.width = "2rem")
      );
    });
  }, []);
  useEffect(() => {
     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
       if (user) {
         const unsubscribeSnapshot = onSnapshot(
           doc(db, "users", user.uid),
           (userDoc) => {
             if (userDoc.exists()) {
               const userData = userDoc.data();
               dispatch(
                 setUser({
                   name: userData.name,
                   email: userData.email,
                   uid: user.uid,
                 })
               );
             }
           },
           (error) => {
             console.error("Error fetching user data:", error);
           }
         );

         return () => {
           unsubscribeSnapshot();
         };
       }
     });

     return () => {
       unsubscribeAuth();
     };
  }, [])
  
  return (
    <div className="App">
      <div className="cursor" id="cursor" />
      <div className="cursor-pointer" id="cursor-pointer" />
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<SignInSignUp />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-a-podcast" element={<CreateAPodcast />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/podcast/:id" element={<PodcastDetailPage />} />
            <Route path="/podcast/:id/create-episode" element={<CreateAnEpisode />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
