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

    outputHtml(matches);
};

// Show results in HTML

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches
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

$input.addEventListener('input', () => searchProblems($input.value));
