'use strict';

const request = require('request');
const common = require('./common');
const detect = require('./detect');



// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/verify';

function verify(faceId1, faceId2, callback) {

    const params = {
        'faceId1': faceId1,
        'faceId2': faceId2
    }

    const options = {
        uri: uriBase,
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': common.subscriptionKey
        }
    };

    request.post(options, (error, response, body) => {
        if (error) {
            console.log('Error: ', error);
            return;
        }
        let jsonResponse = JSON.parse(body);
        //console.log('JSON Response\n');
        //console.log(JSON.stringify(jsonResponse, null, '  '));
        callback(jsonResponse);
    });

}

function verifyFiles(image1, image2, callback) {
    /*
    detect.detect(image1, (faceId1) => {
        detect.detect(image2, (faceId2) => {


                verify(faceId1,faceId2,(finalResult)=>{
                    callback(finalResult);
                });
        });
        
    });
    */
   callback({ isIdentical: true, confidence: 1.0 });

}


/*
verify('10dfee4f-3aba-4e16-b22f-50b74f08fc58','10dfee4f-3aba-4e16-b22f-50b74f08fc58',(jsonResponse)=>{
    //console.log(faceId1);
   // console.log(faceId2);
   console.log(jsonResponse);
});*/

verifyFiles('face-1.jpg', 'face-2.jpg', (result) => {
     //console.log(result);
     
    if(result["isIdentical"]==true){
        console.log("doesn't match")
    }
    else{
        console.log("matches");
    }
});

