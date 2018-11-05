'use strict';

const request = require('request');
const fs = require('fs');

const common = require('./common');

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect';

function detect(image,callback){


var fileUpload = fs.readFileSync(image);
// Request parameters.
const params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
        'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
};

const options = {
    uri: uriBase,
    qs: params,
    body: fileUpload,
    headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key' : common.subscriptionKey
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
    //console.log(jsonResponse[0]["faceId"]);
    console.log(jsonResponse);
   //callback(jsonResponse[0]["faceId"]);
  });


}

/*
detect('face-1.jpg', (faceId) => {
    console.log(faceId);
});*/

exports.detect = detect;


