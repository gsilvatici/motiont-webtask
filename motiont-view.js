"use latest";

var { MongoClient } = require('mongodb');
var handlebars      = require('handlebars');

var view = `
<html>
  <head>
    <title>Phone Crash Records</title>
  </head>
  <body>
    {{#if values.length}}
      <ul>
        {{#each values}}
          <li style="list-style-image: url('http://i.imgur.com/2wQDvBh.png');">
          magnitude: {{acceleration}}m/s2
          location: {{lat}},{{lon}}
          time: {{time}}
          </li>
        {{/each}}
      </ul>
    {{else}}
      <h1>No phone falls/crash registered</h1>
    {{/if}}
  </body>
</html>
`;

return (ctx, req, res) => {
  let { MONGO_URL } = ctx.data;
  MongoClient.connect(MONGO_URL, (err, db) => {
    if(err) return res.end(err);

    db
      .collection('records')
      .find()
      .toArray( (err, values) => {
        if(err) return res.end(err);

        const view_ctx = {
          values: values.sort( (record1, record2) => {
            var aux1 = record1.time.split(' ');
            var aux2 = aux1[0].split('/');
            var aux1 = aux1[1].split(':');
            var time1 = new Date(aux2[2], aux2[0], aux2[1], aux1[0], aux1[1], aux1[2], 0);

            aux1 = record2.time.split(' ');
            aux2 = aux1[0].split('/');
            aux1 = aux1[1].split(':');
            var time2 = new Date(aux2[2], aux2[0], aux2[1], aux1[0], aux1[1], aux1[2], 0);
            return time2 - time1;
          })
        };

        const template = handlebars.compile(view);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(template(view_ctx));
      });
  });
};
