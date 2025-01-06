// Function to fetch HTML from a URL
async function fetchHTML(url) {
  const request = new Request(url);
  return await request.loadString();
}

// Function to generate an href URL
const generateHref = (title, suffix, useSaf) => {
  const baseUrl = `${useSaf ? "x-safari-" : ""}https://www.google.com/search?q=`;
  const sanitizedString = (title + suffix).replace(/\s+/g, ' ').trim();
  return baseUrl + encodeURIComponent(sanitizedString);
};

// Function to decode entities, remove `&#8211;`, and remove periods
const cleanTitle = (title) => {
  return title
    .replace(/&#8217;/g, "'")
    .replace(/&#038;/g, "and")
    .replace(/ &#8211;/g, "")
    .replace(/\./g, "");
};

// Main function to modify HTML
async function modifyHTML(html, useSaf, titleDict) {
  // Truncate HTML at `<!-- /.td-main-content-wrap -->`
  const truncatePoint = html.indexOf("<!-- /.td-main-content-wrap -->");
  if (truncatePoint !== -1) {
    html = html.slice(0, truncatePoint);
  }

  // Replace specific logo href
  html = html.replace(
    /<a class="td-main-logo" href="https:\/\/allsharktankproducts\.com\/"/g,
    `<a class="td-main-logo" href="https://st-reddit.netlify.app"`
  );

  // Modify the `<title>` tag
  html = html.replace(/<title>.*Season\s*(\d{1,2}).*<\/title>/, (match, seasonNumber) => {
    return `<title>S${seasonNumber}${useSaf ? "-saf" : ""}</title>`;
  });

  // Process `<div class="td-module-thumb">` blocks
  html = html.replace(
    /<div class="td-module-thumb"><a href="([^"]+)"[^>]*title="([^"]+)"/g,
    (match, originalHref, title) => {
      const truncatedTitle = cleanTitle(title);
      const newHref = generateHref(truncatedTitle, " shark tank", useSaf);
      return match.replace(originalHref, newHref);
    }
  );

  // Process `<h3 class="entry-title td-module-title">` blocks
  html = html.replace(
    /<h3 class="entry-title td-module-title">.*?<a href="([^"]+)"[^>]*title="([^"]+)".*?<\/a>.*?<\/h3>/g,
    (match, originalHref, title) => {
      const truncatedTitle = cleanTitle(title);
      const originalTitle = title.replace(/ &#8211;/g, ""); // Keep original display text
      const redditHref = titleDict && titleDict[truncatedTitle] ? titleDict[truncatedTitle] : null;

      // Generate new links
      const searchHref = generateHref(truncatedTitle, " shark tank reddit", false);
      const recapHref = `updates.html?name=${encodeURIComponent(truncatedTitle)}`;

      // Modified link with "SEARCH"
      let updatedLink = `<h3 class="entry-title td-module-title"><a href="${searchHref}" rel="bookmark" title="${title}">${originalTitle} SEARCH</a></h3>`;

      // Duplicate link with "REDDIT"
      if (redditHref) {
        updatedLink += `<h3 class="entry-title td-module-title"><a href="${redditHref}" rel="bookmark" title="${title}">${truncatedTitle} REDDIT</a></h3>`;
      }

      // Recap link
      updatedLink += `<h3 class="entry-title td-module-title"><a href="${recapHref}">${truncatedTitle} UPDATE</a></h3>`;

      return updatedLink;
    }
  );

  // Set the modified HTML as the output of the Shortcut
  Script.setShortcutOutput(html);
  Script.complete();
}

// Call the main function
let input = args.shortcutParameter; // Input passed from Shortcuts
let html = input["html"];
let useSaf = input["icab"]; // `true` or `false`
let titleDict = input["reddit"] || null;

modifyHTML(html, useSaf, titleDict).catch((error) => {
  console.error(error);
  Script.complete();
});