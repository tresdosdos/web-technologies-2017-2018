export function takeTag(id) {
    return document.getElementById(id);
}

export function createBlock(tag, data, href) {
    if (tag === 'img'){
        const temp = document.createElement(tag);
        temp.setAttribute('src', data);
        return temp;
    }
    else if (tag === 'a'){
        const temp = document.createElement(tag);
        createText(temp, data);
        temp.setAttribute('href', href);
        return temp;
    }
    else if (arguments.length === 1){
        return document.createElement(tag);
    }
    else{
        const temp = document.createElement(tag);
        createText(temp, data);
        return temp;
    }
}

export function createText(tag, text) {
    const temp = document.createTextNode(text);
    tag.appendChild(temp);
}

export function removeContent(localContainer, mainContainer){
    if (!localContainer.childNodes)
        localContainer.appendChild(info);
    else {
        while (localContainer.firstChild)
            localContainer.removeChild(localContainer.firstChild);
        localContainer.appendChild(mainContainer);
    }
}
