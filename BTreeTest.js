/* A Super Simple Test Runner */
function testRunner() {
	this.tests = [];
	this.passedCount = 0;
}

testRunner.prototype = {
	constructor: testRunner,
	
	assertEqual: function(expected, result, description) {
		passed = false;
		
		if(expected == result) {
			passed = true;
			this.passedCount++;
		}
		
		this.tests.push( { testDesc: description, testResult: passed } );
	},
	
	assertTrue: function(result, description) {
		passed = false;
		
		if(result === true) {
			passed = true;
			this.passedCount++;
		}
		
		this.tests.push( { testDesc: description, testResult: passed } );
	},
	
	assertFalse: function(result, description) {
		passed = false;
		
		if(result === false) {
			passed = true;
			this.passedCount++;
		}
		
		this.tests.push( { testDesc: description, testResult: passed } );
	},
	
	printResults: function() {
		console.log("   +++ Test Results +++   ");
		console.log(this.tests.length + " tests run");
		console.log(this.passedCount + " tests passed");
		
		console.log("   === Test Details ===   ");
		for(var i = 0; i < this.tests.length; i++) {
			console.log(this.tests[i].testResult + " | " + this.tests[i].testDesc);
		}
	}
}

/* Tests for Binary Search Tree */
var test = new testRunner();

/* Tree with many values */
var tree = new BinarySearchTree();

/* Can add new values */
test.assertTrue(tree.add(3), "Adding 3 to tree successfully.");
tree.add(10);
tree.add(7);
tree.add(1);
tree.add(5);

/* Correctly asserts it contains values */
test.assertTrue(tree.contains(7), "Tree can tell if it contains a value.");
test.assertFalse(tree.contains(12), "Tree can tell if it doesn't contain a value.");

/* Cannot add a duplicate value to tree */
test.assertFalse(tree.add(7), "Cannot add same value again");

/* Size, toArray and toString work as expected */
test.assertEqual(5, tree.size(), "A different tree size is correctly identified.");
test.assertEqual("1,3,5,7,10", tree.toString(), "toString method correctly prints out the tree.");

var result = tree.toArray();
test.assertEqual(5, result.length, "toArray returns the correct length array.");
test.assertTrue(result.indexOf(1) > -1, "toArray returns array with 1 in it.");
test.assertTrue(result.indexOf(3) > -1, "toArray returns array with 3 in it.");
test.assertTrue(result.indexOf(5) > -1, "toArray returns array with 5 in it.");
test.assertTrue(result.indexOf(7) > -1, "toArray returns array with 7 in it.");
test.assertTrue(result.indexOf(10) > -1, "toArray returns array with 10 in it.");

/* Tree can have elements removed from it */
test.assertFalse(tree.remove(8), "Cannot remove object that does not exist.");
test.assertTrue(tree.remove(1), "Can remove a leaf node.");
test.assertEqual(4, tree.size(), "Tree size updates correctly when leaf node is removed");

test.assertTrue(tree.remove(10), "Tree updates when node with one child is deleted.");
test.assertEqual(3, tree.size(), "Tree size correctly updates after node with one child deleted.");

/* Can delete root element */
var tree = new BinarySearchTree();
tree.add(1);
test.assertTrue(tree.remove(1), "Can remove root node of tree with 1 element");
test.assertEqual(0, tree.size(), "Tree is empty when root node is only node and is removed");

/* Creating a larger more complex tree */
var tree = new BinarySearchTree();
tree.add(10);
tree.add(5);
tree.add(3);
tree.add(7);
tree.add(15);
tree.add(17);
tree.add(14);
tree.add(12);
tree.add(18);

test.assertTrue(tree.remove(15), "Tree can perform a remove on a node with 2 children.");
test.assertEqual(8, tree.size(), "Tree size is correct after complex delete.");
test.assertEqual("3,5,7,10,12,14,17,18", tree.toString(), "Tree has correct nodes after complex delete.");

/* Print test results */
test.printResults();
