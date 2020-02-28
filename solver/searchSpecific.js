
function heuristic(node, goal) {
  let d1 = Math.abs(node.position.x - goal.position.x);
  let d2 = Math.abs(node.position.y - goal.position.y);

  return (d1 + d2);
}

/**
 * Changes a node's predecessor, as well as it's gcost.
 * 
 * @param {Node} node      The node whose predecessor will be changed.
 * 
 * @param {Node} newPredecessor The new parant to the node mentioned above.
 * 
 * 
 * @returns {Node} The node whose predecessor was changed.
 */
function setPredecessor(node, newPredecessor) {
  // if newPredecessor is null, do nothing
  if (newPredecessor) {
    node.predecessor = newPredecessor;
    node.gcost = newPredecessor.gcost + 1;
  }

  return node;
}

/**
 * This function will call the general search funtion with the correct parameters so that it
 * performs the A* search on the grid.
 * 
 * @param {*} start     The starting node of the search.
 * 
 * @param {*} end       The end node of the search.
 * 
 * @param {*} openSet   A heap that prioritizes nodes with the smallest fcost.
 * 
 * @param {*} sleepTime The amt of time in milliseconds that the algorithm will stop after each
 *                      iteration of the search. This slows down the process to make it easier for
 *                      us to see it happen.
 * 
 * 
 * @returns {Object} The result of the search. It consists of a boolean value representing whether
 *                   the search was successful of not, and the time (in seconds) taken to run the
 *                   search.
 */
async function aStar(start, end, openSet, sleepTime) {
  // setting the correct priority function of the heap
  // since the heap is always a max heap, the scores are inverted so that the smaller fcosts get
  // greater priority
  openSet.priorityOf = a => a.fcost() * -1;
  // setting the correct update function for the heap
  openSet.update = setPredecessor;

  // marking the starting time of the search
  const startTime = millis();
  // doing the actual search
  const searchRes = await search(start, end, openSet, heuristic, sleepTime);
  // marking the end time of the search
  const endTime = millis();

  // creating the result object
  let result = {
    found: searchRes, // whether or not the search was successful
    timeTaken: (endTime - startTime) / 1000 // time taken to do it
  };

  finishedSolving = true;

  return result;
}