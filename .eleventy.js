const pluginSass = require("eleventy-plugin-sass")

function compare( a, b ) {
    if ( a.last_nom < b.last_nom ){
      return -1;
    }
    if ( a.last_nom > b.last_nom ){
      return 1;
    }
    return 0;
  }

module.exports = function(config) {
    config.addPlugin(pluginSass,  {
        watch: ['src/**/*.{scss,sass}'],
        outputDir: 'dist/css/*',
        remap: true
    })
    config.addPassthroughCopy({
        "src/assets": "assets",
        "node_modules/@splidejs/splide/dist": "assets/vendor/splidejs",
        "node_modules/boxicons/dist": "assets/vendor/boxicons/js",
        "node_modules/boxicons/css": "assets/vendor/boxicons/css",
        "node_modules/boxicons/fonts": "assets/vendor/boxicons/fonts",
    })
    config.addCollection('pages', collection => {
        return collection.getFilteredByGlob('src/site/pages/*').sort(function(a, b) {
            var keyA = parseInt(a.data.order),
              keyB = parseInt(b.data.order);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
    })

    config.addHandlebarsHelper("eq", function(a, b) {
      if ( a === b ) {
        return true
      } else {
        return false
      }
    });

    return {
        passthroughFileCopy: true,
        dir: {
            input: "src/site",
            output: "dist",
            includes: "templates",
        }
    }
};