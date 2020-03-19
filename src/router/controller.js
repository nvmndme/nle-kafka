const config = require('../config/config.js');
const kafka = require('kafka-node');
const validator = require('../modules/validator');
// const fs = require('fs');

var Consumer = kafka.Consumer;
const Producer = kafka.HighLevelProducer;

exports.booking = (req, res) => {
    groupId = req.get('Platform-Id');
    validator.validateHeader(groupId);

    var booking = [];
    var kafka_topic = config.bookingTopic;
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
        booking.push(JSON.parse(message.value.toString()));
        if (message.offset == (message.highWaterOffset - 1)) {
            consumer.close(true, function (err, message) {
                res.status(200).json(booking);
            });
        }
    });
    
    consumer.on('error', function (err) {
        console.log('error', err);
        res.status(408).end();
        process.exit();
    });
    
    process.on('SIGINT', function () {
        consumer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
    
    process.on('SIGHUP', function () {
        consumer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
};

exports.sendBooking = (req, res) => {
    const book = req.body;
    const kafka_topic = config.bookingTopic;
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });
    const producer = new Producer(client);
    
    producer.on('ready', function () {
        var message = book;
        
        var payload = [{
            topic: kafka_topic,
            messages: JSON.stringify(message),
            key: book.id_platform,
            attributes: 1 /* Use GZip compression for the payload */
        }];
        
        producer.send(payload, function (error, result) {
            console.info('Sent payload to Kafka: ', payload);
            if (error) {
                console.error('error: ', error);
                res.status(403).end();
                process.exit();
            } else {
                console.log('result: ', result);
                res.status(201).end();
                process.exit();
            }
        });
    });
    
    producer.on('error', function (err) {
        console.log('error', err);
        res.status(408).end();
        process.exit();
    });
    
    process.on('SIGINT', function () {
        producer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
    
    process.on('SIGHUP', function () {
        producer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
};

exports.sendOffer = (req, res) => {
    const offer = req.body;
    const kafka_topic = config.offerTopic;
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });
    const producer = new Producer(client);
    
    producer.on('ready', function () {
        var message = offer;
        
        var payload = [{
            topic: kafka_topic,
            messages: JSON.stringify(message),
            key: offer.idPlatform.toString() + '-' + offer.idRequestBooking.toString(),
            attributes: 1 /* Use GZip compression for the payload */
        }];
        
        producer.send(payload, function (error, result) {
            console.info('Sent payload to Kafka: ', payload);
            if (error) {
                console.error('error: ', error);
                res.status(403).end();
            } else {
                console.log('result: ', result);
                res.status(201).end();
            }
        });
    });
    
    producer.on('error', function (err) {
        console.log('error', err);
        res.status(408).end();
    });
    
    process.on('SIGINT', function () {
        producer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
    
    process.on('SIGHUP', function () {
        producer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
};

exports.sendCheckout = (req, res) => {
    const checkout = req.body;
    const kafka_topic = config.checkoutTopic;
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });
    const producer = new Producer(client);
    
    producer.on('ready', function () {
        var message = checkout;
        
        var payload = [{
            topic: kafka_topic,
            messages: JSON.stringify(message),
            key: checkout.idRequestBooking.toString() + '-' + checkout.idOffer.toString(),
            attributes: 1 /* Use GZip compression for the payload */
        }];
        
        producer.send(payload, function (error, result) {
            console.info('Sent payload to Kafka: ', payload);
            if (error) {
                console.error('error: ', error);
                res.status(403).end();
                process.exit();
            } else {
                console.log('result: ', result);
                res.status(201).end();
            }
        });
    });
    
    producer.on('error', function (err) {
        console.log('error', err);
        res.status(408).end();
        process.exit();
    });
    
    process.on('SIGINT', function () {
        producer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
    
    process.on('SIGHUP', function () {
        producer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
};

exports.checkout = (req, res) => {
    groupId = req.get('Platform-Id');
    validator.validateHeader(groupId);
    
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
        process.exit();
    });
    
    process.on('SIGINT', function () {
        consumer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
    
    process.on('SIGHUP', function () {
        consumer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
    
};

exports.sendPayment = (req, res) => {
    const payment = req.body;
    const kafka_topic = config.paymentTopic;
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });
    const producer = new Producer(client);
    
    producer.on('ready', function () {
        var message = payment;
        
        var payload = [{
            topic: kafka_topic,
            messages: JSON.stringify(message),
            key: payment.idRequestBooking.toString() + '-' + payment.idOffer.toString(),
            attributes: 1 /* Use GZip compression for the payload */
        }];
        
        producer.send(payload, function (error, result) {
            console.info('Sent payload to Kafka: ', payload);
            if (error) {
                console.error('error: ', error);
                res.status(403).end();
            } else {
                console.log('result: ', result);
                res.status(201).end();
            }
        });
    });
    
    producer.on('error', function (err) {
        console.log('error', err);
        res.status(408).end();
        process.exit();
    });
    
    process.on('SIGINT', function () {
        producer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
    
    process.on('SIGHUP', function () {
        producer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
};

//belum diedit
exports.sendTruckDriver = (req, res) => {
    const payment = req.body;
    const kafka_topic = config.paymentTopic;
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });
    const producer = new Producer(client);
    
    producer.on('ready', function () {
        var message = payment;
        
        var payload = [{
            topic: kafka_topic,
            messages: JSON.stringify(message),
            key: payment.idRequestBooking.toString() + '-' + payment.idOffer.toString(),
            attributes: 1 /* Use GZip compression for the payload */
        }];
        
        producer.send(payload, function (error, result) {
            console.info('Sent payload to Kafka: ', payload);
            if (error) {
                console.error('error: ', error);
                res.status(403).end();
            } else {
                console.log('result: ', result);
                res.status(201).end();
            }
        });
    });
    
    producer.on('error', function (err) {
        console.log('error', err);
        res.status(408).end();
        process.exit();
    });
    
    process.on('SIGINT', function () {
        producer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
    
    process.on('SIGHUP', function () {
        producer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
};

//belum diedit
exports.sendBookingStatus = (req, res) => {
    const payment = req.body;
    const kafka_topic = config.paymentTopic;
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });
    const producer = new Producer(client);
    
    producer.on('ready', function () {
        var message = payment;
        
        var payload = [{
            topic: kafka_topic,
            messages: JSON.stringify(message),
            key: payment.idRequestBooking.toString() + '-' + payment.idOffer.toString(),
            attributes: 1 /* Use GZip compression for the payload */
        }];
        
        producer.send(payload, function (error, result) {
            console.info('Sent payload to Kafka: ', payload);
            if (error) {
                console.error('error: ', error);
                res.status(403).end();
            } else {
                console.log('result: ', result);
                res.status(201).end();
            }
        });
    });
    
    producer.on('error', function (err) {
        console.log('error', err);
        res.status(408).end();
        process.exit();
    });
    
    process.on('SIGINT', function () {
        producer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
    
    process.on('SIGHUP', function () {
        producer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
};

//belum diedit
exports.sendTruckStatus = (req, res) => {
    const payment = req.body;
    const kafka_topic = config.paymentTopic;
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });
    const producer = new Producer(client);
    
    producer.on('ready', function () {
        var message = payment;
        
        var payload = [{
            topic: kafka_topic,
            messages: JSON.stringify(message),
            key: payment.idRequestBooking.toString() + '-' + payment.idOffer.toString(),
            attributes: 1 /* Use GZip compression for the payload */
        }];
        
        producer.send(payload, function (error, result) {
            console.info('Sent payload to Kafka: ', payload);
            if (error) {
                console.error('error: ', error);
                res.status(403).end();
            } else {
                console.log('result: ', result);
                res.status(201).end();
            }
        });
    });
    
    producer.on('error', function (err) {
        console.log('error', err);
        res.status(408).end();
        process.exit();
    });
    
    process.on('SIGINT', function () {
        producer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
    
    process.on('SIGHUP', function () {
        producer.close(true, function () {
            res.status(400).end();
            process.exit();
        });
    });
};