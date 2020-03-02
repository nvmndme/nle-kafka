const config = require('./config.js');
const kafka = require('kafka-node');

exports.bookings = (req, res) => {
    var kafka_topic_parent = 'nle-booking';
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });

    var Consumer = kafka.Consumer;
    // var Offset = kafka.Offset;
    var booking = [];
    var consumer = new Consumer(client, [{
        topic: kafka_topic_parent,
        partition: 0,
        offset: 0
    }], {
        autoCommit: false,
        encoding: 'buffer',
        fromOffset: 'earliest'
    });
    // var offset = new Offset(client);

    consumer.on("message", function (message) {
        booking.push(message.value.toString());
        var kafka_topic_child = 'nle-booking-'+message.value.id.toString();
        // console.log(booking);
        if (message.offset == (message.highWaterOffset - 1)) {
            consumer.close(true, function (err, message) {
                res.send(booking);
                // console.log(booking);
                // console.log("consumer has been closed..");
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
};

exports.bookingBn = (req, res) => {

};

exports.sendBooking = (req, res) => {
    const kafka_topic = 'nle-booking3';
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });

    const book = req.body;

    const Producer = kafka.HighLevelProducer;
    const producer = new Producer(client);

    var messageR = producer.on('ready', async function () {
        var message = {
            idRequestBooking: '123123',
            bookingDate: 'coba'
        };

        var payload = [{
            topic: kafka_topic,
            messages: JSON.stringify(message),
            key: '1',
            attributes: 1 /* Use GZip compression for the payload */
        }];

        var sent = producer.send(payload, function (error, result) {
            console.info('Sent payload to Kafka: ', payload);
            if (error) {
                console.error('error: ', error);
                res.status(403).send('error');
            } else {
                var formattedResult = result[0];
                console.log('result: ', result)
                return result;
            }
        });

        return sent;
    });

    res.status(200).send(messageR);
};

exports.offersBn = (req, res) => {

};

exports.offerOn = (req, res) => {

};

exports.sendOffers = (req, res) => {

};