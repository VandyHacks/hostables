const txtFile = new XMLHttpRequest();
let lines = [];
let public = [];
let private = [];
txtFile.open("GET", "sites.csv", true);
txtFile.onreadystatechange = function() {
    if (txtFile.readyState !== 4)  // Makes sure the document is ready to parse.
        return;
    if (txtFile.status !== 200)  // Makes sure it's found the file.
        return;

    lines = txtFile.responseText.split("\n"); // Will separate each line into an array
    lines = lines.map (e => e.toLowerCase().trim()); // clean a bit
    lines = lines.sort(); // sort
    console.log(lines)

    let ul = document.createElement('ul');
    lines.forEach(e =>  {
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

            if (isAdmin && isAdminURL)
                e = e.bold();

            let li = document.createElement('li');
            let link = document.createElement('a');
            link.href = 'https://' + e;
            link.innerHTML = e;
            li.appendChild(link);
            ul.appendChild(li);
        }
    });
    document.getElementById('main').appendChild(ul);
}
txtFile.send();