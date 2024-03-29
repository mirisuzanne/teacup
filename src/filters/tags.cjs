'use strict';

const utils = require('./utils.cjs');
const events = require('./events.cjs');

const topCount = 6;
const isPublic = (tag) => (tag ? tag !== 'all' && !tag.startsWith('_') : null);
const publicTags = (tags) =>
  tags ? tags.filter((tag) => isPublic(tag)) : tags;

const hasTag = (page, tag) =>
  page.data.tags ? page.data.tags.includes(tag) : false;

const withTag = (collection, tag) =>
  collection.filter((page) => hasTag(page, tag));

const tagData = (collections) => {
  const eventTags = events
    .get(collections.all, false, false)
    .map((e) => e.tags)
    .reduce((all, one) => [...all, ...one], []);

  return utils
    .unique(eventTags)
    .filter((tag) => isPublic(tag))
    .map((tag) => {
      const tagEvents = events.get(collections.all, tag, false);
      return {
        tag,
        events: tagEvents,
        count: tagEvents.length,
      };
    })
    .filter((item) => item.count !== 0)
    .sort((a, b) => b.count - a.count);
};

const getTags = (collections, top = topCount) =>
  tagData(collections)
    .slice(0, top || collections.length)
    .map((item) => item.tag);

const groupTags = (collections, top = topCount) => {
  const grouped = {};
  const sorted = [];

  // group by popularity
  tagData(collections).forEach((item, i) => {
    const group = i < top ? 'top' : Math.ceil(item.count / 5) * 5;
    if (grouped[group]) {
      grouped[group].push(item);
    } else {
      grouped[group] = [item];
    }
  });

  // sort the groups
  Object.keys(grouped).forEach((group) => {
    sorted.push({
      group,
      tags: grouped[group],
    });
  });

  return sorted.reverse();
};

const displayName = (tag) => {
  if (tag) {
    return tag.startsWith('_') ? tag.slice(1) : tag;
  }

  return null;
};

const tagLink = (tag, collections) => {
  const pages = collections.all.filter((page) => page.data.index === tag);

  const extra = collections.all
    .map((page) => page.data.extraTags || [])
    .reduce((all, tags) => [...all, ...tags], [])
    .includes(tag);

  const index = pages.length ? pages[0].url : null;

  const fallback =
    extra || collections[tag] ? `/tags/${utils.slugify(tag)}/` : null;

  return index || fallback;
};

module.exports = {
  topCount,
  isPublic,
  publicTags,
  getTags,
  groupTags,
  hasTag,
  withTag,
  displayName,
  tagLink,
};
