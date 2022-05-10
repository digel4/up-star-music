const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
    const minQuery = Artist
        .find({})
        // Returns an array of artists
        .sort({ yearsActive: 1 })
        // Sort that array into a ascending order of age
        .limit(1) // Still returns an array. An array of one
        .then(artists => artists[0].yearsActive);

    const maxQuery = Artist
        .find({})
        // Returns an array of artists
        .sort({ yearsActive: -1 })
        // Sort that array into a descending order of age
        .limit(1) // Still returns an array. An array of one
        .then(artists => artists[0].yearsActive);

        //because we have to separte promises we use promise.all
    return Promise.all([minQuery, maxQuery])
        .then((result) => {
            return { min: result[0], max: result[1] };
        });
};
