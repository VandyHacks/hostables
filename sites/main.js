const txtFile = new XMLHttpRequest();
let lines = [];
let public = [];
let private = [];
const csvURL = 'https://gist.githubusercontent.com/cktang88/f251ef684298df9630280e5ec6440841/raw/122275ca4652d18ee75d3865143574dfdfff17d4/sites.csv';
txtFile.open("GET", csvURL, true);
txtFile.onreadystatechange = function () {
    if (txtFile.readyState !== 4) // Makes sure the document is ready to parse.
        return;
    if (txtFile.status !== 200) // Makes sure it's found the file.
        return;

    lines = txtFile.responseText.split("\n"); // Will separate each line into an array
    lines = lines.map(e => e.toLowerCase().trim()); // clean a bit
    lines = lines.sort(); // sort

    let ul = document.createElement('ul');
    lines.forEach(e => {
        if (e.endsWith('*'))
            private.push(e)
        else
            public.push(e)

        // check for admin urls
        const isAdmin = window.location.href.endsWith('#admin');
        const isAdminURL = e.endsWith('*');
        if (isAdmin || !isAdminURL) {

            // clean strs
            e += '.vandyhacks.org';
            e = e.replace('*', '');

            let li = document.createElement('li');
            let link = document.createElement('a');
            link.href = 'https://' + e;
            link.innerHTML = (isAdmin && isAdminURL) ? e.bold() : e;
            li.appendChild(link);
            ul.appendChild(li);
        }
    });
    document.getElementById('main').appendChild(ul);
}
txtFile.send();

function isIE() {
    const ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    const is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;

    return is_ie;
}

document.body.style.backgroundColor = isIE() ? '#ff00ff' : '#fff';
document.body.style.fontFamily = isIE() ? '"Comic Sans MS", "Comic Sans", "Arial"' : 'Open Sans'