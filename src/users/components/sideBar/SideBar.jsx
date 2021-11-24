/*eslint-disable*/
import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { NavLink } from "react-router-dom";
// core components
import styles from "./styles";
import dashboardRoutes from "./route";
import { Link as routerLink } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();

  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return location.pathname === routeName;
  }
  const routes = dashboardRoutes;
  let logo = "";
  let image = "";

  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var listItemClasses;
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path),
        });
        return (
          <NavLink
          to={prop.path}
          className={classes.item}
          activeClassName="active"
          key={key}
        >
          <ListItem button className={classes.itemLink + listItemClasses}>
            {typeof prop.icon === "string" ? (
              <Icon
                className={classNames(classes.itemIcon, whiteFontClasses, {
                  [classes.itemIconRTL]: props.rtlActive,
                })}
              >
                {prop.icon} 
              </Icon>
            ) : (
              <prop.icon
                className={classNames(classes.itemIcon, whiteFontClasses, {
                  [classes.itemIconRTL]: props.rtlActive,
                })}
              />
            )}
            <ListItemText
              primary={props.rtlActive ? prop.rtlName : prop.name}
              className={classNames(classes.itemText, whiteFontClasses, {
                [classes.itemTextRTL]: props.rtlActive,
              })}
              disableTypography={true}
            />
          </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <div className={classes.logoImage}>
        <img src={props.info.image} alt="logo" className={classes.img} />
      </div>
      <div className={classes.logoText}>
        <h2>{props.info.name} {props.info.lastName}</h2>
      </div>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >

          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(https://images.unsplash.com/photo-1634513389146-87627b4946b9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80)" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

