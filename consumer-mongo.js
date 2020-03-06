const MongoClient = require('mongodb').MongoClient;
var kafka = require("kafka-node");
const assert = require('assert');
const config = require('./config.js');

var Consumer = kafka.Consumer;

const url = 'mongodb://nle1:nle1@10.161.3.9:27018/nle';
var topic = 'testingnle';
const dbName = 'nle';

var client = new kafka.KafkaClient({
    kafkaHost: config.kafka_host
});

var consumer = new Consumer(client, [{
    topic: topic,
    partition: 0
}], {
    autoCommit: false,
    // fromOffset: 'earliest',
    encoding: 'buffer',
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024
});

function saveToMongoDB(message, dbName, clientMongo) {
    clientMongo.connect(function (err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        const db = clientMongo.db(dbName);

        db.collection('booking').insertOne(message, function (err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
            console.log("Inserted 1 document")

            // client.close();
        });
    });
}

consumer.on("message", function (message) {
    const clientMongo = new MongoClient(config.mongourl);
    var buf = new Buffer.from(message.value, 'binary');
    var decodedMessage = type.fromBuffer(buf.slice(0));
    console.log(decodedMessage);
    saveToMongoDB(decodedMessage, dbName, clientMongo);
    /** { topic: 'cat', value: 'I have 385 cats', offset: 412, partition: 0, highWaterOffset: 413, key: null } */
});

consumer.on('error', function (err) {
    console.log('error', err);
});

process.on('SIGINT', function () {
    consumer.close(true, function () {
        process.exit();
    });
});