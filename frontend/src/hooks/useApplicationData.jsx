import axios from "axios";
const { useState, useEffect } = require("react");

export default function useApplicationData() {

  const [state, setState] = useState({

    users: {},
    locations: {},
    favourite_locations: {},
    user_reviews: {},
    comments: {}

  });

  function setUser(user) {
    //...state = getting everything (users, locations) && users = getting all previous users as to not overwite everything and setting/update a new user
    setState({ ...state, users: { ...state.users, user } });

  }

  function setLocation(location) {

    setState({ ...state, locations: { ...state.locations, location } });

  }

  //axios requests
  useEffect(() => {

    Promise.all([

      axios.get('/users'),
      axios.get('/locations'),
      axios.get(`/users/favourite_locations`),
      axios.get(`/users/user_reviews`),
      axios.get(`/locations/comments`)

    ]).then(response => {

      setState({ ...state, users: response[0].data, locations: response[1].data, favourite_locations: response[2].data, user_reviews: response[3].data, comments: response[4].data });

    });

  }, [state]);


  function updateUser(id, user) {

    return (axios.put(`/users/${id}`, { ...user })
      .then(response => {
        setUser(response.data);
      })
    );

  }

  function createUser(user) {

    return (axios.post(`/users`, user)
      .then(response => {
        setUser(response.data);
      })
    );
  }

  function deleteUser(user_id) {

    return (axios.delete(`/users/${user_id}`)
      .then(response => {
        setUser(response.data);

        //update state
      })
    );

  }

  function updateLocation(id, location) {

    return (axios.put(`/locations/${id}`, { ...location })
      .then(response => {
        setLocation(response.data);
      })
    );


  }

  function createLocation(location) {

    return (axios.post(`/locations`, { ...location })
      .then(response => {
        setUser(response.data);
      })
    );

  }

  function deleteLocation(location_id) {

    return (axios.delete(`/locations/${location_id}`)
      .then(response => {
        setUser(response.data);

        //update state
      })
    );

  }


  function logInUser(user) {

    return (axios.post(`/login`, { ...user })
      .then(response => {

        console.log(response);

      })
    );
  }

  function logOutUser() {

    return (axios.get(`/logout`))
      .then(response => {

        console.log(response);
      })
  }




  //return the functions and state that application needs
  return {

    state,
    createUser,
    updateUser,
    createLocation,
    updateLocation,
    deleteUser,
    deleteLocation,
    logInUser,
    logOutUser

  };



};