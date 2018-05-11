var request = require("request");

var options = { method: 'POST',
    url: 'https://50.254.224.200:8443/logcollectionservice/services/DimeGetFileService',
    rejectUnauthorized: false,
    headers: 
    { 'Cache-Control': 'no-cache',
    'Connection': 'Keep-Alive',
    Authorization: 'Basic YWRtaW5pc3RyYXRvcjpkdXJoYW1t',
    SOAPAction: 'http://schemas.cisco.com/ast/soap/action/#LogCollectionPort#GetOneFile' },
    body: 
    '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://schemas.cisco.com/ast/soap/">'+
    '<soapenv:Header/>'+
    '<soapenv:Body>'+
    '<soap:GetOneFile soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'+
    '<FileName>/var/log/active/cm/trace/ccm/sdl/SDL001_100_001089.txt.gz</FileName>'+
    '</soap:GetOneFile>'+
    '</soapenv:Body>'+
    '</soapenv:Envelope>' 
    };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);

//body contains multiple parts. how to get attachment? 🤷🏼‍♂️


});
