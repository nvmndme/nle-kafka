const config = require('./config.js');
const kafka = require('kafka-node');

exports.bookings = (req, res) => {
    const kafka_topic = nle-bookings;
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });

    var Consumer = kafka.Consumer;
    // var Offset = kafka.Offset;

    var consumer = new Consumer(client, [{
        topic: kafka_topic,
        partition: 0,
        offset: 0
    }], {
        autoCommit: false,
        encoding: 'buffer',
        fromOffset: 'earliest'
    });
    // var offset = new Offset(client);

    bookings = consumer.on("message", function (message) {
        return message;
    });

    consumer.on('error', function (err) {
        console.log('error', err);
    });

    process.on('SIGINT', function () {
        consumer.close(true, function () {
            process.exit();
        });
    });
    
    res.send(bookings);
};

exports.bookingBn = (req, res) => {

};

exports.sendBooking = (req, res) => {
    const kafka_topic = 'nle-bookings';
    const client = new kafka.KafkaClient({
        kafkaHost: config.kafka_host
    });

    const book = req.body;

    const Producer = kafka.HighLevelProducer;
    const producer = new Producer(client);
    
    var messageR = producer.on('ready', async function () {
        var message = {
            idRequestBooking: '123123',
            booking_date: ' 19/02/2020',
            destination: 'Cikarang Dry Port',
            bl_no: '678768' 
        };

        var payload = [{
            topic: kafka_topic,
            messages: message,
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