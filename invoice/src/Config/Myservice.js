import axios from 'axios';
import {MAIN_URL} from './Url'
let token=localStorage.getItem('_token');
export function registerUser(data){
    return axios.post(`${MAIN_URL}posts/register`,data);
}
export function loginUser(data){
    return axios.post(`${MAIN_URL}posts/login`,data);
}
export function addInvoice(data){
    return axios.post(`${MAIN_URL}posts/addinvoice`,data)
}

export function getPosts(){
    return axios.get(`${MAIN_URL}posts/getpost`)
}
export function validation(data){
    return axios.post(`${MAIN_URL}posts/validate`,data) 
}
export function fetchproduct(data){
    return axios.post(`${MAIN_URL}posts/fetchproduct`,data) 
}
export function email(data){
    return axios.post(`${MAIN_URL}posts/email`,data,{
        headers:{

            'Content-Type':"multipart/form-data"
        }
    }) 
}
export function addsetting(data){
    return axios.post(`${MAIN_URL}posts/addsetting`,data);
}
export function getSetting(data){
    return axios.post(`${MAIN_URL}posts/getsetting`,data);
}
export function deleteInvoice(id){
    return axios.post(`${MAIN_URL}posts/deleteinvoice`,id)
}

export function Updatepost(id){
    return axios.post(`${MAIN_URL}posts/updatepost`,id)
}