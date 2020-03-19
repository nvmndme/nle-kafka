module.exports = (app) => {
    const contr = require('./controller.js');

    // [PLATFORM] Retrieve all available Bookings
    app.get('/api/bookings', contr.booking);

    // [PENGGUNA JASA] Post Booking
    app.post('/api/bookings', contr.sendBooking);

    // [PLATFORM] Post Offers for Booking number bn
    app.post('/api/offers', contr.sendOffer);

    // [PENGGUNA JASA] Post checkout Offer
    app.post('/api/checkouts', contr.sendCheckout);

    // [PLATFORM] Retrieve checkout Offer
    app.get('/api/checkouts', contr.checkout);

    // [PLATFORM] Post payment
    app.post('/api/payments', contr.sendPayment);

    // [PLATFORM] Post Trucks and Drivers Data
    app.post('/api/trucks', contr.sendTruckDriver);

    // [PLATFORM] Update Booking Status
    app.put('/api/bookings/status', contr.sendBookingStatus);

    // [PLATFORM] Update Truck Status
    app.put('/api/trucks/status', contr.sendTruckStatus);
};