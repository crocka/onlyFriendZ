import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import {
  HomeOutlined,
  AccountCircle,
} from "@material-ui/icons";
import "./Sidebar.css"
import Cookies, { get } from 'js-cookie'
import { withRouter, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import axios from 'axios';



const Sidebar = props => {
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState("https://nickelodeonuniverse.com/wp-content/uploads/Patrick.png");
  const [open, setOpen] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  const history = useHistory();
  const { response } = props;
  const data = [
    {name: "Home", icon: <HomeOutlined />, onClick: () => {history.push('/'); setOpen(false)}},
    { name: "Add Location", icon: <AccountCircle /> , onClick: () => {history.push('/addlocation'); setOpen(false)}},
    // { name: "Welcome", icon: <AccountCircle /> , onClick: () => {history.push('/welcome'); setOpen(false)}},
    // { name: "SignIn", icon: <AccountCircle /> , onClick: () => {history.push('/signin'); setOpen(false)}},
    // { name: "SignUp", icon: <AccountCircle /> , onClick: () => {history.push('/signup'); setOpen(false)}},
    { name: "Logout", icon: <AccountCircle /> , onClick: () => {logout(); setOpen(false)}},
  ];

  function logout() {
    Cookies.remove('UserID');
    document.location.href="/";
  }

   function checkUserLogin() {
    if(Cookies.get('UserID')) {
      setUserLogin(true);
      console.log("User is logged in, UserID = " + Cookies.get('UserID'));
    } else if(Cookies.get('UserID') === undefined) {
      setUserLogin(false);
      console.log("User is not logged in.");
    }
  }

  async function getUserImage(userID) {
    await axios.get(`/users/${userID}`)
    .then(response => {
      setAvatar(response.data.images[0]);
    })
  }

  async function getUserName(userID) {
    await axios.get(`/users/${userID}`)
    .then(response => {
      setUsername(response.data.user.name);
    })
  }

  useEffect(() => {
    checkUserLogin();
    getUserImage(Cookies.get('UserID'));
    getUserName(Cookies.get('UserID'));
  }, [])
  // console.log(`UserID ${Cookies.get('UserID')}'s name is '` + getUserImage(Cookies.get('UserID')));
  // console.log(response.images[0])

  
  return (
    <div className="navigation">
    <div className="navigation-toggle">
      <Button onClick={() => setOpen(true)}><img src="images/sidebar-toggle.png" width="20" height="20" alt="nav"/></Button>
      </div>
      <div className="navigation-logo">
        <Button href="/">
        <img src="images/logo.png" height="30" alt="navigation-logo"/>
        </Button>
      </div>
      {Cookies.get('UserID') > 0 &&
    <div className="navigation-current-user">
    {username}
      <Button onClick={() => history.push(`/userprofile/${Cookies.get('UserID')}`)}>
        <div className="profile-picture">
          <Avatar alt="avatar" src={avatar} />
          </div>
      </Button>
      </div>}
      <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
        <List>
          {data.map((item, index) => { 
          const { name, icon, onClick } = item;
          return (
            <ListItem button key={name} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={name} />
              </ListItem>
          );
          })}
        </List>
      </Drawer>
    </div>
  );
}

export default withRouter(Sidebar);