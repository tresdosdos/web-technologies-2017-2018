var hello = function () {
    var username = document.getElementById('nickname');
    var containter = document.getElementById('root');
    var info = document.createElement('div');
    fetch('https://api.github.com/users/'+ username.value).then(
        function (response) {
            if (response.status !== 200){
                var error = document.createElement('h1');
                error.appendChild(document.createTextNode("No user with login " + username.value));
                while (containter.firstChild)
                    containter.removeChild(containter.firstChild);
                containter.appendChild(error);
                return;
            }
            response.json().then(function(data){
                var temp1, temp2;
                temp1 = document.createElement('img');
                temp1.setAttribute('src', data.avatar_url);
                info.appendChild(temp1);
                if (data.name !== null){
                    temp1 = document.createElement('h1');
                    temp2 = document.createTextNode(data.name);
                    temp1.appendChild(temp2);
                    info.appendChild(temp1);
                }
                temp1 = document.createElement('h2');
                temp2 = document.createTextNode(data.login);
                temp1.appendChild(temp2);
                info.appendChild(temp1);
                temp1 = document.createElement('h3');
                if (data.bio !== null)
                 temp2 = document.createTextNode(data.bio);
                    else temp2 = document.createTextNode("The user has no bio");
                    temp1.appendChild(temp2);
                    temp1.setAttribute('class', 'bio');
                    info.appendChild(temp1);
                 if (data.company !== null){
                     temp1 = document.createElement('h3');
                     temp2 = document.createTextNode(data.company);
                     temp1.appendChild(temp2);
                     info.appendChild(temp1);
                 }
                 if (data.location !== null)
                 {
                     temp1 = document.createElement('h4');
                     temp2 = document.createTextNode(data.location);
                     temp1.appendChild(temp2);
                     info.appendChild(temp1);
                 }
                 if (data.email !== null){
                     temp1 = document.createElement('a');
                     temp2 = document.createTextNode(data.email);
                     temp1.appendChild(temp2);
                     temp1.setAttribute('href', data.email);
                     info.appendChild(temp1);
                 }
                 if (data.blog !== null){
                     temp1 = document.createElement('a');
                     temp2 = document.createTextNode(data.blog);
                     temp1.appendChild(temp2);
                     temp1.setAttribute('href', data.blog);
                     info.appendChild(temp1);
                 }
                 if (!containter.childNodes)
                    containter.appendChild(info);
                 else {
                     while (containter.firstChild)
                        containter.removeChild(containter.firstChild);
                     containter.appendChild(info);
                 }
            });
        }
    ).catch(function (err) {
        var error = document.createElement('h1');
        error.appendChild(document.createTextNode("There are some fetch error " + err));
        while (containter.firstChild)
            containter.removeChild(containter.firstChild);
        containter.appendChild(error);
    });
};
