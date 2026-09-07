/* ============================================================
   GALLERY
   Two ways to put photos on the site. Use either, or both.
   ============================================================ */


/* ------------------------------------------------------------
   1. YOUR OWN PHOTO FILES  (simplest)

   Put image files in:  assets/img/gallery/
   Then add a line here for each one.

   `src`     the filename inside assets/img/gallery/
   `caption` optional text shown under the photo

   Example:
     { src: "baton-rouge.jpg", caption: "Baton Rouge, spring 2026" },
   ------------------------------------------------------------ */
var PHOTOS = [
  // { src: "my-photo.jpg", caption: "Somewhere worth remembering" },
];


/* ------------------------------------------------------------
   2. LIVE POSTS FROM INSTAGRAM / FACEBOOK

   These render straight from Instagram's and Facebook's own
   servers — nothing is copied onto this site.

   To get a link:
     Instagram — open the post, tap "..." , choose Embed,
                 copy the URL (or just copy the post's own link)
     Facebook  — open the post, click "...", choose Embed,
                 copy the URL shown

   Paste one URL per line, each in quotes, ending with a comma.
   ------------------------------------------------------------ */
var INSTAGRAM_POSTS = [
  // "https://www.instagram.com/p/XXXXXXXXXXX/",
];

var FACEBOOK_POSTS = [
  // "https://www.facebook.com/debajyotiDJD/posts/xxxxxxxxxxxxxxx",
];


/* ------------------------------------------------------------
   3. YOUR PROFILE PICTURE FOR EACH NETWORK

   Save each one in:  assets/img/social/
   using exactly these filenames:

     assets/img/social/instagram.jpg
     assets/img/social/facebook.jpg
     assets/img/social/linkedin.jpg

   (.png works too — just change the name below to match.)

   To grab one: open your profile, right-click the picture and
   "Save image as", or take a screenshot and crop it square.
   Square images look best; anything else gets centre-cropped.

   If a file is missing the card quietly falls back to your main
   site portrait, so nothing ever shows as a broken image.
   ------------------------------------------------------------ */
var GALLERY_PROFILES = {
  instagram: {
    url: "https://www.instagram.com/debajyoti_djd/",
    handle: "@debajyoti_djd",
    avatar: "instagram.jpg"
  },
  facebook: {
    url: "https://www.facebook.com/debajyotiDJD",
    handle: "Debajyoti Deb",
    avatar: "facebook.jpg"
  },
  linkedin: {
    url: "https://www.linkedin.com/in/deb-debajyoti",
    handle: "deb-debajyoti",
    avatar: "linkedin.jpg"
  }
};
