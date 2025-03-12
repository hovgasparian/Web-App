import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './pages/navbar';
import RegistrationForm from './pages/registration';
import HomePage from './pages/homePage';
import Login from './pages/Login';
import Users from './pages/Users';
import Posts from './pages/Posts';
import UserDetails from './pages/User.details';
import Profile from './pages/Profile';
import PostDetails from './pages/Post.details';
import PostCreate from './pages/Post.create';

function App() {
    return (
        <div className="app-container">
            <Router>
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/profile' element={<Profile />}/>
                        <Route path='/users' element={<Users />}/>
                        <Route path="/users/:id" element={<UserDetails />} />
                        <Route path='/posts' element={<Posts />} />
                        <Route path='/posts/create' element={<PostCreate />} />
                        <Route path='/posts/:id' element={<PostDetails />}/>
                        <Route path='/registration' element={<RegistrationForm />} />
                        <Route path='/login' element={<Login />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
