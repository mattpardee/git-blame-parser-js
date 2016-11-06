var Blame = require('../lib/blame');

var output = `0000000000000000000000000000000000000000 1 1 1
author Not Committed Yet
author-mail <not.committed.yet>
author-time 1478303488
author-tz -0700
committer Not Committed Yet
committer-mail <not.committed.yet>
committer-time 1478303488
committer-tz -0700
summary Version of README.md from README.md
previous 4483b1a090400cf094d14dfa60371d7e0c7a80e6 README.md
filename README.md
	# Git Blame parser
4483b1a090400cf094d14dfa60371d7e0c7a80e6 2 2 3
author Matt Pardee
author-mail <matt.pardee@gmail.com>
author-time 1316825167
author-tz -0700
committer Matt Pardee
committer-mail <matt.pardee@gmail.com>
committer-time 1316825167
committer-tz -0700
summary README
filename README.md
	
4483b1a090400cf094d14dfa60371d7e0c7a80e6 3 3
	This module parses the output from a "git blame -p" (for porcelain, i.e. machine-digestible) operation.
4483b1a090400cf094d14dfa60371d7e0c7a80e6 4 4
	
0000000000000000000000000000000000000000 5 5 1
	# Usage
4483b1a090400cf094d14dfa60371d7e0c7a80e6 6 6 2
	
4483b1a090400cf094d14dfa60371d7e0c7a80e6 7 7
	\`\`\`javascript
0000000000000000000000000000000000000000 8 8 1
	var BlameJS = require('blamejs');
4483b1a090400cf094d14dfa60371d7e0c7a80e6 9 9 3
	var blamejs = new BlameJS();
4483b1a090400cf094d14dfa60371d7e0c7a80e6 10 10
	
4483b1a090400cf094d14dfa60371d7e0c7a80e6 11 11
	// Get the result of the git blame operation
0000000000000000000000000000000000000000 12 12 1
	var blameOut = '[output]';
4483b1a090400cf094d14dfa60371d7e0c7a80e6 13 13 23
	
4483b1a090400cf094d14dfa60371d7e0c7a80e6 14 14
	blamejs.parseBlame(blameOut);
4483b1a090400cf094d14dfa60371d7e0c7a80e6 15 15
	
4483b1a090400cf094d14dfa60371d7e0c7a80e6 16 16
	// Get the commit data
4483b1a090400cf094d14dfa60371d7e0c7a80e6 17 17
	var commitData = blamejs.getCommitData();
4483b1a090400cf094d14dfa60371d7e0c7a80e6 18 18
	
4483b1a090400cf094d14dfa60371d7e0c7a80e6 19 19
	// Get the line data array, each item containing a reference to
4483b1a090400cf094d14dfa60371d7e0c7a80e6 20 20
	// commits that can be then referenced in commitData
4483b1a090400cf094d14dfa60371d7e0c7a80e6 21 21
	var lineData = blamejs.getLineData();
4483b1a090400cf094d14dfa60371d7e0c7a80e6 22 22
	
4483b1a090400cf094d14dfa60371d7e0c7a80e6 23 23
	var firstLine = commitData[lineData[0].hash];
4483b1a090400cf094d14dfa60371d7e0c7a80e6 24 24
	// firstLine now has:
4483b1a090400cf094d14dfa60371d7e0c7a80e6 25 25
	// - author
4483b1a090400cf094d14dfa60371d7e0c7a80e6 26 26
	// - authorMail
4483b1a090400cf094d14dfa60371d7e0c7a80e6 27 27
	// - authorTime
4483b1a090400cf094d14dfa60371d7e0c7a80e6 28 28
	// - authorTz
4483b1a090400cf094d14dfa60371d7e0c7a80e6 29 29
	// - committer
4483b1a090400cf094d14dfa60371d7e0c7a80e6 30 30
	// - committerMail
4483b1a090400cf094d14dfa60371d7e0c7a80e6 31 31
	// - committerTime
4483b1a090400cf094d14dfa60371d7e0c7a80e6 32 32
	// - committerTz 
4483b1a090400cf094d14dfa60371d7e0c7a80e6 33 33
	// - summary
4483b1a090400cf094d14dfa60371d7e0c7a80e6 34 34
	// - previousHash
4483b1a090400cf094d14dfa60371d7e0c7a80e6 35 35
	// - filename
0000000000000000000000000000000000000000 36 36 1
	\`\`\``;

var subject = new Blame(output);

var commitData = subject.getCommitData();
var lineData = subject.getLineData();

console.log(lineData);
