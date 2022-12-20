const commonRouter = require('express').Router();
const { getCountries, getAllRegionsOfCountry } = require('../../controller/common/country-state-city');

commonRouter.get('/countries', getCountries);
commonRouter.post('/countries/region', getAllRegionsOfCountry);

module.exports = commonRouter;
