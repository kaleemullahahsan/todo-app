import "./App.css";
import Navbar from "./Components/Navbar";
import Tasksmine from "./Components/Tasksmine";

function App() {
  return (
    <>
      <Navbar logo="My Todo" />
      {/* <Tasks /> */}
      <Tasksmine />
    </>
  );
}

export default App;
