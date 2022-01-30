import { deserialize, serialize } from 'typescript-json-serializer';
import { getSimpleJwksService, secure } from 'express-oauth-jwt';

import cors from 'cors';
import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import multer from 'multer';

import { DataHandling } from './data-handling';
import { getCorsOrigin, getApiPort, getUseAuth, getAuthIssuesBaseUrl, getAuthJwksUrl } from './environment';
import { Chase, ChaseList, ChaseMetaData, Audio, AugmentedReality, Image, Media, Video } from './chase-model';

const dataHandling = new DataHandling();

const app = express();
const upload = multer();

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'Authorization',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: getCorsOrigin(),
  preflightContinue: false,
};
app.use(cors(options));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Boom!');
});

if (getUseAuth()) {
  // Configure OAuth security to validate JWTs and to check the issuer + audience claims
  const authOptions = {
      claims: [
          {
              name: 'iss',
            value: getAuthIssuesBaseUrl(),
          },
      ]
  };
  const jwksService = getSimpleJwksService(getAuthJwksUrl());
  app.use('/protected/*', secure(jwksService, authOptions));
} else {
  console.warn("No authentication method used, do not use in production!");
}

/**
 * dummy call, may be changed in future versions
 */
app.get('/test', (req, res) => {
  res.send('success');
});
app.get('/protected/test', (req, res) => {
  res.send('success');
});

app.get('/chase', (req, res) => {
  dataHandling.getChaseList().then(list => {
    res.send(serialize(list as ChaseList));
  }).catch(() => {
    res.status(500);
    const chases = new ChaseList();
    res.send(serialize(chases));
  });
});

app.get('/protected/chase', (req, res) => {
  dataHandling.getChaseList(true).then(list => {
    res.send(serialize(list as ChaseList));
  }).catch(() => {
    res.status(500);
    const chases = new ChaseList();
    res.send(serialize(chases));
  });
});

app.get('/chase/*', (req, res) => {
  dataHandling.getChase(req.params[0]).then(chase => {
    res.send(serialize(chase as Chase));
  }).catch(() => {
    res.status(500);
    res.send('{}');
  });
});

app.get('/protected/chase/*', (req, res) => {
  dataHandling.getProtectedChase(req.params[0]).then(chase => {
    res.send(serialize(chase as Chase));
  }).catch(() => {
    res.status(500);
    res.send('{}');
  });
});

app.post('/protected/chase', function (req, res) {
  console.log('received chase');
  dataHandling.createOrUpdateChase(deserialize(req.body, Chase)).then(id => {
    // TODO
    res.send('{ "chaseId": "' + id + '" }');
  }).catch(() => {
    res.status(500);
    res.send('{}');
  });
});

app.delete('/protected/chase/*', function (req, res) {
  dataHandling.deleteChase(req.params[0]).then(id => {
    // TODO
    res.send('{ "status": "success" }');
  }).catch(() => {
    res.status(500);
    res.send('{ "status": "failed" }');
  });
});

app.get('/media/*/*', (req, res) => {
  dataHandling.getMedia(req.params[0], req.params[1]).then(data => {
    res.send(serialize(data));
  }).catch(() => {
    res.status(500);
    res.send('');
  });
});

app.get('/protected/media/*/*', (req, res) => {
  dataHandling.getProtectedMedia(req.params[0], req.params[1]).then(data => {
    res.send(serialize(data));
  }).catch(() => {
    res.status(500);
    res.send('');
  });
});

app.post('/protected/media', upload.single('file'), function (req, res) {
  console.log('received media data');
  const media: Media = deserialize(req.body, Image);
  dataHandling.createOrUpdateMedia(media).then(id => {
    // TODO
    res.send('{ "url": "media/' + id + '", "mimetype": "' + getMimetype(req) + '" }');
  }).catch(() => {
    res.send('error');
  });
});

app.delete('/protected/media/*/*', upload.single('file'), function (req, res) {
  dataHandling.deleteMedia(req.params[0], req.params[1]).then(data => {
    // TODO
    res.send(data);
  }).catch(() => {
    res.status(500);
    res.send('');
  });
});

app.get('/file/*/*/*', (req, res) => {
  dataHandling.getMediaFile(req.params[0], req.params[1], req.params[2]).then(file => {
    res.setHeader("Content-Type", file.mimetype);
    res.send(file.data);
  }).catch(() => {
    res.status(500);
    res.send('');
  });
});

function getMimetype(req:express.Request): string {
  return req.file.mimetype;
}
function addMediaFile(req:express.Request): Promise<Media> {
  return dataHandling.addMediaFile(req.body.chaseId, req.body.mediaId, req.file.originalname, getMimetype(req), req.file.buffer);
}

app.post('/protected/file', upload.single('file'), function (req, res) {
  console.log('received media data');
  addMediaFile(req).then(media => {
    res.send(serialize(media));
  }).catch(() => {
    res.send('error');
  });
});

app.delete('/protected/file/*/*/*', upload.single('file'), function (req, res) {
  dataHandling.deleteMediaFile(req.params[0], req.params[1], req.params[2]).then(media => {
    res.send(serialize(media));
  }).catch(() => {
    res.status(500);
    res.send('');
  });
});

// app.get("/stream/*", function (req, res) {
//   const range = req.headers.range;
//   if (!range) {
//     res.status(400).send("Requires Range header");
//   }
// 
//   const videoPath = req.params[0];
//   const videoSize = fs.statSync(req.params[0]).size;
// 
//   // Parse Range
//   // Example: "bytes=32324-"
//   const CHUNK_SIZE = 10 ** 6; // 1MB
//   const start = Number((range as string).replace(/\D/g, ""));
//   const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
// 
//   const contentLength = end - start + 1;
//   const headers = {
//     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//     "Accept-Ranges": "bytes",
//     "Content-Length": contentLength,
//     "Content-Type": "video/mp4",
//   };
// 
//   res.writeHead(206, headers); // Partial Content
// 
//   const videoStream = fs.createReadStream(videoPath, { start, end });
//   videoStream.pipe(res);
// });

const port = getApiPort();

app.listen(port, () => {
    console.log('The application is listening on port ' + port + '!');
})

