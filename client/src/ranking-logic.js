const QUADRATIC_SCALE_FACTOR = 1.0;
const LOGARITHMIC_SCALE_FACTOR = 1.0;

const getSumOfSquareDistances = (teams1, teams2) => {
    let sum = 0;
    let max = 0;
    teams1.forEach((team1, index1) => {
        teams2.forEach((team2, index2) => {
            if (team1.name === team2.name) {
                // sum += QUADRATIC_SCALE_FACTOR * (index1 - index2) ** 2;
                if (index1 != index2){
                    sum += LOGARITHMIC_SCALE_FACTOR * Math.abs(Math.log(Math.abs(index1 - index2)))
                }
            }
        });
    });
    sum /= 2;
    for (let i = 1; i < 8; i ++){
        max += 2 * Math.log(2*i)
    }
    let score = 100 * (1- (sum / max)) / 2; //divide by 2 because we're in only one conference

    return score;
};

export default getSumOfSquareDistances;
// const teams1 = [...array1];
// const teams2 = [...array2];
// const sum = getSumOfSquareDistances(teams1, teams2);