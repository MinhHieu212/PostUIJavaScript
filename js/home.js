import postApi from "./api/postApi.js";
import { setTextContent } from "./utils";
import dayjs from 'dayjs';
import relativeTime  from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

function createLiElement(postItem) {

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

            thumnailElement.src = "https://placehold.co/600x400?text=Thumbnail";
        });
    }

    return newPostItem;
}

function renderPostList(postList) {

    if(!Array.isArray(postList) || postList.length == 0) return;
    
    const Ulelement = document.getElementById('postsList');

    if(!Ulelement) return;
    
    postList.forEach((post) => {

        const liElement = createLiElement(post);
        if(liElement) Ulelement.appendChild(liElement); 
    });
    
}


(async () => {

    try {
        const queryParams = {_page: 1, _limit: 6};
        const {data , pagination} = await postApi.getAll(queryParams);
        renderPostList(data);
    } catch (error) {
        console.log('error of get all' , error);
    }
})();