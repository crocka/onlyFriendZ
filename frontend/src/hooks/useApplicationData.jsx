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


  function setUserReview(user_review) {

    setState({ ...state, user_reviews: { ...state.user_reviews, user_review } });

  }

  function setComment(comment) {

    setState({ ...state, comments: { ...state.comments, comment } });

  }

  //axios requests
  useEffect(() => {

    Promise.all([

      axios.get('/users'),
      axios.get('/locations'),
      axios.get(`/user/favourite_locations`),
      axios.get(`/user/user_reviews`),
      axios.get(`/location/comments`)

    ]).then(response => {

      setState(prev => {

        return { ...prev, users: response[0].data, locations: response[1].data, favourite_locations: response[2].data, user_reviews: response[3].data, comments: response[4].data };

      });

    }).catch(err => console.log(err));

  }, []);

  function getUser(id) {

    return (axios.get(`/users/${id}`));

  }

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

  function getLocation(id) {

    return (axios.get(`/locations/${id}`));

  }

  function updateLocation(id, location) {

    return (axios.put(`/locations/${id}`, { ...location })
      .then(response => {
        setLocation(response.data);
      })
    );

  }

  function createLocation(location) {

    return (axios.post(`/locations`, location)
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

  function getUserReviews(id) {

    return (axios.get(`/user/userReview/${id}`));

  }

  function createUserReview(review) {

    return (axios.post(`/user/user_reviews`, { ...review })
      .then(response => {
        setUserReview(response.data)
        return response.data;
      })
    );
  }

  function createComment(comment) {

    return (axios.post(`/location/comments`, { ...comment })
      .then(response => {
        setComment(response.data)
        return response.data;
      })
    );
  }


  function logInUser(user) {

    return (axios.post(`/login`, { ...user })
      .then(response => {

        return response.data

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
    logOutUser,
    getUser,
    getLocation,
    getUserReviews,
    createUserReview,
    createComment

  };



};