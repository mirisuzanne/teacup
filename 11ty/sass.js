import { join, parse } from 'node:path';

import { compileString } from 'sass';

export default function (eleventyConfig, options = {}) {
  const opts = {
    sassIn: '_sass',
    cssOut: 'css',
    ...options,
  };

  eleventyConfig.addTemplateFormats('scss');

  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css',

    compileOptions: {
      permalink(contents, inputPath) {
        return (data) => {
          const cssPath = data.page.filePathStem.startsWith(`/${opts.sassIn}/`)
            ? data.page.filePathStem.replace(`/${opts.sassIn}/`, '')
            : data.page.filePathStem.replace('/', '');
          return `${join(opts.cssOut, cssPath)}.css`;
        };
      },
    },

    async compile(inputContent, inputPath) {
      const parsed = parse(inputPath);

      if (parsed.name.startsWith('_')) {
        return;
      }

      const result = compileString(inputContent, {
        loadPaths: [parsed.dir || '.'],
      });

      this.addDependencies(inputPath, result.loadedUrls);

      return async (data) => result.css;
    },
  });
};
