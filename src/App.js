import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import Login from './components/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token")

  
  return (
    <Router>
      <div>
        <header className="bg-gray-800 text-white py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Movie App with Upload</h1>
          </div>
        </header>
     
        <Routes>
        {token ? <Route exact path="/" element={<MovieList />} /> : <Route exact path="/" element={ <Login setIsLoggedIn={setIsLoggedIn} />} />}
          <Route exact path="/" element={<MovieList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
