(function (exports) {
  'use strict';
  const fs = require('fs'),
        path = require('path');

  var ExtractInput = (function () {

    /**
     * ExtractInput. Extract Json String Input to Graph
     *
     * @public
     * @param {String} fileName
     * @return {Object {start, end, graph, emptyArr}}
     *
     * @example
     * const ExtractInput = require('pathto/ExtractInput').ExtractInput;
     * const ExtractInput = ExtractInput(fileName);
     *
     * returns {vertice object} start: start postion node
     * start = vertice {
     *    index: 6,
     *    x: 1,
     *    y: 1,
     *    isEmpty: true,
     *    isShortest: false,
     *    visited: false,
     *    isStart: true,
     *    isEnd: false }
     *
     * returns {vertice object} end: end postion node
     * end = vertice {
     *    index: 13,
     *    x: 2,
     *    y: 3,
     *    isEmpty: true,
     *    isShortest: false,
     *    visited: false,
     *    isStart: false,
     *    isEnd: true }
     *
     * returns {vertice object[][]} graph: two demensional array of all the nodes
     * returns {vertice object[]} emptyArr: empty nodes array
     *
     */
    return function (fileName) {

      function vertice(index, x, y, isEmpty, isShortest, visited, isStart, isEnd) {
          this.index = index;
          this.x = x;
          this.y = y;
          this.isEmpty = isEmpty;
          this.isShortest = isShortest;
          this.visited = visited;
          this.isStart = isStart;
          this.isEnd = isEnd;
      }

      var chars = [],
          index = 0,
          emptyArr = [],
          start = {},
          end = {};

      var input = fs.readFileSync(__dirname + '/../' +fileName, 'utf8');
      chars = JSON.parse(input).split('\n').map(row => row.split(''));
      //console.log(chars);

      var graph = new Array(chars.length);

      for(var i = 0; i < chars.length; i++){
        graph[i] = new Array(chars[i].length);
        for(var j = 0; j < chars[i].length; j++){

          if(chars[i][j] === '#') {
            graph[i][j] = new vertice(index, i, j, false, false, false, false, false);
          }else if(chars[i][j] === 'S') {
            start = new vertice(index, i, j, true, false, false, true, false);
            graph[i][j] = start;
            emptyArr.push(start);
          }else if(chars[i][j] === 'E') {
            end = new vertice(index, i, j, true, false, false, false, true);
            graph[i][j] = end;
            emptyArr.push(end);
          }else{
            var node = new vertice(index, i, j, true, false, false, false, false);
            graph[i][j] = node;
            emptyArr.push(node);
          }

          index++;
        }
      }

      return {
        start: start,
        end: end,
        graph: graph,
        emptyArr: emptyArr
      }
    }

  }());
  exports.ExtractInput= ExtractInput;
})(typeof window === 'undefined' ? module.exports : window);
