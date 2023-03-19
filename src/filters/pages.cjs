'use strict';

const isPublic = (page) => {
  const live = page.data.draft !== true;
  const title = page.data && page.data.title;
  return live && title;
};

const getPublic = (collection) => collection.filter((page) => isPublic(page));

const fromCollection = (collection, page) => {
  const pageURL = typeof page === 'string' ? page : page.url;
  return collection.filter((doc) => doc.url === pageURL);
};

const seriesNav = (page, collection) => {
  collection = collection || [];
  const pageIndex = collection.findIndex((item) => item.url === page.url);

  if (pageIndex !== -1) {
    return {
      prev: collection[pageIndex - 1] || null,
      next: collection[pageIndex + 1] || null,
    };
  }
  return null;
};

const getVideos = (collection, count) =>
  collection
    .filter((page) => page.data.video)
    .sort((a, b) => b.date > a.date)
    .sort((a, b) => b.data.feature && !a.data.feature)
    .map((page) => page.data.video)
    .reduce((all, one) => [...all, ...one], [])
    .slice(0, count);

const mergeMedia = (mediaArray) =>
  mediaArray.reduce((all, one) => [...all, ...one], []);

const titleSort = (collection) =>
  collection.sort((a, b) => a.data.title - b.data.title);

module.exports = {
  isPublic,
  getPublic,
  fromCollection,
  seriesNav,
  titleSort,
  getVideos,
  mergeMedia,
};
