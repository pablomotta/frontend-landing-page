// const $searchResults = $('#search-results');
// const $input = $('#input');

// const search = () => {
//     $.ajax({
//         url: './js/data.json',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         method: 'GET'
//     })
//         .then(response => {
//             let allProblems = [];
//             let result = response.info;

//             for (let i = 0; i < result.length; i++) {
//                 result[i].problems.map(item => {
//                     // console.log('mapped results', item);
//                     allProblems.push(item.title);
//                 });
//             }
//             return allProblems;
//         })
//         .then(response => {
//             createUl();
//             return response;
//         })
//         .then(response => {
//             appendLi(response);
//         });

// };

// let loopArray = array => {
//     array.forEach(item => console.log(item));
// };

// let createUl = () => {
//     $('<ul>', {
//         class: 'result-items'
//     }).appendTo($searchResults);
// };

// let appendLi = array => {
//     array.forEach(item => {
//         // console.log(item);
//         $('<li>', {
//             html: item
//         }).appendTo('.result-items');
//     });
// };

// $input.on('keyup', search);
