import { upload } from './helperMethods';
const restify  = require('restify');
const corsMiddleware = require('restify-cors-middleware');


const server = restify.createServer();

const formidable = require('formidable'); // the same node module as Azure sample

// cors for React dropzone-upload package, if use a pure input, no need this
const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*'],
  allowHeaders:['X-App-Version'],
  exposeHeaders:[]
});

server.pre(cors.preflight);
server.use(cors.actual);

server.get('/', async (req, res) =>{
  res.send('Hello World!');
});

server.post('/upload', async (req, res) =>{
  console.log('start upload');
  const form = new formidable.IncomingForm();
  form.parse(req, async function(err, fields, files) {
    console.log('******', 'path: ', files.file.path);
    // console.log('****', files.myfile.file, files.myfile.filepath, files.myfile.type);
    // const options = {
    //   contentType: files.myfile.type,
    //   metadata: {fileName: files.myfile.name},
    // };

    await upload(files.file.path);
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ fields, files }, null, 2));
    /*blobSvc.createBlockBlobFromLocalFile('mycontainer', files.myfile.name, files.myfile.path, options, function(error, result, response) {
      if(!error){
        // file uploaded


        res.send('file uploaded!');
      }
    });*/
  });
  //console.log(req);
});

server.listen(process.env.port || process.env.PORT || 3000, () => {
  console.log(`\n${server.name} listening to ${server.url}`);
});
