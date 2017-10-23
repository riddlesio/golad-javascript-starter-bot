/**
 * This file is part of the Game of Life and Death JavaScript starter bot
 *
 * Last update: September 29, 2016
 *
 * @author Niko van Meurs <niko@riddles.io>
 * @License MIT License (http://opensource.org/Licenses/MIT)
 */
const logic = require('../logic');
const shuffle = require('../shuffle');

/**
 * This class defines a strategy which returns a random but valid move.
 * Copy this class and replace the execute function to define your own.
 */
class RandomMoveStrategy {

    /**
     * Executes the RandomMoveStrategy
     *
     * @param {Object} gameSettings The bot's game settings
     * @param {Object} state        The state for which a move should be calculated (usually Bot.state)
     *
     * @returns {String} either a 'birth' move, a 'kill' move or 'pass'
     */
    execute(gameSettings, state) {
        const availableMoveTypes = logic.getAvailableMoveTypes(gameSettings, state);
        const moveType = shuffle(availableMoveTypes)[0];

        if (moveType === 'birth') {
            const deadCells = logic.getDeadCellCoordinates(gameSettings, state);
            const deadCoordinate = shuffle(deadCells)[0];

            const ownCells = logic.getLivingCellCoordinatesForPlayer(gameSettings, state, gameSettings.your_botid);
            const shuffledOwnCells = shuffle(ownCells);

            const randomOwnCell1 = shuffledOwnCells[0];
            const randomOwnCell2 = shuffledOwnCells[1];

            return `birth ${deadCoordinate.x},${deadCoordinate.y} ${randomOwnCell1.x},${randomOwnCell1.y} ${randomOwnCell2.x},${randomOwnCell2.y}`;
        }

        if (moveType === 'kill') {
            const livingCells = logic.getLivingCellCoordinates(gameSettings, state);
            const randomIndex = Math.floor(Math.random() * livingCells.length);
            const coordinate = livingCells[randomIndex];

            return `kill ${coordinate.x},${coordinate.y}`;
        }

        return 'pass';
    }
}

module.exports = RandomMoveStrategy;
