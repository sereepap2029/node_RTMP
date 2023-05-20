const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
    publish: [
      { 
        applicationName: 'live',  // Replace with your desired application name
        streamName: 'streamName', // Replace with your desired stream name
      }
    ],
  },
  http: {
    port: 8000,
    mediaroot: './media',
    allow_origin: '*',
  },
};

const nms = new NodeMediaServer(config);

nms.run();

nms.on('prePublish', (id, streamPath, args) => {
  console.log('[NodeEvent on prePublish]', `id=${id} streamPath=${streamPath} args=${JSON.stringify(args)}`);
  // You can implement additional logic here when a client starts publishing a stream
});

nms.on('donePublish', (id, streamPath, args) => {
  console.log('[NodeEvent on donePublish]', `id=${id} streamPath=${streamPath} args=${JSON.stringify(args)}`);
  // You can implement additional logic here when a client stops publishing a stream
});
