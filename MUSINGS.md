# Publishing a musing

Musings are built by Jekyll on GitHub Pages. To add one, create a Markdown
file in `_musings/` with front matter followed by the article text:

```markdown
---
layout: musing
title: "A musing title"
number: 3
author: Paul Tomes
author_label: Dad
date: 2026-12-01
subtitle: "A short description for the article header and search results."
excerpt: "A short description for the archive cards."
permalink: /musings/dad/2026/a-musing-title/
---

The opening paragraph.

## A section heading

More text.

> A passage displayed using the existing blockquote style.
```

Keep the permalink stable. The date determines the order of the cards and the
year archive link. The main and Dad listings update automatically; the 2026
archive includes Dad's 2026 musings. Create an archive page for a new year
before publishing a musing in that year. The article layout currently supports
Dad's collection; add an author-specific layout and archives before adding a
different family member.

Existing musings retain their original HTML bodies to preserve their markup.
Optional fields include `context` for a note below the article and
`title_emphasis: true` to render a bold article title.

To preview locally with Jekyll installed, run `jekyll serve` from the repository
root and visit the local address it prints. A plain static server does not
process front matter or Liquid templates. Do not publish until the generated
pages and archives have been reviewed.
