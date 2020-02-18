// search all problems and store in array
const search = () => {
    let allProblems = [];
    $.ajax({
        url: './js/data.json',
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(response => {
        let result = response.info;

        for (let i = 0; i < result.length; i++) {
            result[i].problems.map(item => {
                allProblems.push(item.title);
            });
        }
    });
    return allProblems;
};
// store allProblems array from search function in variable
const problems = search();
