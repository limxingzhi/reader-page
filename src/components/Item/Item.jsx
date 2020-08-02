import React from "react";

import './Item.css';

export default (props) => {
  const {title, feedTitle, pubDate, content, link} = props;
  return (
    <div className="rdr-item">
      <a
        href={link}
        className="rdr-item-link"
        // eslint-disable-next-line
        target="_blank"
        rel="noopener noreferre">
        <span className="rdr-item-title">{title}</span>
        <span className="rdr-item-sub-title">{feedTitle}</span>
        <span className="rdr-item-content-wrapper">
          <span className="rdr-item-space"></span>
          <span className="rdr-item-date">{pubDate}</span>
          <span className="rdr-item-text truncate-overflow">{content}</span>
        </span>
      </a>
    </div>);
};
