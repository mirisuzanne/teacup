'use strict';

import hljs from '@11ty/eleventy-plugin-syntaxhighlight';
import pluginWebc from '@11ty/eleventy-plugin-webc';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';

import sass from './11ty/sass.js';
import filters from './11ty/filters.js';

export default (eleventyConfig) => {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPlugin(hljs);
  eleventyConfig.addPlugin(sass);
  eleventyConfig.addPlugin(filters);

  eleventyConfig.addPlugin(pluginWebc, {
		components: "content/_includes/**/*.webc",
	});

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // which file extensions to process
    extensions: 'html',

    // Add any other Image utility options here:
    outputDir: './_site/img/',

    // optional, output image formats
    formats: ['avif', 'jpeg'],
    // formats: ["auto"],

    // optional, output image widths
    widths: [1600],

    // optional, attributes assigned on <img> override these values.
    defaultAttributes: {
      loading: 'lazy',
      decoding: 'async',
    },
  });

  // pass-through
  eleventyConfig.addPassthroughCopy({ 'src/fonts': 'assets/fonts' });
  eleventyConfig.addPassthroughCopy({ 'src/files': 'assets/files' });
  eleventyConfig.addPassthroughCopy('content/**/*.txt');
  eleventyConfig.addPassthroughCopy('content/favicon.ico');

  // settings
  eleventyConfig.setQuietMode(true);

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'content',
      includes: '_includes',
      layouts: '_layouts',
    },
  };
};
