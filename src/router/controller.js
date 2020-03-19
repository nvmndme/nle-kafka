const config = require('../config/config.js');
const kafka = require('kafka-node');
const validator = require('../modules/validator');
// const fs = require('fs');

const Producer = kafka.HighLevelProducer;

//NLE -> KAFKA
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
            key: book.idRequestBooking,
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
            
        });
    });
    
    process.on('SIGHUP', function () {
        producer.close(true, function () {
            res.status(400).end();
            
        });
    });
};

//PLATFORM -> KAFKA
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
            key: offer.idRequestBooking.toString(),
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
            
        });
    });
    
    process.on('SIGHUP', function () {
        producer.close(true, function () {
            res.status(400).end();
            
        });
    });
};

//NLE -> KAFKA
exports.sendCheckout = (req, res) => {
    //API-04
    //idRequestBooking, idServiceOrder, idPlatform, payment_method, payment_channel
    
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
            key: checkout.idRequestBooking.toString(),
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
            
        });
    });
    
    process.on('SIGHUP', function () {
        producer.close(true, function () {
            res.status(400).end();
            
        });
    });
};

//PLATFORM -> KAFKA
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
            key: payment.idRequestBooking.toString(),
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
            
        });
    });
    
    process.on('SIGHUP', function () {
        producer.close(true, function () {
            res.status(400).end();
            
        });
    });
};

//PLATFORM -> KAFKA
exports.sendTruckDriver = (req, res) => {
    const truckDriver = req.body;
    const kafka_topic = config.truckTopic;
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });
    const producer = new Producer(client);
    
    producer.on('ready', function () {
        var message = truckDriver;
        
        var payload = [{
            topic: kafka_topic,
            messages: JSON.stringify(message),
            key: payment.idRequestBooking.toString(),
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
            
        });
    });
    
    process.on('SIGHUP', function () {
        producer.close(true, function () {
            res.status(400).end();
            
        });
    });
};

//PLATFORM -> KAFKA
exports.sendBookingStatus = (req, res) => {
    const bookingStatus = req.body;
    const kafka_topic = config.bookingStatusTopic;
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });
    const producer = new Producer(client);
    
    producer.on('ready', function () {
        var message = bookingStatus;
        
        var payload = [{
            topic: kafka_topic,
            messages: JSON.stringify(message),
            key: payment.idRequestBooking.toString(),
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
            
        });
    });
    
    process.on('SIGHUP', function () {
        producer.close(true, function () {
            res.status(400).end();
            
        });
    });
};

//PLATFORM -> KAFKA
exports.sendTruckStatus = (req, res) => {
    const truckStatus = req.body;
    const kafka_topic = config.truckStatusTopic;
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });
    const producer = new Producer(client);
    
    producer.on('ready', function () {
        var message = truckStatus;
        
        var payload = [{
            topic: kafka_topic,
            messages: JSON.stringify(message),
            key: payment.idRequestBooking.toString(),
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
            
        });
    });
    
    process.on('SIGHUP', function () {
        producer.close(true, function () {
            res.status(400).end();
            
        });
    });
};

process.on('SIGINT', function () {
    process.exit();
});