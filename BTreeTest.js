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
test.assertEqual([1,3,5,7,10], tree.toArray(), "toArray correctly returns tree as an array.");

/* Tree can have elements removed from it */
test.assertFalse(tree.remove(8), "Cannot remove object that does not exist.");
test.assertTrue(tree.remove(1), "Can remove a leaf node.");
test.assertEqual(4, tree.size(), "Tree size updates correctly when leaf node is removed");

test.assertTrue(tree.remove(10), "Tree updates when node with one child is deleted.");
test.assertEqual(3, tree.size(), "Tree size correctly updates after node with one child deleted.");

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

console.log(tree.toString());

test.assertTrue(tree.remove(15), "Tree can perform a remove on a node with 2 children.");
test.assertEqual(8, tree.size(), "Tree size is correct after complex delete.");

console.log(tree.toString());

/* Print test results */
test.printResults();
