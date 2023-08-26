import axiosClient from "./axiosClient.js";

const postApi = {

    add(data) {

        const url = '/posts';
        
        return axiosClient.post(url , data);
    },

    update(data) {

        const url = `/posts/${data.id}`;

        return axiosClient.patch(url , data);
    },

    remove(id) {

        const url = `/posts/${id}`;

        return axiosClient.remove(url);
    },

    getAll(params) {

        const url = "/posts";
        
        return axiosClient.get(url , { params });
    },

    getById(id) {

        const url = `/posts/${id}`;

        return axiosClient.get(url); 
    }
};

export default postApi;