const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const geoStatsAPIKey = process.env.GEO_API_KEY || '';

async function getCountries (req, res) {
  // get countries from RapidAPI
  // get all the necessary keys from dotenv

  if (!geoStatsAPIKey) {
    res.status(400);
    res.json({
      error: true,
      stage: 1,
      message: 'No API key or host or URL found'
    });

    return;
  }

  try {
    const response = await fetch(`http://battuta.medunes.net/api/country/all/?key=${geoStatsAPIKey}`);
    const result = await response.json();
    if (result) {
      res.status(200);
      res.json(result);
      return;
    }

    res.status(400);
    res.json({
      error: true,
      message: 'Error while fetching countries'
    });
    return;
  } catch (error) {
    res.status(500);
    res.json({
      error: true,
      stage: 2,
      message: 'Server error encountered'
    });
  }
};

async function getAllRegionsOfCountry (req, res) {
  if (!geoStatsAPIKey) {
    res.status(400);
    res.json({
      error: true,
      stage: 1,
      message: 'No API key or host or URL found'
    });

    return;
  }

  if (!req || !req?.body) {
    res.status(400);
    res.json({
      error: true,
      message: 'No request body found'
    });
    return;
  }

  const countryCode = req.body?.countryCode?.toLowerCase() || '';

  if (!countryCode) {
    res.status(400);
    res.json({
      error: true,
      message: 'No countryCode provided'
    });
    return;
  }

  try {
    const response = await fetch(`http://battuta.medunes.net/api/region/${countryCode}/all/?key=${geoStatsAPIKey}`);
    const result = await response.json();
    if (result) {
      res.status(200);
      res.json(result);
      return;
    }

    res.status(400);
    res.json({
      error: true,
      message: 'Error while fetching countries'
    });
    return;
  } catch (error) {
    res.status(500);
    res.json({
      error: true,
      stage: 2,
      message: 'Server error encountered'
    });
  }
};

module.exports = { getCountries, getAllRegionsOfCountry };
