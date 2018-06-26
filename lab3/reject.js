export function takeReject(err, container, info, removeContent, createBlock) {
    const error = createBlock('h1', "There are some fetch error " + err);
    removeContent(container, info);
    container.appendChild(error);
}
