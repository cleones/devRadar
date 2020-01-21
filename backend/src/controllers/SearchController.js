const Dev = require('../models/Dev');
const parserStringAsArray = require('../utils/parserStringAsArray');

module.exports = {
    async index(request, response) {
        const { latitude,longitude,techs } = request.query;
        const arrayTechs = parserStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: arrayTechs
            },
            location: {
                $near: {
                  $geometry: {
                      type: 'Point',
                      coordinates: [longitude, latitude]
                  },
                  $maxDistance: 1000,
                }
            }
        })
        response.json(devs);
    }
};
