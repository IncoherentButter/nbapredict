const QUADRATIC_SCALE_FACTOR = 1.0;

const getSumOfSquareDistances = (teams1, teams2) => {
    let sum = 0;
    teams1.forEach((team1, index1) => {
        teams2.forEach((team2, index2) => {
            if (team1.name === team2.name) {
                sum += QUADRATIC_SCALE_FACTOR * (index1 - index2) ** 2;
            }
        });
    });
    return sum;
};

export default getSumOfSquareDistances;
// const teams1 = [...array1];
// const teams2 = [...array2];
// const sum = getSumOfSquareDistances(teams1, teams2);