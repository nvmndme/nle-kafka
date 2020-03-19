const config = require('../config/config.js');
const kafka = require('kafka-node');
const validator = require('../modules/validator');

var Consumer = kafka.Consumer;

//KAFKA -> PLATFORM
exports.booking = (req, res, next) => {
    groupId = req.get('Platform-Id');
    validator.validateHeader(res, groupId);
    
    var booking = [];
    var kafka_topic = config.bookingTopic;
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });
    
    var consumer = new Consumer(client, [{
        topic: kafka_topic,
        partition: 0,
        offset: -1
    }], {
        autoCommit: true,
        encoding: 'buffer',
        // autoCommitIntervalMs: 500,
        fetchMaxWaitMs: 100,
        fetchMinBytes: 1,
        fetchMaxBytes: 1024 * 1024,
        groupId: groupId,
        sessionTimeout: 15000,
        protocol: ['roundrobin'],
        id: groupId,
        commitOffsetsOnFirstJoin: false
    });
    
    consumer.on("message", function (message) {
        booking.push(JSON.parse(message.value.toString()));
        if (message.offset == (message.highWaterOffset - 1)) {
            res.status(200).json(booking);
        }
    });
    
    consumer.on('error', function (err) {
        console.log('error', err);
        res.status(408).end();
    });
};

//KAFKA -> PLATFORM
exports.checkout = (req, res) => {
    groupId = req.get('Platform-Id');
    validator.validateHeader(res, groupId);
    
    var checkout = [];
    var groupId = req.get('Platform-Id');
    var kafka_topic = config.checkoutTopic;
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });
    
    var consumer = new Consumer(client, [{
        topic: kafka_topic,
        partition: 0,
        // offset: 0
    }], {
        autoCommit: true,
        encoding: 'buffer',
        autoCommitIntervalMs: 5000,
        fetchMaxWaitMs: 100,
        fetchMinBytes: 1,
        fetchMaxBytes: 1024 * 1024,
        groupId: groupId,
        sessionTimeout: 15000,
        protocol: ['roundrobin'],
        id: groupId
    });
    
    consumer.on("message", function (message) {
        checkout.push(JSON.parse(message.value.toString()));
        
        if (message.offset == (message.highWaterOffset - 1)) {
            consumer.close(true, function (err, message) {
                res.status(200).json(checkout);
            });
        }
    });
    
    consumer.on('error', function (err) {
        console.log('error', err);
        res.status(408).end();
        
    });
    
    process.on('SIGINT', function () {
        consumer.close(true, function () {
            res.status(400).end();
            
        });
    });
    
    process.on('SIGHUP', function () {
        consumer.close(true, function () {
            res.status(400).end();
            
        });
    });
    
};