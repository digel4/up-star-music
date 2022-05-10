const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
    const minQuery = Artist
    .find({})
    // Returns an array of artists
    .sort({ age: 1 })
    // Sort that array into a ascending order of age
    .limit(1) // Still returns an array. An array of one
    .then(artists => artists[0].age);

    const maxQuery = Artist
        .find({})
        // Returns an array of artists
        .sort({ age: -1 })
        // Sort that array into a descending order of age
        .limit(1) // Still returns an array. An array of one
        .then(artists => artists[0].age);

        //because we have to separte promises we use promise.all
    return Promise.all([minQuery, maxQuery])
        .then((result) => {
            return { min: result[0], max: result[1] };
        });
};
