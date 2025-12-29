import SerpApi from "google-search-results-nodejs";

export async function googleSearch(query, apiKey) {
  const search = new SerpApi.GoogleSearch(apiKey);

  return new Promise((resolve, reject) => {
    search.json({ q: query }, (result) => {
      if (!result.organic_results) {
        console.log("⚠ No search results:", query);
        return resolve([]);
      }

      const links = result.organic_results
        .filter(r => r.link)
        .map(r => r.link)
        .slice(0, 2);

      resolve(links);
    });
  });
}
