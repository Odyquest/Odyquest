import { deserialize, serialize } from 'typescript-json-serializer';
import { getSimpleJwksService, secure } from 'express-oauth-jwt';

import bodyParser from 'body-parser';
import cors from 'cors';
import express, { RequestHandler } from 'express';
import multer from 'multer';

import { DataHandling } from './data-handling';
import { getCorsOrigin, getApiPort, getUseAuth, getAuthIssuesBaseUrl, getAuthJwksUrl } from './environment';
import { Chase, ChaseList, ChaseMetaData, Image, Media, MediaContainer } from './chase-model';
import { Access, AccessLevel } from './access';

export const app = express();
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
app.use(bodyParser.json() as RequestHandler);

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
  new DataHandling(new Access(AccessLevel.Public)).getChaseList().then(list => {
    res.send(serialize(list as ChaseList));
  }).catch(() => {
    res.status(500);
    const chases = new ChaseList();
    res.send(serialize(chases));
  });
});

app.get('/protected/chase', (req, res) => {
  new DataHandling(new Access(AccessLevel.Protected)).getChaseList().then(list => {
    res.send(serialize(list as ChaseList));
  }).catch(() => {
    res.status(500);
    const chases = new ChaseList();
    res.send(serialize(chases));
  });
});

app.get('/chase/*', (req, res) => {
  new DataHandling(new Access(AccessLevel.Public)).getChase(req.params[0]).then(chase => {
    res.send(serialize(chase as Chase));
  }).catch(() => {
    res.status(500);
    res.send('{}');
  });
});

app.get('/protected/chase/*', (req, res) => {
  new DataHandling(new Access(AccessLevel.Protected)).getChase(req.params[0]).then(chase => {
    res.send(serialize(chase as Chase));
  }).catch(() => {
    res.status(500);
    res.send('{}');
  });
});

app.post('/protected/chase', function (req, res) {
  const chase = deserialize(req.body, Chase);
  console.log('received chase', chase, ' from string ', req.body);
  new DataHandling(new Access(AccessLevel.Protected)).createOrUpdateChase(chase).then(id => {
    res.send('{ "chaseId": "' + id + '" }');
  }).catch(() => {
    res.status(500);
    res.send('{}');
  });
});

app.delete('/protected/chase/*', function (req, res) {
  new DataHandling(new Access(AccessLevel.Protected)).deleteChase(req.params[0]).then(id => {
    res.send('{ "status": "success" }');
  }).catch(() => {
    res.status(500);
    res.send('{ "status": "failed" }');
  });
});

app.get('/media/*/*', (req, res) => {
  new DataHandling(new Access(AccessLevel.Public)).getMedia(req.params[0], req.params[1]).then(data => {
    res.send(serialize(new MediaContainer(data)));
  }).catch(() => {
    res.status(500);
    res.send('');
  });
});

app.get('/protected/media/*/*', (req, res) => {
  new DataHandling(new Access(AccessLevel.Protected)).getMedia(req.params[0], req.params[1]).then(data => {
    res.send(serialize(new MediaContainer(data)));
  }).catch(() => {
    res.status(500);
    res.send('');
  });
});

app.post('/protected/media', upload.single('file'), function (req, res) {
  console.log('received media data');
  const container = deserialize<MediaContainer>(req.body, MediaContainer);
  console.log('deserialized media data');
  const media = container.get();
  console.log('extracted media data from container: ', media);
  new DataHandling(new Access(AccessLevel.Protected)).createOrUpdateMedia(media).then(media => {
    res.send('{ "mediaId": "' + media.mediaId + '" }');
  }).catch(() => {
    res.send('error');
  });
});

app.delete('/protected/media/*/*', upload.single('file'), function (req, res) {
  new DataHandling(new Access(AccessLevel.Protected)).deleteMedia(req.params[0], req.params[1]).then(data => {
    // TODO
    res.send(data);
  }).catch(() => {
    res.status(500);
    res.send('');
  });
});

app.get('/file/*/*/*', (req, res) => {
  // do not limit file access right now
  new DataHandling(new Access(AccessLevel.Protected)).getMediaFile(req.params[0], req.params[1], req.params[2]).then(file => {
    res.setHeader("Content-Type", file.mimetype);
    res.send(file.data);
  }).catch(() => {
    res.status(500);
    res.send('');
  });
});

app.get('/protected/file/*/*/*', (req, res) => {
  new DataHandling(new Access(AccessLevel.Protected)).getMediaFile(req.params[0], req.params[1], req.params[2]).then(file => {
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
function addMediaFile(handling: DataHandling, req:express.Request): Promise<Media> {
  return handling.addMediaFile(req.body.chaseId, req.body.mediaId, req.file.originalname, getMimetype(req), req.file.buffer);
}

app.post('/protected/file', upload.single('file'), function (req, res) {
  const handling = new DataHandling(new Access(AccessLevel.Protected))
  console.log('received media data');
  addMediaFile(handling, req).then(media => {
    res.send(serialize(new MediaContainer(media)));
  }).catch(() => {
    res.send('error');
  });
});

app.delete('/protected/file/*/*/*', upload.single('file'), function (req, res) {
  new DataHandling(new Access(AccessLevel.Protected)).deleteMediaFile(req.params[0], req.params[1], req.params[2]).then(media => {
    res.send(serialize(new MediaContainer(media)));
  }).catch(() => {
    res.status(500);
    res.send('');
  });
});

app.get("/stream/*/*/*", function (req, res) {
  // do not limit file access right now
  const handling = new DataHandling(new Access(AccessLevel.Protected));
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  const videoSize = handling.getMediaFileSize(req.params[0], req.params[1], req.params[2]);

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number((range as string).replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers); // Partial Content

  const videoStream = handling.getMediaFileStream(req.params[0], req.params[1], req.params[2], start, end);
  videoStream.pipe(res);
});

const port = getApiPort();

app.listen(port, () => {
    console.log('The application is listening on port ' + port + '!');
})

