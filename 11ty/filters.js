import { typeCheck, objectKeys, jsonString, only, domain } from '../src/filters/utils.cjs';
import { get, count, groupNames } from '../src/filters/events.cjs';
import { fromCollection, getPublic, seriesNav, titleSort, getVideos, mergeMedia } from '../src/filters/pages.cjs';
import { publicTags, getTags, groupTags, hasTag, withTag, displayName, tagLink, topCount } from '../src/filters/tags.cjs';
import { dateFormat, rssDate, rssLatest, now } from '../src/filters/time.cjs';
import { amp, set, render, inline, mdown } from '../src/filters/type.cjs';

export default (eleventyConfig) => {
  eleventyConfig.addFilter('typeCheck', typeCheck);
  eleventyConfig.addFilter('objectKeys', objectKeys);
  eleventyConfig.addFilter('jsonString', jsonString);
  eleventyConfig.addFilter('only', only);
  eleventyConfig.addFilter('domain', domain);

  eleventyConfig.addFilter('dateFormat', dateFormat);
  eleventyConfig.addFilter('rssDate', rssDate);
  eleventyConfig.addFilter('rssLatest', rssLatest);

  eleventyConfig.addFilter('publicTags', publicTags);
  eleventyConfig.addFilter('getTags', getTags);
  eleventyConfig.addFilter('groupTags', groupTags);
  eleventyConfig.addFilter('hasTag', hasTag);
  eleventyConfig.addFilter('withTag', withTag);
  eleventyConfig.addFilter('displayName', displayName);
  eleventyConfig.addFilter('tagLink', tagLink);
  eleventyConfig.addFilter(
    'inTopTagCount',
    (n) => typeof n === 'number' && n <= topCount,
  );

  eleventyConfig.addFilter('getPage', fromCollection);
  eleventyConfig.addFilter('getPublic', getPublic);
  eleventyConfig.addFilter('seriesNav', seriesNav);
  eleventyConfig.addFilter('titleSort', titleSort);
  eleventyConfig.addFilter('getVideos', getVideos);
  eleventyConfig.addFilter('mergeMedia', mergeMedia);

  eleventyConfig.addFilter('getEvents', get);
  eleventyConfig.addFilter('countEvents', count);
  eleventyConfig.addFilter('groupName', (group) => groupNames[group]);

  eleventyConfig.addFilter('amp', amp);
  eleventyConfig.addFilter('typogr', set);
  eleventyConfig.addFilter('md', render);
  eleventyConfig.addFilter('mdInline', inline);

  // shortcodes
  eleventyConfig.addPairedShortcode('md', render);
  eleventyConfig.addPairedShortcode('mdInline', inline);

  // markdown
  eleventyConfig.setLibrary('md', mdown);
};
