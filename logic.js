/**
 * This file is part of the Booking.com Hack-man JavaScript starter bot
 *
 * Last update: September 29, 2016
 *
 * @author Niko van Meurs <niko@riddles.io>
 * @License MIT License (http://opensource.org/Licenses/MIT)
 */

/**
 * Returns the amount of living cells for the passed state
 * 
 * @param {Object} state
 * @returns {Number}
 */

function countLivingCells(state) {
    return state.field.reduce((acc, cell) => !isEmpty(cell) ? acc + 1 : acc, 0);
}

/**
 * Returns the amount of living cells for the passed state
 * 
 * @param {Object} state
 * @returns {Number}
 */

function countLivingCellsForPlayer(state, player_id) {
    return state.field.reduce((acc, cell) => isOwnedBy(cell, player_id) ? acc + 1 : acc, 0);
}

/**
 * Checks whether the coordinate is within the game field dimensions
 *
 * @param {Object} settings
 * @param {{ x:Number, y:Number }} coordinate
 * @returns {boolean}
 */
function isInBounds(settings, coordinate) {

    if (0 >= coordinate.x || coordinate.x >= settings.field_width) {
        return false;
    }

    if (0 >= coordinate.y || coordinate.y >= settings.field_height) {
        return false;
    }

    return true;
}

/**
 * Returns a list of all valid moves types, including pass
 *
 * @param {Object} gameSettings The bot's game settings
 * @param {Object} state        The game state for which to calculate the available moves
 * @returns {Array}             List of available moves
 */
function getAvailableMoveTypes(gameSettings, state) {


    const availableMoveTypes = ['pass'];

    if (countLivingCells(state) > 0) {
        availableMoveTypes.push('kill');
    }

    if (countLivingCellsForPlayer(state, gameSettings.your_botid) > 1) {
        availableMoveTypes.push('birth');
    }

    return availableMoveTypes;
}

/**
 * Returns the field size
 * @param {Object} settings
 * @returns {Number}
 */
function getFieldSize(settings) {
    const fieldWidth = parseInt(settings.field_width, 10);
    const fieldHeight = parseInt(settings.field_height, 10);

    return fieldWidth * fieldHeight;
}

/**
 * Returns the coordinates for all dead cells in the passed state
 * @param {Object} settings
 * @param {Object} state 
 */
function getDeadCellCoordinates(settings, state) {
    return state.field.reduce((acc, cell, idx) => {
        if (!isEmpty(cell)) {
            return acc;
        }

        return acc.concat(indexToCoordinate(settings, idx));
    }, []);
}

/**
 * Returns the coordinates for all living cells in the passed state
 * @param {Object} settings
 * @param {Object} state 
 */
function getLivingCellCoordinates(settings, state) {
    return state.field.reduce((acc, cell, idx) => {
        if (isEmpty(cell)) {
            return acc;
        }

        return acc.concat(indexToCoordinate(settings, idx));
    }, []);
}

/**
 * Returns the coordinates for all living cells in the passed state
 * @param {Object} settings
 * @param {Object} state
 * @param {String} playerId
 */
function getLivingCellCoordinatesForPlayer(settings, state, playerId) {
    return state.field.reduce((acc, cell, idx) => {
        if (!isOwnedBy(cell, playerId)) {
            return acc;
        }

        return acc.concat(indexToCoordinate(settings, idx));
    }, []);
}

/**
 * Returns a coordinate for the given state.fields array index
 *
 * @param {Object} settings The bot's settings object
 * @param {Number} index
 * @returns {{ x:Number, y:Number } | null}
 */
function indexToCoordinate(settings, index) {
    if (index >= getFieldSize(settings)) {
        process.stderr.write('index > fieldsize\n')
        return null;
    }

    const fieldWidth = parseInt(settings.field_width, 10);

    const x = index % fieldWidth;
    const y = Math.floor(index / fieldWidth);

    return { x: x, y: y };
}

/**
 * Returns true if the passed cell is empty, false otherwise
 * 
 * @param {String} cell
 * @returns {Boolean}
 */
function isEmpty(cell) {
    return cell === '.';
}

/**
 * Returns true if the passed cell is empty, false otherwise
 * 
 * @param {String} cell
 * @returns {String} player_id
 */
function isOwnedBy(cell, player_id) {
    return cell === player_id;
}

/**
 * Returns the index for the fields array for the given coordinate
 *
 * @param {Object}                 settings   The bot's settings object
 * @param {{ x:Number, y:Number }} coordinate
 * @returns {Number}
 */
function coordinateToIndex(settings, coordinate) {

    if (!isInBounds(settings, coordinate)) {
        return -1;
    }

    const fieldWidth = settings.field_width;

    return coordinate.y * fieldWidth + coordinate.x;
}

module.exports = {
    countLivingCells,
    countLivingCellsForPlayer,
    isInBounds,
    getAvailableMoveTypes,
    getFieldSize,
    getDeadCellCoordinates,
    getLivingCellCoordinates,
    getLivingCellCoordinatesForPlayer,
    indexToCoordinate,
    coordinateToIndex
};
