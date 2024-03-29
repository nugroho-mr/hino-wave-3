const pluginSass = require("eleventy-plugin-sass")
const jsdom = require("jsdom")

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
        "node_modules/lightgallery.js/dist": "assets/vendor/lightgalleryjs",
        "node_modules/@tarekraafat/autocomplete.js/dist": "assets/vendor/autocomplete",
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

    config.addHandlebarsHelper("formatArticle", function(xmlString) {
      let dom = new jsdom.JSDOM(xmlString)
      all = dom.window.document.documentElement.querySelector('body').childNodes
      let str = ''
    
      for (i = 0; i < all.length; i++) {
        all[i].removeAttribute('class')
        all[i].removeAttribute('style')
        
        if( !( all[i].tagName === 'STYLE' || all[i].tagName === 'SCRIPT' )) {
          str += all[i].outerHTML.replace(/<\/*(font|span)[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, "")
        }
      }
      return str
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