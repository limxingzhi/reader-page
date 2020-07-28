import React from "react";
import { AppBar as Navbar , Toolbar, IconButton, useScrollTrigger , Slide } from '@material-ui/core';
import { Settings as SettingsIcon, Code as CodeIcon, DynamicFeed as DynamicFeedIcon } from '@material-ui/icons';
import { Link, useHistory } from "react-router-dom";
import HeaderTimer from '../HeaderTimer/HeaderTimer';

import './Header.scss';

const HideOnScroll = (props) => {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


export default () => {
  const reloadPage = useHistory();
  return (
    <HideOnScroll>
      <Navbar position="sticky">
        <Toolbar className="rdr-header-wrapper">
          <span>
            <IconButton edge="end" color="inherit" className="rdr-header-icon-feed" onClick={reloadPage.go}>
              <Link to="/" className="rdr-header-link"><DynamicFeedIcon /></Link>
            </IconButton>
          </span>
          <HeaderTimer></HeaderTimer>
          <span>
          <IconButton edge="end" color="inherit" className="rdr-header-icon-code">
            <a href="https://github.com" rel="noopener" className="rdr-header-link"><CodeIcon /></a>
          </IconButton>
          <IconButton edge="end" color="inherit" className="rdr-header-icon-settings">
            <Link to="/settings" className="rdr-header-link"><SettingsIcon /></Link>
          </IconButton>
          </span>
        </Toolbar>
      </Navbar>
    </HideOnScroll>
  );
}
