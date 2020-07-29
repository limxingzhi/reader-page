import React, { useState, useEffect, Suspense, lazy } from "react";
import { KeyboardArrowUp as UpIcon } from '@material-ui/icons';
import { Fab as FloatingButton, useScrollTrigger, Zoom, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { readLS, writeLS, customRssParser, defaultRssConfig, UUID } from '../../utils/utils';
import Loader from '../../components/Loader/Loader';

import './Feed.css';

const Item = lazy(() => import('../../components/Item/Item'));

const FeedContent = () => {
  if (!readLS('feedInfo')) {
    writeLS('feedInfo', defaultRssConfig);
  }
  const [feedList, setFeedList] = useState([]);

  useEffect(() => {
    async function fetchData () {
      const response = await customRssParser(readLS('feedInfo'))
      await setFeedList(response);
    }
    fetchData();
  });

  return (<>{feedList.map(item => (<Grid item xl={3} lg={4} md={6} xs={12} key={UUID()}>
      <Item
        link={item.link}
        title={item.title}
        feedTitle={item.feedTitle}
        pubDate={item.prettyDate}
        content={item.content}
      ></Item>
    </Grid>)
  )}</>);
};

const ScrollTop = (props) => {
  const { children, window } = props;
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
      <div onClick={handleClick} role="presentation" style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
      }}>
        {children}
      </div>
    </Zoom>
  );
}

export default () => (<Grid container>
  <div className="rdr-feed">
    <div id="rdr-feed-up-btn">
      <ScrollTop style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
      }}>
        <FloatingButton aria-label="scroll back to top">
          <UpIcon />
        </FloatingButton>
      </ScrollTop>
    </div>
    <Suspense fallback={Loader()}>
      <div className="rdr-feed-wrapper">
          <FeedContent></FeedContent>
      </div>
    </Suspense>
  </div>
</Grid>);
