// not use
// var azure = require('azure');
// var storageAccount = '<Your Storage Account>';
// var accessKey = '<Your Access Key>'
// var blobSvc = azure.createBlobService(storageAccount, accessKey);
//
// var express = require('express');
// var formidable = require('formidable'); // the same node module as Azure sample
// var app = express();
//
// app.use(express.static('public'));   // contains a form page using the same code as yours
//
// app.get('/', function(req, res) {
//   res.send('Hello World!');
// });
//
// app.post('/upload', function(req, res) {
//   var form = new formidable.IncomingForm();
//   form.parse(req, function(err, fields, files) {
//     var options = {
//       contentType: files.myfile.type,
//       metadata: { fileName: files.myfile.name }
//     };
//     blobSvc.createBlockBlobFromLocalFile('mycontainer', files.myfile.name, files.myfile.path, options, function(error, result, response) {
//       if(!error){
//         // file uploaded
//         res.send('file uploaded!');
//       }
//     });
//   });
//   //console.log(req);
// });
//
// var server = app.listen(3000, function() {
//   var host = server.address().address;
//   var port = server.address().port;
//   console.log('Example app listening at http://%s:%s', host, port);
// });
