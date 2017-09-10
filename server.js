const pathFinding = require('./path/pathfinding').PathFinding;
const pathResults = pathFinding("input.json");
console.log('result Path ', pathResults.path)
console.log('result Total', pathResults.totalPosition)
console.log('result Repet', pathResults.repeatedPosition)
console.log('result Perct', pathResults.perCovered)
