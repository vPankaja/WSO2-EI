import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar/navbar';
import LandingScreen from './screens/LandingScreen/landingScreen';
import LoginScreen from './screens/LoginScreen/loginScreen';
import SignupScreen from './screens/RegisterScreen/signupScreen';
import Nav1 from './components/Navbar/nav';
import Footer from './components/Footer/footer';
import RoomsScreen from './screens/RoomScreen/roomsScreen';
import AboutScreen from './screens/AboutScreen/aboutScreen';
import UserProfile from './screens/UserProfileScreen/userProfileScreen';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Nav1 />
        <Route path="/" component={LandingScreen} exact />
        <Route path="/about" component={AboutScreen} />
        <Route path="/rooms" component={RoomsScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/signup" component={SignupScreen} />
        <Route path="/profile" component={UserProfile} />

      </div>
      <Footer />
    </Router>
  );
}

export default App;
