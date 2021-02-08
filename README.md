# HINO Wave 3

## HTML, CSS, & JS

HTML template ada di dalam folder `dist/pages/[path-halaman]/index.html`.

Master CSS ada di `dist/css/style.css`.

Javascript untuk masing-masing halaman ditempatkan di akhir template.

Aset-aset lainnya (aset gambar & vendor) ada di folder `dist/assets`.

---

## Templating dengan 11ty

Template ini dibuat menggunakan static site generator 11ty berbasis handlebars untuk template dan front matter untuk data. Apabila ingin melihat template sebagai referensi penerapan pada EmberJS, source code ada di folder `src` dengan rincian:
- SCSS ada di folder `src/scss`
- Handlebar layout template ada di folder `src/site/templates/layouts`
- Handlebar reusable template ada di folder `src/site/templates/partials`
- Handlebar template untuk masing-masing halaman ada di folder `src/site/pages`
