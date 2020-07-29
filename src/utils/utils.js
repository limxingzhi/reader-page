import Parser from 'rss-parser';
import { formatRelative } from 'date-fns';

const appendReverseProxy = (urlInput) => {
  return `https://xingzhi.dev/corsanywhere/${urlInput}`;
}

export const defaultRssConfig = [
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
  }
];

export const customRssParser = async (endpointArray, limit = 100) => {
  const promiseArray = [];
  const parser = new Parser();

  endpointArray.map(({ name, url }) => {
    promiseArray.push(
      parser.parseURL(appendReverseProxy(url)).then(response => { return { ...response, feedTitle: name }; })
    );
    return null;
  });

  return await Promise.allSettled(promiseArray)
    // looking at the response input
    // .then(response => { console.log(response); return response; })
    // inserting the feedTitle into each article
    // removing all unrelevant metadata
    .then(response => response.map(({ value }) => {
      return value.items.map(article => {
        return { ...article, feedTitle: value.feedTitle };
      })
    }))
    // flattening all arrays into one
    .then(response => response.flat(1))
    // transforming array to the format we want to use for items component
    .then(flatternArray => flatternArray.map((element) => {
      return {
        timestamp: (new Date(element.isoDate)).getTime(),
        prettyDate: formatRelative(new Date(element.isoDate), Date.now()),
        feedTitle: element.feedTitle,
        link: element.link,
        title: element.title,
        content: element.contentSnippet
      }
    }))
    // sorting array by descending timestamp
    .then(feedList => immutableSort(feedList, (item1, item2) => {
      return item2.timestamp - item1.timestamp;
    }))
    // truncate the array to the size we want
    .then(sortedList => [...sortedList].slice(0, limit));
}

export const writeLS = (key, inputObj) => {
  window.localStorage.setItem(`rssReader:${key}`, JSON.stringify(inputObj));
}

export const readLS = (key) => {
  return JSON.parse(window.localStorage.getItem(`rssReader:${key}`));
}

// functional immutable version of array sorting
export const immutableSort = (arrayInput, sortFunction) => {
  return [...arrayInput].sort(sortFunction);
}

export const UUID = () => {
  // Public Domain/MIT
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
};
