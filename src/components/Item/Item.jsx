import React from "react";
import {Card, CardContent, CardHeader} from "@material-ui/core";

import './Item.css';

export default (props) => {
  const {title, feedTitle, pubDate, content, link} = props;
  return (
    <Card className="rdr-item-card">
      <a
        href={link}
        className="rdr-item-link"
        // eslint-disable-next-line
        target="_blank"
        rel="noopener noreferre">
        <CardHeader title={title} subheader={feedTitle}></CardHeader>
        <CardContent className="rdr-item-content-wrapper">
          <span className="rdr-item-space"></span>
          <span className="rdr-item-date">{pubDate}</span>
          <span className="rdr-item-text truncate-overflow">{content}</span>
        </CardContent>
      </a>
    </Card>);
};
