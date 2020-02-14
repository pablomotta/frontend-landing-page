const $input = document.getElementById('input'); //search
const $searchResults = document.getElementById('search-results'); //matchList

const searchProblems = async searchText => {
    const res = await fetch('./js/data.json');
    const problems = await res.json();
    const allProblems = [];
    const result = problems.info;

    for (let i = 0; i < result.length; i++) {
        result[i].problems.map(item => {
            allProblems.push(item.title);
        });
    }
    // Get match to current text input
    let matches = allProblems.filter(problem => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return problem.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        $searchResults.innerHTML = '';
    }

    outputHtml(searchText, matches);
};

// Show results in HTML

const outputHtml = (searchText, arrayOfMatches) => {
    if (arrayOfMatches.length > 0) {
        const styledMatches = highlightLetters(searchText, arrayOfMatches);

        const html = styledMatches
            .map(
                match => `
                <div class="result-items">
                    ${match}                 
                </div>
                `
            )
            .join('');

        $searchResults.innerHTML = html;
    }
};

const highlightLetters = (searchText, arrayOfMatches) => {
    const regex = new RegExp(`${searchText}`, 'gi');
    console.log(regex);

    //loop through arrayOfMatches
    const styledHtml = arrayOfMatches.map(match => {
        //check each string if it has the combination of character from input field value
        //return new array with modified strings containing <b></b> around the matched character combination.
        const styledMatch = match.replace(regex, `<b>${searchText}</b>`);
        return styledMatch;
    });
    return styledHtml;
};

$input.addEventListener('input', () => searchProblems($input.value));
