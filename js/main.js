import postApi from "./api/postApi.js";


async function main() {
    try {       

        const queryParams = {
            _page: 1,
            _limit: 6
        };
        const response = await postApi.getAll(queryParams);

        console.log('my data' , response);
    } catch (error) {
        
        console.log('error of get all' , error);
    }
}

main();