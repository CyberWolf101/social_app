//note that vs code sometimes import chakra componets from the wrong path which is /dist
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./stylesheet/index.css"
import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap/dist/js/bootstrap.bundle.js';
import "./stylesheet/app.css"
import Home from "./pages/home"
import Login from "./Auth/Login"
import Signup from "./Auth/signup"
import Dashboad from './pages/dashboad';
import Profile from './pages/profile';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config';
import Comment from './pages/comment';
import AllUsers from './pages/allUsers';

export default function App() {
    const [authUser] = useAuthState(auth);
    return (
        <div >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/allusers" element={<AllUsers />} />
                    <Route path="/protected/dashboard" element={<Dashboad />} />
                    <Route path="/protected/comments/:id" element={<Comment />} />
                    <Route path="/protected/profile/:id" element={authUser ? <Profile /> : <Login />} />
                </Routes>
            </BrowserRouter>
        </div>

    )
}

//2hrs 5mins