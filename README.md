# The Writing Room

A static, typewriter-style essay archive based on the supplied reference screenshot. Contains the 2026 essay “A guide to navigating the modern day world - Consumption” by Patrick Amberson.

## Run

From this directory, run `python3 -m http.server 8000 --bind 0.0.0.0`. No dependencies or build step are needed.

## Add essays

Edit the `essays` array in `assets/app.js`. Each article needs a unique, stable `slug`, `title`, `category`, `year`, `date`, `intro`, and an array of `paragraphs`. Optional `author` adds a byline. Optional `sections` contain a `title` and `paragraphs` and display as a numbered list. Use `**text**` for bold emphasis within paragraphs. Years and essay counts are generated automatically. Add entries in your preferred reading order; years appear newest first.

The top navigation shows years and the essays within the selected year. Menu provides a searchable index grouped into collapsible years, with article counts and the current article marked. Search matches titles, categories, years, and article text across the whole archive. A link to another year selects that year automatically. No backend or search service is needed.

The gallery uses the supplied stock exchange, automata, and 1935 banknote images, in that order. Update the `gallery` array in `assets/app.js` to change images or captions. Styles live in `assets/style.css`, and page markup in `index.html`.

## Publish

Deploy this folder to any static host. With GitHub Pages, push the files, then select Settings → Pages → Deploy from a branch → main / (root). No build command is needed.
