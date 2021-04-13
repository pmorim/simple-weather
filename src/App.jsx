import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Evergreen UI
import { Alert } from "evergreen-ui/commonjs/alert";
import { Pane } from "evergreen-ui/commonjs/layers";
import { Heading, Text } from "evergreen-ui/commonjs/typography";
import { TextInput } from "evergreen-ui";
import { Button } from "evergreen-ui/commonjs/buttons";
const margin = 16;

// API variables
const API_KEY = ""; // Insert your key here
const ICON_BASE_URL = "http://openweathermap.org/img/wn/";
const DATA_BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

function App() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("New York");
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Fetch the OpenWeather API
  const fetchAPI = useCallback(async () => {
    await axios
      .get(DATA_BASE_URL + `?appid=${API_KEY}&units=metric&q=${city}`)
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((error) => {
        setData(null);
        setError(error.response);
      });
  }, [city]);

  // Fetch the API when the page renders
  useEffect(fetchAPI, [fetchAPI]);

  return (
    <Pane
      height="100vh"
      minWidth={600}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Heading marginBottom={margin} size={900}>
        Simple Weather
      </Heading>
      <Text marginBottom={3 * margin}>
        Choose a city to check their weather information
      </Text>
      <TextInput
        marginBottom={margin}
        placeholder="New York"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button onClick={() => setCity(search)}>Get Weather</Button>

      {data && (
        <Pane
          marginTop={48}
          paddingRight={32}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
        >
          <img
            src={ICON_BASE_URL + data.weather[0].icon + "@4x.png"}
            alt={data.weather[0].main}
          />
          <Pane display="flex" flexDirection="column">
            <Heading size={900}>{data.name}</Heading>
            <Text>{data.main.temp} ºC</Text>
          </Pane>
        </Pane>
      )}

      {error && (
        <Alert
          marginTop={48}
          maxWidth={600}
          intent="danger"
          title={`Error ${error.status}: ${error.statusText}`}
        >
          {error.data.message}
        </Alert>
      )}
    </Pane>
  );
}

export default App;
