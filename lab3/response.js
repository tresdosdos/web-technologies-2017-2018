export function takeRes(response, container, info, username, removeContent, createBlock) {
    if (response.status !== 200){
        const error = createBlock('h1', "No user with login " + username.value);
        removeContent(container, info);
        container.appendChild(error);
        return;
    }
    response.json().then(function(data){
        let temp1;
        const temp2 = ['img', 'h1', 'h2', 'h3', 'h3', 'h4', 'a', 'a'];
        const content = [data.avatar_url, data.name, data.login, data.bio, data.company, data.location, data.email, data.blog];
        content.forEach((element, step) => {
            if (element !== null){
                temp1 = createBlock(temp2[step], element, element);
                info.appendChild(temp1);
            }
        });
        removeContent(container, info);
    });
}
