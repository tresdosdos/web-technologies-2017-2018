import {takeTag, createBlock, createText, removeContent} from "./containers";
import {takeReject} from './reject';
import {takeRes} from './response';

document.getElementById("btn_input").addEventListener("click", function () {
   hello();
});

function hello() {
    if (document.readyState || document.body.readyState === 'complete'){ //ready DOM test
    const username = takeTag('nickname');
    const container = takeTag('root');
    const info = createBlock('div');
    fetch('https://api.github.com/users/'+ username.value).then(
         (response) => {
                takeRes(response, container, info, username, removeContent, createBlock);
         }
    ).catch((err) => {
        takeReject(err, container, info, removeContent, createBlock);
    });}
}
