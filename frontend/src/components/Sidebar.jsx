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
import { withRouter, useHistory } from "react-router-dom";
import { useState } from "react";


const Sidebar = props => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const data = [
    {name: "Home", icon: <HomeOutlined />, onClick: () => {history.push('/'); setOpen(false)}},
    { name: "SignIn", icon: <AccountCircle /> , onClick: () => {history.push('/signin'); setOpen(false)}},
    { name: "SignUp", icon: <AccountCircle /> , onClick: () => {history.push('/signup'); setOpen(false)}},
    { name: "Welcome", icon: <AccountCircle /> , onClick: () => {history.push('/welcome'); setOpen(false)}},
    { name: "Add Location", icon: <AccountCircle /> , onClick: () => {history.push('/addlocation'); setOpen(false)}},
    // { name: "Logout", icon: <AccountCircle /> , onClick: () => {history.push('/logout'); setOpen(false)}},
  ];

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