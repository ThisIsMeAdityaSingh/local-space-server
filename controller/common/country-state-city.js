const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const rapidAPIKey = process.env.X_RapidAPI_Key || '';
const rapidAPIHost = process.env.X_RapidAPI_Host || '';
const rapidAPIUrl = process.env.X_RapidAPI_Geo_URL || '';

async function getCountries (req, res) {
  // get countries from RapidAPI
  // get all the necessary keys from dotenv

  if (!rapidAPIHost || !rapidAPIKey || !rapidAPIUrl) {
    res.status(400);
    res.json({
      error: true,
      stage: 1,
      message: 'No API key or host or URL found'
    });

    return;
  }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': rapidAPIKey,
      'X-RapidAPI-Host': rapidAPIHost
    }
  };

  try {
    const result = await fetch(rapidAPIUrl, options);
    const response = await result.json();

    if (response?.data) {
      res.status(200);
      res.json(response.data);
      return;
    }

    res.status(400);
    res.status({
      error: true,
      message: 'Unable to get response at the moment'
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

module.exports = { getCountries };
