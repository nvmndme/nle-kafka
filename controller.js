const config = require('./config.js');
const kafka = require('kafka-node');
const fs = require('fs');

exports.bookings = (req, res) => {
    var booking = [];
    var kafka_topic_parent = 'nle-bookingCreated';
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });

    var Consumer = kafka.Consumer;

    var consumer = new Consumer(client, [{
        topic: kafka_topic_parent,
        partition: 0,
        offset: 0
    }], {
        autoCommit: false,
        encoding: 'buffer',
        fromOffset: 'earliest'
    });

    consumer.on("message", function (message) {
        booking.push(message.value.toString());
        // var kafka_topic_child = 'nle-booking-' + message.value.id.toString();

        if (message.offset == (message.highWaterOffset - 1)) {
            consumer.close(true, function (err, message) {
                res.send(JSON.parse(booking));
            });
        }
    });

    consumer.on('error', function (err) {
        console.log('error', err);
    });

    process.on('SIGINT', function () {
        consumer.close(true, function () {
            process.exit();
        });
    });

    process.on('SIGHUP', function () {
        consumer.close(true, function () {
            process.exit();
        });
    });
};

exports.offersBn = (req, res) => {
    var offer = [];
    var kafka_topic_parent = 'nle-offerCreated';
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });

    var Consumer = kafka.Consumer;

    var consumer = new Consumer(client, [{
        topic: kafka_topic_parent,
        partition: 0,
        offset: 0
    }], {
        autoCommit: false,
        encoding: 'buffer',
        fromOffset: 'earliest'
    });

    consumer.on("message", function (message) {
        offer.push(message.value.toString());

        if (message.offset == (message.highWaterOffset - 1)) {
            consumer.close(true, function (err, message) {
                res.send(JSON.parse(offer));
            });
        }
    });

    consumer.on('error', function (err) {
        console.log('error', err);
    });

    process.on('SIGINT', function () {
        consumer.close(true, function () {
            process.exit();
        });
    });

    process.on('SIGHUP', function () {
        consumer.close(true, function () {
            process.exit();
        });
    });
};

exports.sendBooking = (req, res) => {
    const book = JSON.parse(fs.readFileSync('exampleRequestBookingTrue.json'));
    // const book = req.body;
    const kafka_topic = 'nle-bookingCreated';
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });
    const Producer = kafka.HighLevelProducer;
    const producer = new Producer(client);

    producer.on('ready', function () {
        var message = {
            idRequestBooking: book.idRequestBooking,
            booking_date: book.booking_date,
            destination: book.destination,
            depo: book.depo,
            plan_date: book.plan_date,
            bl_no: book.bl_no,
            bl_date: book.bl_date,
            sp2valid_date: book.sp2valid_date,
            spcvalid_date: book.spcvalid_date,
            gross_weight: book.gross_weight,
            id_platform: book.id_platform,
            pod_lat: book.pod_lat,
            pod_lon: book.pod_lon,
            destination_lat: book.destination_lat,
            destination_lon: book.destination_lon,
            depo_lat: book.depo_lat,
            depo_lon: book.depo_lon,
            total_distance: book.total_distance,
            container: book.container,
            platform: book.platform,
            pod: book.pod
        };

        var payload = [{
            topic: kafka_topic,
            messages: JSON.stringify(message),
            key: book.id_platform,
            attributes: 1 /* Use GZip compression for the payload */
        }];

        var sent = producer.send(payload, function (error, result) {
            console.info('Sent payload to Kafka: ', payload);
            if (error) {
                console.error('error: ', error);
                res.status(403).send('error');
                process.exit();
            } else {
                var formattedResult = result[0];
                console.log('result: ', result);
                res.status(200).send(result);
            }
        });
    });

    producer.on('error', function (err) {
        console.log('error', err);
    });

    process.on('SIGINT', function () {
        producer.close(true, function () {
            process.exit();
        });
    });

    process.on('SIGHUP', function () {
        producer.close(true, function () {
            process.exit();
        });
    });


};

exports.sendOffers = (req, res) => {
    // const offer = req.body;

    const kafka_topic = 'nle-offerCreated';
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });
    const Producer = kafka.HighLevelProducer;
    const producer = new Producer(client);

    var messageR = producer.on('ready', function () {
        var message = {
            idRequestBooking: offer.idRequestBooking,
            idServiceOrder: offer.idServiceOrder,
            hargaPenawaran: offer.hargaPenawaran,
            waktuPenawaran: offer.waktuPenawaran,
            timestamp: offer.timestamp,
            status: offer.status,
            paidStatus: offer.paidStatus,
            idPlatform: offer.idPlatform,
            isBooked: offer.isBooked,
            created_date: offer.created_date,
            booked_date: offer.booked_date,
            payment_method: offer.payment_method,
            dtransporter: offer.dtransporter
        };

        var payload = [{
            topic: kafka_topic,
            messages: JSON.stringify(message),
            key: offer.idPlatform.toString() + offer.idRequestBooking.toString(),
            attributes: 1 /* Use GZip compression for the payload */
        }];

        var sent = producer.send(payload, function (error, result) {
            console.info('Sent payload to Kafka: ', payload);
            if (error) {
                console.error('error: ', error);
                res.status(403).send('error');
            } else {
                var formattedResult = result[0];
                console.log('result: ', result);
                return result;
            }
        });
        return sent;
    });
    res.status(200).send(messageR);

    producer.on('error', function (err) {
        console.log('error', err);
    });

    process.on('SIGINT', function () {
        producer.close(true, function () {
            process.exit();
        });
    });

    process.on('SIGHUP', function () {
        producer.close(true, function () {
            process.exit();
        });
    });
};

exports.bookingUid = (req, res) => {};
exports.offerOn = (req, res) => {};