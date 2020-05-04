// Reworking the javascript challenge to work with a student.json file.

// TODO: I should make it work with node and be a little more testable.

const fs = require('fs');

const answer = students => {
    const scores = (a, b) => a + b;
    let failingStudents = []; //{name: null, averageGrade: null}
    let array = [];
    let avg;

    students.forEach(i => {
        i.classes.forEach(j => {
            if(j.name === "Math") {
                array = [];

                j.tests.forEach(k => {
                    array.push(k.grade);
                });

                avg = Math.round(array.reduce(scores)/array.length);

                avg && (avg < 70) ? failingStudents.push({
                    name: i.name,
                    averageGrade: avg
                }) : false;
            }
        });
    });
    return failingStudents;
};

const fetchStudents = () => {
  return fs.createReadStream("students.json")
    .then(res => res.json());
};

// Example output:
// Nickolas Leinen - 65
// Coralee Heilman - 68
fetchStudents()
  .catch(err => console.error(`Error fetching students, check your internet connection. ${err}`))
  .then(students => {
    answer(students).forEach(student => {
      console.log(`${student.name} - ${student.averageGrade}`);
    });
});
