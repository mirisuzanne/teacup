'use strict';

const pages = require('./pages.cjs');
const time = require('./time.cjs');
const utils = require('./utils.cjs');

const isPublic = (event) => event.draft !== true;
const hasEvents = (page) => page.data.events;

const groupNames = {
  5000: 'now',
  now: 5000,
  4000: 'ongoing',
  ongoing: 4000,
  3000: 'soon',
  soon: 3000,
};

const isEvent = (page) =>
  page.data.tags ? page.data.tags.includes('_calendar') : false;

const eventDate = (event) => event.start || event.date;

const buildEvent = (page, event, index) => {
  index = index || 0;
  const feature = event ? event.feature : page.data.feature;

  // start and end
  const eventStart = event ? eventDate(event) : null;
  const start = eventStart || page.data.start || page.date;
  let end = eventStart ? event.end : page.data.end;
  end = end ? end : start;

  let date = start;

  // set end for far future…
  if (end === 'ongoing') {
    end = new Date(`${groupNames.ongoing}-01-01`);
  } else if (feature === 'pin') {
    date = new Date(`${groupNames.now}-01-01`);
  }

  // set group…
  const end_iso = time.dateFormat(end, 'iso');
  const start_iso = time.dateFormat(start, 'iso');
  const now_iso = time.dateFormat(time.now, 'iso');
  let group = time.dateFormat(date, 'year');

  if (end_iso >= now_iso) {
    const endYear = `${time.dateFormat(end, 'year')}`;
    if (groupNames[endYear]) {
      group = endYear;
    } else {
      group = start_iso > now_iso ? groupNames.soon : groupNames.now;
    }
  }

  // concat tags
  const pageTags = page.data.tags || [];
  const eventTags = event ? event.tags || [] : [];
  const tags = utils.unique([...pageTags, ...eventTags]);

  return { page, event, start, end, date, group, tags, feature, index };
};

const fromYAML = (page) => {
  const events = [];

  page.data.events
    .filter((event) => isPublic(event))
    .forEach((event, index) => {
      events.push(buildEvent(page, event, index));
    });

  return events;
};

const fromCollection = (collection) => {
  const events = [];

  collection
    .filter((page) => pages.isPublic(page))
    .forEach((page) => {
      if (hasEvents(page)) {
        Array.prototype.push.apply(events, fromYAML(page));
      }

      if (isEvent(page) && pages.isPublic(page)) {
        events.push(buildEvent(page));
      }
    });

  return events;
};

const count = (groups) => {
  const eventsPer = groups.map((g) => g.data.length);
  return eventsPer.reduce((all, group) => all + group, 0);
};

const byGroup = (events) => {
  const groups = utils.groupBy(events, 'group');
  const sorted = [];

  Object.keys(groups)
    .sort((a, b) => a - b)
    .forEach((group) => {
      const data = groups[group].sort((a, b) => a.date - b.date);
      group = groupNames[group] || group;
      sorted.push({ group, data });
    });

  return sorted.reverse();
};

const get = (collection, only, group = true) => {
  let events = fromCollection(collection);

  if (only) {
    events = events.filter((event) => event.tags.includes(only));
  }

  if (group) {
    events = byGroup(events);
  }

  return events;
};

module.exports = {
  isPublic,
  isEvent,
  hasEvents,
  fromCollection,
  byGroup,
  get,
  count,
  groupNames,
};
