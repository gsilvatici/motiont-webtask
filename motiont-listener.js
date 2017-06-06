var MongoClient = require('mongodb').MongoClient;

function save_data(values, db, cb) {
  var doc = values;

  db
    .collection('records')
    .insertOne(doc, function (err) {
      if(err) return cb(err);

      console.log('Successfully saved %s' + doc.toString);

      cb(null);
    });
}

module.exports = function (ctx, done) {
  var values = {
    acceleration: ctx.data.accel,
    time: ctx.data.time,
    lat: ctx.data.lat,
    lon: ctx.data.lon
  };

  MongoClient.connect(ctx.data.MONGO_URL, function (err, db) {
    if(err) return done(err);

    save_data(values, db,function (err) {
          if(err) return done(err);

          done(null);
        });

    done(null, 'Success.');

  });
};
