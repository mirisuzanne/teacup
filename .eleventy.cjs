'use strict';

const hljs = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginWebc = require('@11ty/eleventy-plugin-webc');
const { eleventyImageTransformPlugin } = require('@11ty/eleventy-img');

const utils = require('./src/filters/utils.cjs');
const events = require('./src/filters/events.cjs');
const pages = require('./src/filters/pages.cjs');
const tags = require('./src/filters/tags.cjs');
const time = require('./src/filters/time.cjs');
const type = require('./src/filters/type.cjs');

module.exports = (eleventyConfig) => {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPlugin(pluginWebc);
  eleventyConfig.addPlugin(hljs);

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // which file extensions to process
    extensions: 'html',

    // Add any other Image utility options here:
    outputDir: './_site/img/',

    // optional, output image formats
    formats: ['avif', 'jpeg'],
    // formats: ["auto"],

    // optional, output image widths
    // widths: ["auto"],

    // optional, attributes assigned on <img> override these values.
    defaultAttributes: {
      loading: 'lazy',
      decoding: 'async',
    },
  });

  // pass-through
  eleventyConfig.addPassthroughCopy({ _built: 'assets' });
  eleventyConfig.addPassthroughCopy({ 'src/fonts': 'assets/fonts' });
  eleventyConfig.addPassthroughCopy({ 'src/files': 'assets/files' });
  eleventyConfig.addPassthroughCopy('content/**/*.txt');
  eleventyConfig.addPassthroughCopy('content/favicon.ico');

  // filters
  eleventyConfig.addFilter('typeCheck', utils.typeCheck);
  eleventyConfig.addFilter('objectKeys', utils.objectKeys);
  eleventyConfig.addFilter('jsonString', utils.jsonString);
  eleventyConfig.addFilter('only', utils.only);
  eleventyConfig.addFilter('domain', utils.domain);

  eleventyConfig.addFilter('getDate', time.getDate);
  eleventyConfig.addFilter('rssDate', time.rssDate);
  eleventyConfig.addFilter('rssLatest', time.rssLatest);

  eleventyConfig.addFilter('publicTags', tags.publicTags);
  eleventyConfig.addFilter('getTags', tags.getTags);
  eleventyConfig.addFilter('groupTags', tags.groupTags);
  eleventyConfig.addFilter('hasTag', tags.hasTag);
  eleventyConfig.addFilter('withTag', tags.withTag);
  eleventyConfig.addFilter('displayName', tags.displayName);
  eleventyConfig.addFilter('tagLink', tags.tagLink);
  eleventyConfig.addFilter(
    'inTopTagCount',
    (count) => typeof count === 'number' && count <= tags.topCount,
  );

  eleventyConfig.addFilter('getPage', pages.fromCollection);
  eleventyConfig.addFilter('getPublic', pages.getPublic);
  eleventyConfig.addFilter('seriesNav', pages.seriesNav);
  eleventyConfig.addFilter('titleSort', pages.titleSort);
  eleventyConfig.addFilter('getVideos', pages.getVideos);
  eleventyConfig.addFilter('mergeMedia', pages.mergeMedia);

  eleventyConfig.addFilter('getEvents', events.get);
  eleventyConfig.addFilter('countEvents', events.count);
  eleventyConfig.addFilter('groupName', (group) => events.groupNames[group]);

  eleventyConfig.addFilter('amp', type.amp);
  eleventyConfig.addFilter('typogr', type.set);
  eleventyConfig.addFilter('md', type.render);
  eleventyConfig.addFilter('mdInline', type.inline);

  // shortcodes
  eleventyConfig.addPairedShortcode('md', type.render);
  eleventyConfig.addPairedShortcode('mdInline', type.inline);
  eleventyConfig.addShortcode(
    'getDate',
    (format) => `${time.getDate(time.now, format)}`,
  );

  // markdown
  eleventyConfig.setLibrary('md', type.mdown);

  // settings
  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'content',
      includes: '_includes',
      layouts: '_layouts',
    },
  };
};
