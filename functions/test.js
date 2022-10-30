const axios = require('axios');
const msg = "ABC";

const callApi = () =>{
    axios({
        method: 'post',
        url: 'https://u2qhwsjw17.execute-api.us-east-1.amazonaws.com/dev/demo-serverless-dev-functionSlack',
        header: {'Content-Type':'application/json'},
        data: msg
    })
    .then((res)=>{console.log(res)})
    .catch((err)=>{console.log(err)});
}

callApi();


