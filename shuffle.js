/**
 * This file is part of the Game of Life and Death JavaScript starter bot
 *
 * Last update: September 29, 2016
 *
 * @author Niko van Meurs
 * @License MIT License (http://opensource.org/Licenses/MIT)
 *
 */

function shuffle(source) {

    const shuffled = Array.from(source);
     
    for (var i = shuffled.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random() * (i+1)); 
        var itemAtIndex = shuffled[randomIndex]; 
         
        shuffled[randomIndex] = shuffled[i]; 
        shuffled[i] = itemAtIndex;
    }
    return shuffled;
}

module.exports = shuffle;
