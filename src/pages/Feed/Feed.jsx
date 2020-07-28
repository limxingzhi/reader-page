import React, { useState, Suspense } from "react";
import { KeyboardArrowUp as UpIcon } from '@material-ui/icons';
import { Fab as FloatingButton, useScrollTrigger, Zoom, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { readLS, customRssParser } from '../../utils/utils';

import './Feed.scss';

const Item = React.lazy(() => import('../../components/Item/Item'));

customRssParser(readLS('feedInfo')).then(output => { console.log(output) });

const FeedContent = () => {
  const [feedList, setFeedList] = useState([]);
  customRssParser(readLS('feedInfo')).then(response => {
    setFeedList(response.map(item => {
      return (<Grid item xl={3} lg={4} md={6} xs={12}>
        <Item
          link={item.link}
          title={item.title}
          feedTitle={item.feedTitle}
          pubDate={item.prettyDate}
          content={item.content}
        ></Item>
      </Grid>);
    }));
  });
  return (<>{feedList}</>);
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const ScrollTop = (props) => {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

export default () => (<Grid container>
  <div className="rdr-feed">
    <div id="rdr-feed-up-btn">
      <ScrollTop>
        <FloatingButton aria-label="scroll back to top">
          <UpIcon />
        </FloatingButton>
      </ScrollTop>
    </div>
    <Suspense fallback={<span>Loading...</span>}>
      <div className="rdr-feed-wrapper">
          <FeedContent></FeedContent>
      </div>
    </Suspense>
  </div>
</Grid>);
