(function (exports) {
  'use strict';
  const PF = require('pathfinding');

  var ShortestPath = (function () {
    /**
     * Pathfinding. Get shortest path from start to end
     *
     * @public
     * @param {vertice object} start start node
     * @param {vertice object} end end node
     * @param {vertice object[][]} graph graph
     * @return {Object {graph, shortestPath}}
     *
     * @example
     * const ShortestPath = require('./shortestPath').ShortestPath;
     * const shortestPath = ShortestPath(start, end, graph);
     * returns {vertice object[]} shortestPath: array of nodes belongs to shortestPath
     * returns {vertice object[][]} graph: two demensional array of all the nodes
     */
    return function (start, end, graph) {

      var finder = new PF.AStarFinder();

      var matrix = new Array(graph[0].length);
      for(var i = 0; i < graph[0].length; i++){
        matrix[i] = new Array(graph.length);
      }

      for(var i = 0; i < graph.length; i++){
        for(var j = 0; j < graph[0].length; j++){
            matrix[j][i] = graph[i][j].isEmpty? 0 : 1;
        }
      }
      //console.log(matrix)

      var grid = new PF.Grid(matrix);
      var shortestPath = finder.findPath(start.x, start.y, end.x, end.y, grid);

      shortestPath.forEach(node => {
        graph[node[0]][node[1]].isShortest = true;
      })

      return {
        shortestPath: shortestPath,
        graph: graph
      }
    }

  }());
  exports.ShortestPath= ShortestPath;
})(typeof window === 'undefined' ? module.exports : window);
