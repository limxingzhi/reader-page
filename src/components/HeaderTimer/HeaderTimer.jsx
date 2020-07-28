import React from "react";
import { formatRelative } from 'date-fns';
import { readLS } from '../../utils/utils';

import './HeaderTimer.scss';

export default () => {
return (<span className="rdr-headertimer-title">Last updated: {formatRelative(new Date(readLS('lastWritten')),Date.now())}</span>);
}
