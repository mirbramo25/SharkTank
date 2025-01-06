// Function to fetch HTML from a URL
async function fetchHTML(url) {
  let request = new Request(url);
  let response = await request.loadString();
  return response;
}

// Function to generate the new href based on title and append extra string
const generateHref = (title, suffix, useSaf) => {
  const baseUrl = `${useSaf ? "x-safari-" : ""}https://www.google.com/search?q=`;
  // Remove duplicate spaces from the combined string
  const sanitizedString = (title + suffix).replace(/\s+/g, ' ').trim();
  return baseUrl + encodeURIComponent(sanitizedString);
};

// Function to truncate title at &#8211; if it exists (for href generation)
const getTruncatedTitle = (title) => {
  const dashIndex = title.indexOf(" &#8211;");
  if (dashIndex !== -1) {
    return title.slice(0, dashIndex); // Truncate title at &#8211;
  }
  return title;
};

// Function to remove periods from a string
const removePeriods = (str) => {
  return str.replace(/\./g, ''); // Remove periods
};

// Function to decode HTML entities and remove &#8211 and periods;
const decodeEntities = (title) => {
  return title
    .replace(/&#8217;/g, "'")  // Replace apostrophes
    .replace(/&#038;/g, "and")  // Replace ampersands
    .replace(/ &#8211;/g, "")    // Remove &#8211;
    .replace(/\./g, "");        // Remove periods
};

// Function to decode HTML entities
//const decodeEntities = (title) => {
 // return title.replace(/&#8217;/g, "'").replace(/&#038;/g, "and");
//};

// Main function to modify HTML
async function modifyHTML(theHtml, useSaf, titleDict) {
  // Fetch the HTML from the passed URL
  let htmlContent = theHtml;

  // Remove everything after <!-- /.td-main-content-wrap -->
  const splitIndex = htmlContent.indexOf("<!-- /.td-main-content-wrap -->");
  if (splitIndex !== -1) {
    htmlContent = htmlContent.slice(0, splitIndex);
  }

  // Update all <a class="td-main-logo" href="..."> elements
  htmlContent = htmlContent.replace(
    /<a class="td-main-logo" href="https:\/\/allsharktankproducts\.com\/"/g,
    `<a class="td-main-logo" href="https://st-reddit.netlify.app"`
  );

  // Modify the <title> tag to reflect the season number (e.g., S9)
  htmlContent = htmlContent.replace(/<title>.*Season\s*(\d{1,2}).*<\/title>/, (match, seasonNumber) => {
    const suffix = useSaf ? '-saf' : ''; // Append '-saf' if useSaf is true
    return `<title>S${seasonNumber}${suffix}</title>`;
  });

  // Array to store second link titles and truncated titles
  let secondLinkTitles = [];
  let truncTitles = [];

  // Modify <a> tags in td-module-thumb divs (first link)
  htmlContent = htmlContent.replace(/<div class="td-module-thumb"><a href="([^"]+)"[^>]*title="([^"]+)"/g, (match, originalHref, title) => {
    const truncatedTitle = getTruncatedTitle(title); // Get the truncated title for the href
const cleanedTitle = decodeEntities(removePeriods(truncatedTitle));
    return match.replace(originalHref, generateHref(cleanedTitle, " shark tank", useSaf));
  });

  // Modify <a> tags in h3.entry-title td-module-title (second link) and duplicate them
  htmlContent = htmlContent.replace(/(<h3 class="entry-title td-module-title">.*?<a href="([^"]+)"[^>]*title="([^"]+)".*?<\/a>.*?<\/h3>)/g, (match, fullMatch, originalHref, title) => {
    const truncatedTitle = getTruncatedTitle(title); // Get the truncated title for the href
    secondLinkTitles.push(title); // Collect second link titles (unmodified)
    truncTitles.push(truncatedTitle); // Collect truncated titles used for href generation

    // Remove periods from truncated title and decode HTML entities
    const cleanedTitle = decodeEntities(removePeriods(truncatedTitle));

    // If titleDict exists and has a value for the cleaned title
    const newHref = titleDict && titleDict[cleanedTitle] ? titleDict[cleanedTitle] : null;

    // The first instance of the second link remains unchanged and is always included
    let modifiedLink = fullMatch.replace(originalHref, generateHref(cleanedTitle, " shark tank reddit", false));

    // Append " SEARCH" to the display text of the modified link
    modifiedLink = modifiedLink.replace(/>([^<]+)<\/a>/, (match, displayText) => {
      return `>${displayText} SEARCH</a>`; // Add " SEARCH" to the existing display text
    });

    // Create duplicated link only if valid href is found
    let duplicatedLink = '';
    if (newHref && newHref.trim() !== "") {
      // Modify the duplicated link with the new href and update the displayed text to the truncated title + " Reddit"
      duplicatedLink = fullMatch.replace(originalHref, newHref).replace(/>[^<]+</, `>${removePeriods(truncatedTitle)} REDDIT<`);
    }

    // Generate the recap link with the new format wrapped in h3 tags, same as the other links
    const recapLinkHref = `updates.html?name=${encodeURIComponent(cleanedTitle)}`;
    const recapLink = `<h3 class="entry-title td-module-title"><a href="${recapLinkHref}">${removePeriods(truncatedTitle)} UPDATE</a></h3>`;

    return modifiedLink + duplicatedLink + recapLink; // Append the duplicated link (if valid) and recap link wrapped in <h3>
  });

  // Set the modified HTML and second link titles as output of the Shortcut
  const output = {
    html: htmlContent,
    titles: secondLinkTitles,
    truncTitles: truncTitles, // Add truncated titles to the output
  };

  Script.setShortcutOutput(output); // Output both HTML and titles
  Script.complete();
}

// Call the main function with the provided URL and conditional flag
let input = args.shortcutParameter; // The dict passed from the Shortcuts app
let theHtml = input["html"];
let url = input["url"]; // First item: URL
let useSaf = input["icab"]; // Second item: "Yes" or something else
let titleDict = input["reddit"]  ? input["reddit"] : null; // Third item: dictionary of titles if exists

modifyHTML(theHtml, useSaf, titleDict).catch(error => {
  console.error(error);
  Script.complete();
});