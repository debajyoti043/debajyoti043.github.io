Put your photo files in this folder (.jpg, .png or .webp).

Then open  assets/js/gallery-posts.js  and add one line per photo
inside the PHOTOS list, for example:

  var PHOTOS = [
    { src: "baton-rouge.jpg", caption: "Baton Rouge, spring 2026" },
    { src: "lab.jpg",         caption: "" },
  ];

- src     = the filename exactly as it appears in this folder
- caption = optional; leave it as "" for no caption

Resize large photos before adding them (squoosh.app is good) —
around 1600px wide is plenty for a web gallery.
