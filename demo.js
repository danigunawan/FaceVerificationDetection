'use strict';

const request = require('request');
const common = require('./common');

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase = 'https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect';

const imageUrl =
    'https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/02/24/Pictures/sachin-tendulkar_8c783f46-1959-11e8-80b7-5f600041ef82.jpg';
//    'https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg';

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
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : common.subscriptionKey
    }
};

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  let jsonResponse = JSON.parse(body);
  console.log('JSON Response\n');
  console.log(JSON.stringify(jsonResponse, null, '  '));
});

