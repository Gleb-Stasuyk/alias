// scoreUtils.js

export const calculateRoundScore = (roundScores) => {
    return roundScores.reduce((acc, score) => acc + score, 0);
};

export const calculateTotalScore = (roundResults, currentTeam) => {
    return roundResults.reduce((acc, score, idx) => {
        if ((currentTeam === 'team1' && idx % 2 === 0) || (currentTeam === 'team2' && idx % 2 !== 0)) {
            return acc + score;
        }
        return acc;
    }, 0);
};
