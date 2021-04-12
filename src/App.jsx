import React, { useState } from "react";
import axios from "axios";

import Search from "./components/Search";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  return (
    <div className="App">
      <Search states={{ city, setCity, setData, setError }} />
    </div>
  );
}

export default App;
