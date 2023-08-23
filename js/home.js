import postApi from "./api/postApi.js";
import {renderPostList , renderPagination , initPagination , initSearch} from "./utils";

async function handleFilterChange(filterName , filterValue) {
    try {

        const url  = new URL(window.location);
        url.searchParams.set(filterName , filterValue);

        if(filterName == 'title_like') url.searchParams.set('_page' , 1);

        history.pushState({} , '' , url);

        const {data , pagination} = await postApi.getAll(url.searchParams);
        renderPostList('postsList', data);
        renderPagination('postsPagination', pagination);

    } catch (error) {

        console.log('error, handlePrevLink failed', error);
    }
}


(async () => {

    try {

        const url = new URL(window.location);

        if(!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
        if(!url.searchParams.get('_limit')) url.searchParams.set('_limit' , 6);

        history.pushState({} , '' , url);

        const queryParams  = url.searchParams;
        
        initPagination({
            elementId: 'postsPagination',
            defaultParams: queryParams,
            onChange: (page) => {handleFilterChange('_page' , page)}
        });

        initSearch({
            elementId: 'searchInput',
            defaultParams: queryParams,
            onChange: (value) => {handleFilterChange('title_like' , value)}
        });
        
        const {data , pagination} = await postApi.getAll(queryParams);
        renderPostList('postsList' , data);
        renderPagination('postsPagination' , pagination);

    } catch (error) {

        console.log('error of get all' , error);
    }
})();