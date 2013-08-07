/* Binary Search Tree implemented in JavaScript by Richard Brown */

function BinarySearchTree() {
  this._root = null;
}

BinarySearchTree.prototype = {
	constructor: BinarySearchTree,
	
	//Adds a new node to the tree, returns true if successful, false if node already exists
  add: function(value) {
		var success = false;
		
		//Used to track position in tree
		var current = null;
		
		//create new node
		var node = {
			value: value,
			left: null,
			right: null
		};
		
		//When the tree is empty, set the root node to this one
		if (this._root === null) {
			this._root = node;
		} else {
			//Start at root and find appropriate place to insert new node
			current = this._root;

			while (true) {
				//If smaller, move left
				if (node.value < current.value) {
					
					//If the left node is null, insert new node there
					if (current.left === null) {
						current.left = node;
						success = true;
						break;
					
					//Otherwise traverse the tree
					} else {
						current = current.left;
					}
				
				//If larger, move right
				} else if (node.value > current.value) {
				
					//If the right node is null, insert new node there
					if (current.right === null) {
						current.right = node;
						success = true;
						break;
						
					//Otherwise traverse the tree
					} else {
						current = current.right;
					}
				
				//If node already exists, just ignore and break
				} else {
					success = false;
					break;
				}
			}
		}
		
		return success;
	},
	
	//Returns true or false if value exists in tree
	contains: function(value) {
		var valueFound = false;
		var current = this._root;
		
		while (valueFound === false && current !== null) {
		
			//Navigate the tree
			if (value < current.value) {
				current = current.left;
			} else if (value > current.value) {
				current = current.right;
				
			//values are the same, so we found it!
			} else {
				valueFound = true;
			}
		}
		
		return valueFound;
	},
	
	//Removes a node from the tree with value, returns true if successful
	remove: function(value) {
		var removeSuccessful = false;
		var parent = null;
		var current = this._root;
		
		//Traverse to the node to be deleted, if the current node becomes null, it doesn't exist
		while (current !== null) {
		
			//Move to left node
			if (value < current.value) {
				parent = current;
				current = current.left;
				
			//Move to right node
			} else if (value > current.value) {
				parent = current;
				current = current.right;
				
			//Found it, delete it
			} else {
				//No children means simple delete
				if (current.left === null && current.right === null) {
					if (parent.left === current) {
						parent.left = null;
					} else {
						parent.right = null;
					}
				
				//Left node has value, but right does not
				} else if (current.left != null && current.right === null) {
					if (parent.left === current) {
						parent.left = current.left;
					} else {
						parent.right = current.left;
					}
				
				//right node has value, but left does not
				} else if (current.left === null && current.right != null) {
					if (parent.left === current) {
						parent.left = current.right;
					} else {
						parent.right = current.right;
					}
				
				//Nodes to the left and right of node to be deleted
				} else {
					var minElementParent = current;
					var minElement = current.right;
					
					//find the minimum node on the right sub-tree
					while (minElement.left != null) {
						minElementParent = minElement;
						minElement = minElement.left;
					}
					
					//swap value values with node to be deleted
					current.value = minElement.value;
					
					//delete the swapped node
					minElementParent.left = null;
				}
				
				removeSuccessful = true;
				break;
			}
		}
		
		return removeSuccessful;
	},
	
	//Function to traverse tree and call a function on each node
	traverse: function(callback) {
	
		//Will traverse the tree from left to right, executing the function on each node
		function inOrder(node) {
			if (node === null) {
				return
			}
			
			inOrder(node.left);
			
			callback.call(this, node);
			
			inOrder(node.right);
		}
		
		//Only when the callback provided is a valid function do we check
		if (callback && typeof(callback) == "function") {
			inOrder(this._root);
		}
	},
	
	//Returns a count of nodes in the tree
	size: function() {
		var nodeCount = 0;
		
		traverse(function() {
			nodeCount++;
		});
		
		return nodeCount;
	},
	
	//Returns an array of all node values in the tree
	toArray: function() {
		var nodeArray = [];
		
		traverse(function(node) {
			nodeArray.push(node.value);
		});
		
		return nodeArray;
	},
	
	//Returns a string representation of the tree
	toString: function() {
		return this.toArray().toString();
	}
}
