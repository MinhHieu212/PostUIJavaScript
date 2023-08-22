export function setTextContent(parent , selector , text) {

    if(!parent) return;

    const temp = parent.querySelector(selector);
    if(temp) temp.textContent = text;
}