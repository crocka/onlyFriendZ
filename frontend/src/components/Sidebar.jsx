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
import Link from '@material-ui/core/Link'
import "./Sidebar.css"
import { withRouter } from "react-router-dom";
import { useState } from "react";


const Sidebar = props => {
  const [open, setOpen] = useState(false);
  const { history } = props;

  const data = [
    {name: "Home", icon: <HomeOutlined />, onClick: () => history.push('/') },
    { name: "Profile", icon: <AccountCircle /> , onClick: () => history.push('/profile')},
    { name: "placeholder1", icon: <AccountCircle /> , onClick: () => history.push('/placeholder1')},
    { name: "placeholder2", icon: <AccountCircle /> , onClick: () => history.push('/placeholder2')},
    { name: "placeholder3", icon: <AccountCircle /> , onClick: () => history.push('/placeholder3')},
    { name: "Logout", icon: <AccountCircle /> , onClick: () => history.push('/logout')},
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