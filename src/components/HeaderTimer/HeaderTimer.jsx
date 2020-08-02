import React, { useState, useEffect } from "react";
import { formatRelative } from 'date-fns';
import { readLS } from '../../utils/utils';

import './HeaderTimer.css';

export default () => {
  const [displayTime, setDisplayTime] = useState();
  useEffect(() => {
    setInterval(() => {
      const displayTime = `Last updated : ${formatRelative(new Date(readLS('rssAccessedTime').timestamp), Date.now())}`;
      setDisplayTime(displayTime);
    }, 1000)
  }, [])
  return (<span className="rdr-headertimer-title">{displayTime}</span>);
}
