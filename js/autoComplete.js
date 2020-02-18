const autocomplete = (input, array) => {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;
    /*execute a function when someone writes in the text field:*/
    input.addEventListener('input', function() {
        let a,
            b,
            i,
            val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create  DIV element that will contain the items (values):*/
        a = document.createElement('DIV');
        a.setAttribute('id', this.id + 'autocomplete-list');
        console.log(this.id);
        a.setAttribute('class', 'autocomplete-items');
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < array.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (
                array[i].substr(0, val.length).toUpperCase() ==
                val.toUpperCase()
            ) {
                /*create a DIV element for each matching element:*/
                b = document.createElement('DIV');
                /*make the matching letters bold:*/
                b.innerHTML =
                    '<strong>' + array[i].substr(0, val.length) + '</strong>';
                b.innerHTML += array[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + array[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener('click', function() {
                    /*insert the value for the autocomplete text field:*/
                    input.value = this.getElementsByTagName('input')[0].value;
                    /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    input.addEventListener('keydown', function(event) {
        var element = document.getElementById(this.id + 'autocomplete-list');
        if (element) element = element.getElementsByTagName('div');
        if (event.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(element);
        } else if (event.keyCode == 38) {
            //up
            /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(element);
        } else if (event.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            event.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (element) element[currentFocus].click();
            }
        }
    });
    const addActive = item => {
        /*a function to classify an item as "active":*/
        if (!item) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(item);
        if (currentFocus >= item.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = item.length - 1;
        /*add class "autocomplete-active":*/
        item[currentFocus].classList.add('autocomplete-active');
    };
    const removeActive = item => {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < item.length; i++) {
            item[i].classList.remove('autocomplete-active');
        }
    };
    const closeAllLists = element => {
        /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
        var x = document.getElementsByClassName('autocomplete-items');
        for (var i = 0; i < x.length; i++) {
            if (element != x[i] && element != input) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    };
    /*execute a function when someone clicks in the document:*/
    document.addEventListener('click', function(event) {
        closeAllLists(event.target);
    });
};
/*initiate the autocomplete function on the "input" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById('input'), countries);

///////////////////////////////////////////////////////////
///////////////////   Auto Complete   /////////////////////
///////////////////////////////////////////////////////////

// const $input = document.getElementById('input'); //search
// const $searchResults = document.getElementById('search-results'); //matchList

// const searchProblems = async searchText => {
//     const res = await fetch('./js/data.json');
//     const problems = await res.json();
//     const allProblems = [];
//     const result = problems.info;

//     for (let i = 0; i < result.length; i++) {
//         result[i].problems.map(item => {
//             allProblems.push(item.title);
//         });
//     }
//     // Get match to current text input
//     let matches = allProblems.filter(problem => {
//         const regex = new RegExp(`^${searchText}`, 'gi');
//         return problem.match(regex);
//     });

//     if (searchText.length === 0) {
//         matches = [];
//         $searchResults.innerHTML = '';
//     }

//     outputHtml(searchText, matches);
// };

// // Show results in HTML

// const outputHtml = (searchText, arrayOfMatches) => {
//     if (arrayOfMatches.length > 0) {
//         const styledMatches = highlightLetters(searchText, arrayOfMatches);

//         const html = styledMatches
//             .map(
//                 match => `
//                 <div class="result-items">
//                     ${match}
//                 </div>
//                 `
//             )
//             .join('');

//         $searchResults.innerHTML = html;
//     }
// };

// const highlightLetters = (searchText, arrayOfMatches) => {
//     const regex = new RegExp(`${searchText}`, 'gi');
//     // console.log(regex);

//     //loop through arrayOfMatches
//     const styledHtml = arrayOfMatches.map(match => {
//         //check each string if it has the combination of character from input field value
//         //return new array with modified strings containing <b></b> around the matched character combination.
//         const styledMatch = match.replace(regex, `<b>${searchText}</b>`);
//         return styledMatch;
//     });
//     return styledHtml;
// };

// $input.addEventListener('input', () => searchProblems($input.value));
