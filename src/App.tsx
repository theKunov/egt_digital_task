import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UserList from "./components/User/UserList";
import UserPosts from "./components/Posts/UserPosts";
import useFetch from "./components/hooks/useFetch";
import Header from "./components/Header/Header";
import Tasks from "./components/Tasks/Tasks";

function App() {
  useFetch("users", "addUsers");
  
  return (
    <Router>
      <div className="App">
      <Header />
      <Routes >
        <Route path="/" element={<UserList/>}/>
        <Route path="/tasks" element={<Tasks/>}/>
        <Route path="/users/:username/posts" element={<UserPosts />} />
      </Routes>
      </div>
    </Router>

  );
}

export default App;
