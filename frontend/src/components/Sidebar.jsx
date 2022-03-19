import {
  Drawer,
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
import { useState } from "react";

const data = [
  {name: "Home", icon: <HomeOutlined /> },
  { name: "Profile", icon: <AccountCircle /> },
  { name: "???", icon: <AccountCircle /> },
  { name: "???", icon: <AccountCircle  /> },
  { name: "???", icon: <AccountCircle  /> },
  { name: "???", icon: <AccountCircle  /> },
];

function Sidebar() {
  const [open, setOpen] = useState(false);

  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItem button component={Link} to={"/" + item.name} key={index}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </div>
  );
  return (
    <div className="navigation">
    <div className="navigation-toggle">
      <Button onClick={() => setOpen(true)}><img src="images/sidebar-toggle.png" width="20" height="20" alt="nav"/></Button>
      </div>
      <div className="navigation-logo">
        <Button component={Link} to="/">
        <img src="images/logo.png" height="30" alt="navigation-logo"/>
        </Button>
      </div>
      <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
        {getList()}
      </Drawer>
    </div>
  );
}

export default Sidebar;