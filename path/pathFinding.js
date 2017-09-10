(function (exports) {
  'use strict';
  const ExtractInput = require('./extractInput').ExtractInput;
  const ShortestPath = require('./shortestPath').ShortestPath;

  var PathFinding = (function () {

    // variables related to return path
    var path = [],
        totalPosition = [],
        repeatedPosition = [],
        perCovered = [],
        totalNumber = 0,
        repeatedNumber = 0;

    // variables related to graph
    var start = {},
        end = {},
        emptyArray = [],
        graph = [],
        shortestPath = [];

    /**
     * Check if the node has any neighbor that is empty, not visited and not belongs to shortestPath
     *
     * @private
     * @param {number} i row index
     * @param {number} j col index
     * @param {Array} graph Distance matrix of the array.
     * @return {Array} The neighbors that are empty, not visited and not belongs to shortestPath
     */
    var checkNeighbor = function(i, j, graph){
      var rows = graph.length,
          cols = graph[0].length;
      var neighbor = [];

      if(i > 0 && graph[i - 1][j].isEmpty && !graph[i - 1][j].isShortest && !graph[i - 1][j].visited){
        neighbor.push(graph[i - 1][j]);
      }
      if(i < rows - 1 && graph[i + 1][j].isEmpty && !graph[i + 1][j].isShortest && !graph[i + 1][j].visited){
        neighbor.push(graph[i + 1][j]);
      }
      if(j > 0 && graph[i][j - 1].isEmpty && !graph[i][j - 1].isShortest && !graph[i][j - 1].visited){
        neighbor.push(graph[i][j - 1]);
      }
      if(j < cols - 1 && graph[i][j + 1].isEmpty && !graph[i][j + 1].isShortest && !graph[i][j + 1].visited){
        neighbor.push(graph[i][j + 1]);
      }

      return neighbor;
    }

    /**
     * markResult. Get the results to be returned
     *
     * @public
     * @param {vertice object} node
     *
     */
    var markResult = function(node){
      path.push(node);
      if(!graph[node.x][node.y].visited){
        graph[node.x][node.y].visited = true;
        totalNumber--;
      }else{
        repeatedNumber++;
      }
      totalPosition.push(totalNumber);
      repeatedPosition.push(repeatedNumber);
      perCovered.push(1 - totalNumber / emptyArray.length);
    }

    /**
     * recursionPath. Get side path
     *
     * @public
     * @param {vertice object} node
     * @param {vertice object[]} sideArray
     *
     */
    var recursionPath = function(node, sideArray) {
      markResult(node);
      var sideNeighbors = checkNeighbor(node.x, node.y, graph);
      if(sideNeighbors.length === 0){
        sideArray.reverse().forEach(sideNode => {
          markResult(sideNode);
        })
        return;

      }else if(sideNeighbors.length === 1) {
        sideArray.push(node);
        recursionPath(sideNeighbors[0], sideArray);

      }else{
        sideNeighbors.forEach(neighbor => {
          recursionPath(neighbor, [node]);
        })
        sideArray.reverse().forEach(sideNode => {
          markResult(sideNode);
        })
      }
    }


    /**
     * Pathfinding. Get shortest path from start to end
     *
     * @public
     * @param {String} fileName
     * @return {Object {graph, shortestPath}}
     *
     * @example
     * const Pathfinding = require('path-to/pathfinding').Pathfinding;
     * var Pathfinding = Pathfinding(path-to/filename);
     * returns {vertice object[]} path: array of path
     * returns {number[]} totalPosition: number of total positions array
     * returns {number[]} perCovered: percentage of the covered area array
     * returns {number[]} repeatedPosition: number of repeated positions array
     */
    return function (fileName) {

      var extractInput = ExtractInput(fileName);
      var shortestPath = ShortestPath(extractInput.start, extractInput.end, extractInput.graph);

      start = extractInput.start;
      end = extractInput.end;
      emptyArray = extractInput.emptyArr;
      graph = shortestPath.graph;
      shortestPath = shortestPath.shortestPath;
      totalNumber = emptyArray.length;

      for(var index = 0; index < shortestPath.length; index++){
        recursionPath(graph[shortestPath[index][0]][shortestPath[index][1]], []);
      }

      path = path.map(node => [node.x, node.y])
      console.log(path.length)

      return {
        path: path,
        totalPosition: totalPosition,
        repeatedPosition: repeatedPosition,
        perCovered: perCovered
      }
    }

  }());
  exports.PathFinding= PathFinding;
})(typeof window === 'undefined' ? module.exports : window);
