const commonRouter = require('express').Router();
const { getCountries } = require('../../controller/common/country-state-city');

commonRouter.get('/countries', getCountries);

module.exports = commonRouter;
