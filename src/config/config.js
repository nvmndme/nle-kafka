module.exports = {
    // url: 'mongodb://10.241.145.145:27017/officedjbc',
    kafka_host: 'kafkadrc01.customs.go.id:9092,kafkadrc02.customs.go.id:9092,kafkadrc03.customs.go.id:9092',
    // kafka_host: 'localhost:9092',
    port: 3000,
    mongourl: 'mongodb://nle1:nle1@10.161.3.9:27018/nle',
    dbname: 'nle',
    bookingTopic: 'nle-bookingCreated',
    offerTopic: 'nle-offerCreated',
    checkoutTopic: 'nle-checkedOut',
    paymentTopic: 'nle-paid'
};