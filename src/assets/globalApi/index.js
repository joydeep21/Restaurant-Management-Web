import axios from "axios";
//var axios = require('axios');
var FormData = require("form-data");  
// var api_url = "http://localhost:3008//web/";
// var api_url = "https://app-backend-dscp.onrender.com/api/mobile/";
axios.defaults.baseURL = "http://localhost:3008/web/";
// axios.defaults.baseURL = "https://task-manger-backend-skr2.onrender.com/web";

export function login(data) {
axios.defaults.headers.post["Content-Type"] = "application/json";
  return axios.post("user/login", data);
}
export function usercreate(data) {
    axios.defaults.headers.post["Content-Type"] = "application/json"; 
    return axios.post("user/create", data);
}

  export function addTableApi(data) { 
    // let token = localStorage.getItem("token"); 
    // axios.defaults.headers.common["Authorization"] = "Bearer " + token; 
    axios.defaults.headers.post["Content-Type"] = "application/json"; 
    return axios.post("table/",data); 
  }

  export function getbookedTable() { 
    // let token = localStorage.getItem("token"); 
    // axios.defaults.headers.common["Authorization"] = "Bearer " + token; 
    axios.defaults.headers.post["Content-Type"] = "application/json"; 
    return axios.post("table/getbookedTable"); 
  }
