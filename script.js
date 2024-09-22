//============================================================================
// SBA-308
//============================================================================

// Write the first message to the console
//console.log(`Hello from script.js`);

//============================================================================
// The following objects are from the assignment and must not be changed.
//============================================================================

// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};
  
// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner (student) submission data, which is an array of objects.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];
  
// The desired output this program should generate. I have renamed the function appropriately.
function getDesiredLearnerData(course, ag, submissions) {

  // here, we would process this data to achieve the desired result.
  const desiredResult = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },

    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];

  return desiredResult;
}

//============================================================================
//
// SOLUTION FOR SBA-308 STARTS HERE
//
//============================================================================

//============================================================================
// Save and display the application start time (used to determine if an
// assignment is due or not) 
//============================================================================

const applicationStartTimestamp = Date.now();                             // Unix time
const applicationStartDatestamp = new Date(applicationStartTimestamp);    // ASCII string

console.log(`Application started at ${applicationStartDatestamp} (${applicationStartTimestamp} Unix time).`);
console.log(`This time is used to determine if an assignment is due.`);
console.log('Note: Assuming all assignent times in the sample data are in GST and converting them to local time.\n');

//============================================================================
// Application specific helper functions
//
// 10% of grade: Use functions to handle repeated tasks.
//============================================================================

const validDate = (dateString) => !isNaN(Date.parse(dateString));
const getTimestamp = (dateString) => Date.parse(dateString);

// Validate Course ID
// Long winded (was one line but need to use a try/catch for 5% grade)
function validCourseId(courseId) {
  
  const validResult = Number(CourseInfo.id) === Number(courseId);

  // Use a try/catch for 5% of the grade
  try {
    if (!validResult)
      throw `Course ID ${courseId} isn't in the list of courses`;
  }
  catch(error) {
    console.log(error);
  }
  finally {
    return (validResult);
  };
}

// Validate Course ID in the assignment group
// Long winded (was one line but need to use a try/catch for 5% grade)
function validAssignmentGroupCourseId(assignmentGroup) {
  
  const validResult = validCourseId(assignmentGroup.course_id);

  // Use a try/catch for 5% of the grade
  try {
    // Using two if statements is 10% of the grade.  This is if #1
    if (!validResult)
      throw `Course ID ${assignmentGroup.course_id} in assignmentGroup isn't in the list of courses`;
  }
  catch(error) {
    console.log(error);
  }
  finally {
    return (validResult);
  }
};

// Validate individual assignmements to an ID
function validAssignmentId (assignmentGroup, assignmentId) {

  let validResult = false;

  // Use two different types of loops for 5% of the grade (while loop is #1)
  let i = 0;
  while (i < assignmentGroup.assignments.length) {

    // Debug message
    console.log(`comparing ${Number(assignmentGroup.assignments[i].id)} to ${Number(assignmentId)}`);

    // Using two if statements is 10% of the grade.  This is if #2
    if (Number(assignmentGroup.assignments[i].id) === Number(assignmentId)) {
      validResult = true;

      // 3% of the grade: Utilize at least one loop control keyword such as break or continue.
      break;
    }

    // Bump index
    i++;
  }
  
  return (validResult);
};

//==================================================================
// Test block
//
// This test block verifies that the helper functions work.  This
// block can be commented out.
//==================================================================

function verifyHelperFunctions() {
  // Verify course ID
  let courseId = '451';
  console.log(`courseID ${courseId} in list = ${validCourseId(courseId)}`);

  // Verify date
  let dateString1 = "2024-09-12";
  let dateString2 = "2024-09-12 00:00:00";
  let dateString3 = "HELL WORLD";

  // Verify past due function
  console.log(`dateString ${dateString1} is valid = ${validDate(dateString1)}, timestamp = ${getTimestamp(dateString1)}, past due = ${nowPastDue(dateString1)}`);
  console.log(`dateString ${dateString2} is valid = ${validDate(dateString2)}, timestamp = ${getTimestamp(dateString2)}, past due = ${nowPastDue(dateString2)}`);
  console.log(`dateString ${dateString3} is valid = ${validDate(dateString3)}, timestamp = ${getTimestamp(dateString3)}, past due = ${nowPastDue(dateString3)}`);

  // Verify course_id in Assignments
  const assignment1 = {
    course_id: "51"
  };
  let assignment2 = {
    course_id: `451`
  };
  console.log(`courseID ${assignment1.course_id} is valid = ${validAssignmentGroupCourseId(assignment1)}`);
  console.log(`courseID ${assignment2.course_id} is valid = ${validAssignmentGroupCourseId(assignment2)}`);

  // Verify an assignment # is in the assignment group
  for (let i = -2; i < 6; i++)
  console.log(`assignment id ${i} is valid = ${validAssignmentId(AssignmentGroup, i)}`);
}

// Build a list of unique individual learners from the learner submissions
// Create and/or manipulate arrays and objects = 10% of grade.
function getListOfLearners(LearnerSubmissions) {
  
  let listOfLearners = [];

  // go through the submisison list, add it if not on the list
  // Use two different types of loops for 5% of the grade (this for loop is #2)

  for (const LearnerSubmission of LearnerSubmissions) {
    if (listOfLearners.indexOf(LearnerSubmission.learner_id) < 0)

      // Create and/or manipulate arrays and objects = 10% of grade.
      listOfLearners.push(LearnerSubmission.learner_id);
  }

  // For testing the if statement below
  // listOfLearners = [ 120, 240, 11, 9, 2 ];
  // listOfLearners = [];

  // Sort the list
  listOfLearners.sort((a, b) => a - b);

    // List can't be empty.  We don't use throw/catch here cause it's messy looking
  console.log(listOfLearners.length === 0 ?
    `No learners found in learner submissionslist!` :
    `${listOfLearners.length} learners submitted assignments. Their IDs are ${listOfLearners}\n`);

  // Return list
  return (listOfLearners);
}

// Build a list of unique assignments
// Create and/or manipulate arrays and objects = 10% of grade.
function getListOfAssignmentsDue(ag) {

  console.log(`Below is a list of assignments and their due dates:`);
  let listOfAssignmentsDue = [];

  // go through the assignment group, add it if not on the list
  // for of loop = the 2nd type of loop required that is 
  for (const a of ag.assignments) {

    let dueDate = new Date(a.due_at);

    // For testing the line below
    // dueDate = 'laksjdf;lakjsdfl;akjsdflkjadfs'
    
    // Check if due date is bogus
    if (!validDate(dueDate))
      console.log(`Due date ${dueDate} is not valid.`);

    // If due date is legit, and it's due, add it to the assignment due list
    else {
      console.log(`Assignment ${a.id} is due at ${dueDate}`);

      if (applicationStartTimestamp >= getTimestamp(dueDate))
        if (listOfAssignmentsDue.indexOf(a.id) < 0)

          // Create and/or manipulate arrays and objects = 10% of grade.
          listOfAssignmentsDue.push(a.id);
    }
  }

  // For testing the sorting and console log statements below
  // listOfAssignments = [ 120, 240, 11, 9, 2 ];
  // listOfAssignments = [];

  // Sort the list
  listOfAssignmentsDue.sort((a, b) => a - b);

  // List can't be empty.  We don't use throw/catch here cause it's messy looking
  console.log(``);
  console.log(listOfAssignmentsDue.length === 0 ?
    `No assignments found in assignment group!` :
    `Based upon the application start time of ${applicationStartDatestamp},\n`+
    `the following assigments are currently due: ${listOfAssignmentsDue}\n`);

  // Return list
  return (listOfAssignmentsDue);
}

//============================================================================
// getLearnerData()
//
// The bulk of the work is done here!
//============================================================================

function getLearnerData(CourseInfo, assignmentGroup, learnerSubmissions)
{ 
  // First of all, validate course ID
  if (!validAssignmentGroupCourseId(assignmentGroup)) {
    console.log(`ERROR: Invalid course ID in the assignment group`);
  }

  // The output of this function is stored in this array of objects
  resultList = [];

  // Get list of students (learners)
  let learnerList = getListOfLearners(LearnerSubmissions);

  // Get list of assignments that are due now
  let dueAssignments = getListOfAssignmentsDue(AssignmentGroup);

  // For each student (learner)
  for (l of learnerList) {

    // Log the learner #
    console.log(`Processing submissions for learner ID ${l}`);

    // Reset the score board
    let totalPossiblePoints = 0;
    let totalEarnedPoints = 0;

    // Start to build learnerData
    let learnerData = {};

    // Add the assignment ID and plug in an average score of 0 to begin with
    learnerData['id'] = l;
    learnerData['avg'] = 0;
    // console.log(learnerData);

    // For each due assignment
    for (d of dueAssignments) {

      // console.log(`+-Processing Learner ${l} assigment ${d}`);

      // Find assignment
      const a = assignmentGroup.assignments.find(obj => obj.id === d);
      // console.log(`Assignment = ${a}`);

      // If we found it
      if (a != undefined) {

        // Assignment exists, bump up the total possible score
        totalPossiblePoints += a.points_possible;

        // Now check if the student did the assignment
        const s = learnerSubmissions.find(obj => obj.learner_id === l && obj.assignment_id === d)
        // console.log(`Submission = ${s}`);

        // By default the assignment is worth 100% (no penalty)
        let assignmentPenalty = 0;

        // If the student submitted the assignment
        if (s != undefined) {
          // console.log(s);

          // If the assignment is late, assign a penalty . . .
          if (getTimestamp(s.submission.submitted_at) > getTimestamp(a.due_at)) {
            console.log(`&nbsp;&nbsp;Learner ${l}'s assignment ${d} is late!`);

            // Penalty = 10% of maximum points
            assignmentPenalty = a.points_possible * 0.10;
          }

          // Calculate score (with any penalties), rounded down to 3 decimal places
          let netAssignmentScore = Number((s.submission.score - assignmentPenalty).toFixed(3));

          // Bump up the # of points earned
          totalEarnedPoints += netAssignmentScore;

          // Make sure points possible > 0
          if (a.points_possible > 0) {
            let submissionAve = Number((netAssignmentScore / a.points_possible).toFixed(3));

            // Add it to learner data, round down to 3 decimal places
            learnerData[d] = submissionAve;

            // Write it to the console
            console.log(`&nbsp;&nbsp;Learner ${l}'s average for assignment ${d} is ${submissionAve}`);
          }
          else
            console.log(`Points possible on an assignment must be > 0`);

          console.log(`&nbsp;&nbsp;Learner ${l} earned ${netAssignmentScore} points out of a maximum of ${a.points_possible} on assignment ${d}`);
        }
      }
    }

    // Output summary for this learner
    console.log(`&nbsp;&nbsp;Learner ${l} earned a total of ${totalEarnedPoints} points out of a maximum of ${totalPossiblePoints} for assignenments ${dueAssignments}`);

    // Calculate average and save it
    let average = Number((totalEarnedPoints / totalPossiblePoints).toFixed(3));
    learnerData['avg'] = average;
    console.log(`&nbsp;&nbsp;Learner ${l} average is ${average} (${totalEarnedPoints} / ${totalPossiblePoints})\n`);

    // Display data
    // console.log(`--Learner ${l}'s data:`);
    // console.log(learnerData);

    // Add learner data to result list
    resultList.push(learnerData);
    
    // Current result list
    // console.log(`--Current result list after this pass: (NOTE: only valid if you single step through the debugger)`);
    // console.log(`If you run instead of single step, you will see the full results here for both passes.`);
    // console.log('https://stackoverflow.com/questions/11118758/bug-in-console-log');
    // console.log(`Result List # rows = ${resultList.length}`);
    // console.log(resultList);
  }

  // Return result list
  return(resultList);
}

//==========================================================================
// Here is the main() of the app... if there was such a thing in js.
//==========================================================================

// You can verify that the helper functions work by uncommenting this below.
// verifyHelperFunctions();

//==========================================================================
// Below is the Javascript result 
//==========================================================================

//==========================================================================
// displayLearnerObject()
//
// Pass this a learner object and it will display it in the way you'd
// expect: id first, average second, then all the other key/values
//==========================================================================

function displayLearnerData(obj, outputDiv) {

  const keyOrder = ['id', 'avg'];

  function outputKey(key) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      const div = document.createElement('div');
      div.className = 'object-value';

      const displayValue = Array.isArray(value) ? value.join(`, `) : value;

      // Set the inner html with key and value
      // div.innerHTML = `<strong>${key}:</strong> ${displayValue}`;
      div.innerHTML = `${key}:&nbsp;${displayValue}`;

      // Append the div to the output div
      outputDiv.appendChild(div);
    }
  }

  outputKey(`id`);
  outputKey(`avg`);
  for (const key in obj) {
    if (key === `id` || key === `avg`)
      continue;
    outputKey(key);
  }
}

/* Display learner data object to the console */
function consoleLogLearnerData(obj, indent) {

  const keyOrder = ['id', 'avg'];

  function outputKey(key, indent) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      console.log(`${indent}${key} : ${value}`);
    }
  }

  outputKey(`id`, indent);
  outputKey(`avg`, indent);
  for (const key in obj) {
    if (key === `id` || key === `avg`)
      continue;
    outputKey(key, indent);
  }
}

//============================================================================
// displayObject()
//
// Pass this a learner object and it will display it in some random order
//============================================================================

function displayObject(obj, outputDiv) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      const div = document.createElement('div');
      div.className = 'object-value';

      const displayValue = Array.isArray(value) ? value.join(`, `) : value;

      // Set the inner html with key and value
      // div.innerHTML = `<strong>${key}:</strong> ${displayValue}`;
      div.innerHTML = `${key}:&nbsp${displayValue}`;

      // Append the div to the output div
      outputDiv.appendChild(div);
    }
  }
}

//==========================================================================
// Draw Screen
//==========================================================================

// Display title in HTML
const titleDiv = document.getElementById("title");
let div = document.createElement(`div`);
div.innerHTML = `Course ${CourseInfo.id}: ${CourseInfo.name}`;
titleDiv.appendChild(div);

// Display lessons in HTML
const lessonDiv = document.getElementById("lessons");
div = document.createElement(`div`);
displayObject(LearnerSubmissions[0], lessonDiv);

// Run the app!
const actualResult = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
const desiredResult = getDesiredLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// Write the learner data to the HTML and to the console
{
  // DIV IDs to write the actual and expected results to
  const actualDiv = document.getElementById("actualResult");
  const expectDiv = document.getElementById("expectedResult");  

  // Output the actual learner results
  console.log(`getLearnerData() produced ${actualResult.length} objects:`);
  console.log(`[`);
  for (let i = 0; i < actualResult.length; i++) {
    console.log(`&nbsp;&nbsp;{`);
    displayLearnerData(actualResult[i], actualDiv);
    consoleLogLearnerData(actualResult[i], `&nbsp;&nbsp;&nbsp;&nbsp;`);

    if (i < actualResult.length - 1)
      console.log(`&nbsp;&nbsp;},`);
    else
      console.log(`&nbsp;&nbsp;}`);
  }
  console.log(`]`);  

  // Output the desired learner results
  console.log(`The desired result of the appliation is ${actualResult.length} objects:`);
  console.log(`[`);  
  for (let i = 0; i < desiredResult.length; i++) {
    console.log(`&nbsp;&nbsp;{`);
    displayLearnerData(desiredResult[i], expectDiv);
    consoleLogLearnerData(desiredResult[i], `&nbsp;&nbsp;&nbsp;&nbsp;`);

    if (i < desiredResult.length - 1)
      console.log(`&nbsp;&nbsp;},`);
    else
      console.log(`&nbsp;&nbsp;}`);

  }
  console.log(`]`);  
}



//===================================
// We are done!
//===================================

console.log(`\nApplication complete.`);
