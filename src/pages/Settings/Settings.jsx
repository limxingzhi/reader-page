import React, {useEffect, useRef} from "react";
import {TextareaAutosize, Grid, Button} from '@material-ui/core';
import { readLS, writeLS, customRssParser, defaultRssConfig } from '../../utils/utils'

import './Settings.css';

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
  writeLS('feedInfo', defaultRssConfig);
  document.getElementById('rss-config').value = JSON.stringify(defaultRssConfig, null, 2);
}

export default () => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    const config=  readLS('feedInfo');
    textAreaRef.current.value = (config)
      ? JSON.stringify(config, null, 2)
      : JSON.stringify(defaultRssConfig, null, 2);
  });

  return (
    <Grid container alignItems="center" className="rdr-settings">
      <Grid item md={2} xs={0}></Grid>
      <Grid item md={8} xs={12}>
        <div className="rdr-settings">
          <h1>Settings</h1>
          <form noValidate autoComplete="off" onSubmit={updateFeedInfoHandler}>
            <label>RSS Sources</label>
            <TextareaAutosize id="rss-config" ref={textAreaRef} className="rdr-settings-json-input" placeholder="RSS Config" rowsMin={20} />
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
