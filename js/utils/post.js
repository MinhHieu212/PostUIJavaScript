import { setTextContent } from "./common.js";
import dayjs from 'dayjs';
import relativeTime  from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);


export function createPostElement(postItem) {

    const postTemplate = document.getElementById('postTemplate');

    if(!postTemplate) return;

    const newPostItem  = postTemplate.content.firstElementChild.cloneNode(true);

    if(!newPostItem) return;
    
    setTextContent(newPostItem , '[data-id="title"]' , postItem.title);
    setTextContent(newPostItem , '[data-id="description"]' , postItem.description);
    setTextContent(newPostItem , '[data-id="author"]' , postItem.author);
    setTextContent(newPostItem , '[data-id="timeSpan"]' , ` - ${dayjs(postItem.updatedAt).fromNow()}`);
    
    const thumnailElement = newPostItem.querySelector('[data-id="thumbnail"]');
    if(thumnailElement) {

        thumnailElement.src = postItem.imageUrl;
        thumnailElement.addEventListener('error' , () => {

            thumnailElement.src = "https://placehold.co/1370x400?text=Thumbnail";
        });
    }

    const divPost = newPostItem.querySelector('.post-item');
     
    if(!divPost) return;

    divPost.addEventListener('click' , (event) => {
        
        const itemNemu = divPost.querySelector('[data-id="itemMenu"]');
        if(itemMenu && itemMenu.contains(event.target)) return;

        window.location.assign(`/post-details.html?id=${postItem.id}`);
    })

    const itemMenu = divPost.querySelector('.post-item-menu');
    
    if(!itemMenu) return;

    itemMenu.addEventListener('click' , (event) => {
        
        window.location.assign(`/add-edit-post.html?id=${postItem.id}`);
    });
    return newPostItem;
}

export function renderPostList(elementId , postList) {

    const Ulelement = document.getElementById(elementId);
    if(!Ulelement) return;
    Ulelement.textContent = '';
    
    if(!Array.isArray(postList) || postList.length == 0) return;
    
    
    postList.forEach((post) => {

        const liElement = createPostElement(post);
        if(liElement) Ulelement.appendChild(liElement); 
    });
}

// show something in here