import React from "react";
import axios from "axios";

// Evergreen UI
import { Heading, Text } from "evergreen-ui/commonjs/typography";
import { TextInput } from "evergreen-ui";
import { Button } from "evergreen-ui/commonjs/buttons";
import { Pane } from "evergreen-ui/commonjs/layers";
const margin = 16;

// API variables
const API_KEY = ""; // Insert your key here
const API_BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
const API_ICON_BASE_URL = "http://openweathermap.org/img/wn/";

function Search({ states }) {
  const { city, setCity, setData, setError } = states;

  /**
   * Fetch the weather API.
   * Saves the response into the 'data' state variable.
   *
   * 'async' and 'await' make the function non-blocking,
   * since requesting data from an API might take some time.
   */
  async function fetchAPI() {
    await axios
      .get(API_BASE_URL + `?appid=${API_KEY}&units=metric&q=${city}`)
      .then((response) => {
        setData(response.data);
        setError(null);
      })
      .catch((error) => setError(error));
  }

  return (
    <Pane
      elevation={0}
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Heading marginBottom={margin} size={900}>
        Simple Weather
      </Heading>
      <Text marginBottom={3 * margin}>
        Choose a city to track their weather information
      </Text>

      <TextInput
        marginBottom={margin}
        name="text-input-name"
        placeholder="Toronto"
        onChange={(e) => setCity(e.target.value)}
      />
      <Button onClick={fetchAPI}>Track</Button>
    </Pane>
  );
}

export default Search;
