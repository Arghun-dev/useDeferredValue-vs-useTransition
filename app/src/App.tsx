import { Bad } from "./Bad";
import { Good } from "./Good";
import "./App.css";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {/* <div>
        <h2>Bad Implementation</h2>
        <Bad />
      </div> */}
      <div>
        <h2>Good Implementation</h2>
        <Good />
      </div>
    </div>
  );
}

export default App;
