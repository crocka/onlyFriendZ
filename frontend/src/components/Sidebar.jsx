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
import Cookies from 'js-cookie'
import { withRouter, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";


const Sidebar = props => {
  const [open, setOpen] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  const history = useHistory();

  const data = [
    {name: "Home", icon: <HomeOutlined />, onClick: () => {history.push('/'); setOpen(false)}},
    { name: "Add Location", icon: <AccountCircle /> , onClick: () => {history.push('/addlocation'); setOpen(false)}},
    { name: "Welcome", icon: <AccountCircle /> , onClick: () => {history.push('/welcome'); setOpen(false)}},
    { name: "SignIn", icon: <AccountCircle /> , onClick: () => {history.push('/signin'); setOpen(false)}},
    { name: "SignUp", icon: <AccountCircle /> , onClick: () => {history.push('/signup'); setOpen(false)}},
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

  useEffect(() => {
    checkUserLogin();
  }, [])

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