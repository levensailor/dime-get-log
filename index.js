var http = require('http'),
    path = require('path'),
    os = require('os'),
    fs = require('fs');

var request = require("request");
var options = { method: 'POST',
    url: 'https://50.254.224.200:8443/logcollectionservice/services/DimeGetFileService',
    rejectUnauthorized: false,
    headers: 
    {
    Authorization: 'Basic YWRtaW5pc3RyYXRvcjpkdXJoYW1t',
    SOAPAction: 'http://schemas.cisco.com/ast/soap/action/#LogCollectionPort#GetOneFile' 
    },
    encoding: 'binary',
    gzip: true,
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

request(options, function (error, res, body) {
  if (error) throw new Error(error);

  //   // let boundaryRegex = new RegExp(/boundary=(\S+)/g);
  //   // const header = JSON.stringify(res.headers);
  //   // const boundary = '--' + boundaryRegex.exec(header)[1]; // We obtain the boundary here
  //   // rawFileContent = rawBody.split(boundary);

  rawBody = Buffer.from(res.body);
  start = 0;
  end = rawBody.length;
  for (x=0; x<12; x++){
    start = rawBody.indexOf('\r\n',start);
    start += 2;
  }
  for (z=rawBody.length; z>rawBody.length-2; z--){
    end = rawBody.indexOf('\r\n',end);
    end -= 2;
  }
  console.log('length: '+rawBody.length);
  console.log('end: '+end);
  rawFileContent = rawBody.slice(start).slice(-(rawBody.length), -444);

  fs.writeFile('syslog.txt.gz', rawFileContent, function(err){});

});
