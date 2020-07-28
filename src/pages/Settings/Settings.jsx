import React, {useEffect, useRef} from "react";
import {TextareaAutosize, Grid, Button} from '@material-ui/core';
import { readLS, writeLS, customRssParser } from '../../utils/utils'

import './Settings.scss';

const defaultRssConfig = `[
  {
    "name": "CNA (Latest)",
    "url": "www.channelnewsasia.com/rssfeeds/8395986"
  },
  {
    "name": "/r/worldnews",
    "url": "www.reddit.com/r/worldnews.rss"
  },
  {
    "name": "The Guardian (International)",
    "url": "www.theguardian.com/international/rss"
  },
  {
    "name": "/r/explainlikeimfive",
    "url": "www.reddit.com/r/explainlikeimfive/top.rss"
  }
]`;

const updateFeedInfoHandler = () => {
  const feedInfoString = document.getElementById('rss-config').value;

  try {
    JSON.parse(feedInfoString);
  } catch (exception) {
    window.alert('Invalid JSON format');
    console.error('Invalid JSOn format');
  }

  customRssParser(JSON.parse(feedInfoString), 0)
    .then(() => {
      writeLS('feedInfo', JSON.parse(feedInfoString));
      window.alert('Config saved')
    })
    .catch((exception) => {
      window.alert('RSS not valid, config not saved');
      console.error('RSS not valid, config not saved');
    });
}

const restoreDefaultFeedInfo = () => {
  writeLS('feedInfo', JSON.parse(defaultRssConfig));
  document.getElementById('rss-config').value = defaultRssConfig;
}

export default () => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.value = JSON.stringify(readLS('feedInfo'), null, 2);
    textAreaRef.current.value = (textAreaRef.current.value == null)
      ? defaultRssConfig : textAreaRef.current.value;
  });

  return (
    <Grid container alignItems="center" className="rdr-settings">
      <Grid item md={2} xs={0}></Grid>
      <Grid item md={8} xs={12}>
        <div className="rdr-settings">
          <h1>Settings</h1>
          <form noValidate autoComplete="off" onSubmit={updateFeedInfoHandler}>
            <label>RSS Sources</label>
            <TextareaAutosize id="rss-config" ref={textAreaRef} class="rdr-settings-json-input" placeholder="RSS Config" rowsMin={20} />
            <Button type="Submit" variant="contained" color="primary">Save</Button>
            <br />
            <br />
            <Button variant="contained" color="secondary" onClick={restoreDefaultFeedInfo}>Restore Defaults</Button>
          </form>
        </div>
      <Grid item md={2} xs={0}></Grid>
      </Grid>
    </Grid>
  );
}
