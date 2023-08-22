import postApi from "./api/postApi.js";
import { setTextContent } from "./utils";



function createLiElement(postItem) {

    try {
        const postTemplate = document.getElementById('postItemTemplate');

        if(!postTemplate) return;
    
        const newPostItem  = postTemplate.content.firstElementChild.cloneNode(true);
        if(!newPostItem) return;
        
        setTextContent(newPostItem , '[data-id="title"]' , postItem.title);
        setTextContent(newPostItem , '[data-id="description"]' , postItem.description);
        setTextContent(newPostItem , '[data-id="author"]' , postItem.author);
        
        const thumnailElement = newPostItem.querySelector('[data-id="thumbnail"]');
        if(thumnailElement) thumnailElement.src = postItem.imageUrl;

        return newPostItem;
    
    } catch (error) {

        console.log('failed to create post item' , error);
    }

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