import "./Sidebar.css"
import Cookies from 'js-cookie'
import Avatar from '@mui/material/Avatar';
import axios from 'axios';

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
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

import { withRouter, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const Sidebar = props => {
  const [username, setUsername] = useState(null);

  const [avatar, setAvatar] = useState("https://nickelodeonuniverse.com/wp-content/uploads/Patrick.png");
  
  const [open, setOpen] = useState(false);
 
  const history = useHistory();
  
  const data = [
    {name: "Home", icon: <HomeOutlined />, onClick: () => {history.push('/'); setOpen(false)}},
    {name: "Add Location", icon: <AddLocationAltIcon /> , onClick: () => {history.push('/addlocation'); setOpen(false)}},
    {name: "Logout", icon: <AccountCircle /> , onClick: () => {logout(); setOpen(false)}},
  ];

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
    getUserImage(Cookies.get('UserID'));
    getUserName(Cookies.get('UserID'));
  }, [])

  function logout() {
    Cookies.remove('UserID');
    document.location.href="/";
  }

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