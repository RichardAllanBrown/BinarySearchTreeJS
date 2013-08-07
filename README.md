BinaryTreeJS
============

A Binary Search Tree implemented using JavaScript.

```
/*Create a tree*/
var tree = new BinarySearchTree();

/*Add: returns true if successful, else false*/
tree.add(5);

/*Contains: returns true if found, else false*/
tree.contains(5);

/*Remove: returns true if successfully removed, else false if it doesn't exist*/
tree.remove(5);

/*Traverse: accepts a function and performs it on each node*/
tree.traverse(function(node) {node.value = node.value * 2});

/*Size: returns count of elements*/
tree.size();

/*toArray: returns the tree in array
tree.toArray();

/*toString: returns the tree in a string*/
tree.toString();
```
