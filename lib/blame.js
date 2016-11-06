/*
 * Parses the output of a git blame -p (for porcelain) operation
 * 
 * For more information on the structure of the porcelain format, see
 * http://www.kernel.org/pub/software/scm/git/docs/git-blame.html
 * 
 * @author Matt Pardee
 */

module.exports = (function() {
  function BlameJS(output) {
    this.commit_data = {};
    this.line_data = [];

    this.parse(output);
  }

  BlameJS.prototype.getCommitData = function() {
    return this.commit_data;
  };

  BlameJS.prototype.getLineData = function() {
    return this.line_data;
  };

  /**
   * The entry point for parsing the output from git blame -p
   * 
   * @param {string} output The output as a string
   */
  BlameJS.prototype.parse = function(output) {
    var settingCommitData = false,
      currentCommitHash = '',
      currentLineNumber = 1;

    // Split up the original document into an array of lines
    this.lines = output.split('\n');
    if (!this.lines.length) return false;

    for (var i = 0, len = this.lines.length; i < len; i++) {
      // If we detect a tab character we know it's a line of code
      // So we can reset stateful variables
      if (this.lines[i][0] === '\t') {
        // The first tab is an addition made by git, so get rid of it
        this.line_data[currentLineNumber].code = this.lines[i].substr(1);
        settingCommitData = false;

        currentCommitHash = '';
      } else {
        var arrLine = this.lines[i].split(' ');

        // If we are in the process of collecting data about a commit summary
        if (settingCommitData) {
          this.parseCommitLine(arrLine, currentCommitHash);
        } else {
          currentCommitHash = arrLine[0];
          currentLineNumber = arrLine[2];

          // Setup the new line_data hash
          this.line_data[arrLine[2]] = {
            code: '',
            hash: currentCommitHash,
            originalLine: parseInt(arrLine[1], 10),
            finalLine: parseInt(arrLine[2], 10),
            numLines: arrLine[3] ? parseInt(arrLine[3], 10) : -1
          };

          /*
           * Since the commit data (author, committer, summary, etc) only
           * appear once in a porcelain output for every commit, we set
           * it up once here and then expect that the next 8-11 lines of
           * the file are dedicated to that data
           */
          if (!this.commit_data[arrLine[0]]) {
            settingCommitData = true;
            this.commit_data[arrLine[0]] = {
              author: '',
              authorMail: '',
              authorTime: '',
              authorTz: '',
              committer: '',
              committerMail: '',
              committerTime: '',
              committerTz: '',
              summary: '',
              previousHash: '',
              filename: ''
            };
          }
        }
      }
    }

    return true;
  };

  /**
   * Parses and sets data from a line following a commit header
   * 
   * @param {array} lineArr The current line split by a space
   * @param {string} currentCommitHash The referenced commit hash
   */
  BlameJS.prototype.parseCommitLine = function(lineArr, currentCommitHash) {
    switch(lineArr[0]) {
      case 'author':
        this.commit_data[currentCommitHash].author = lineArr.slice(1).join(' ');
        break;

      case 'author-mail':
        this.commit_data[currentCommitHash].authorMail = lineArr[1];
        break;

      case 'author-time':
        this.commit_data[currentCommitHash].authorTime = lineArr[1];
        break;

      case 'author-tz':
        this.commit_data[currentCommitHash].authorTz = lineArr[1];
        break;

      case 'committer':
        this.commit_data[currentCommitHash].committer = lineArr.slice(1).join(' ');
        break;

      case 'committer-mail':
        this.commit_data[currentCommitHash].committerMail = lineArr[1];
        break;

      case 'committer-time':
        this.commit_data[currentCommitHash].committerTime = lineArr[1];
        break;

      case 'committer-tz':
        this.commit_data[currentCommitHash].committerTz = lineArr[1];
        break;

      case 'summary':
        this.commit_data[currentCommitHash].summary = lineArr.slice(1).join(' ');
        break;

      case 'filename':
        this.commit_data[currentCommitHash].filename = lineArr[1];
        break;

      case 'previous':
        this.commit_data[currentCommitHash].previous = lineArr.slice(1).join(' ');
        break;
    }
  };

  return BlameJS;
})();
