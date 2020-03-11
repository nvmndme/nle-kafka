module.exports = (app) => {
    const contr = require('./controller.js');

    // [PLATFORM] Retrieve all available Bookings
    app.get('/api/bookings', contr.bookings);

    // [PLATFORM] [PENGGUNA JASA] Retrieve Booking detail with user id uid
    app.get('/api/bookings/:uid', contr.bookingUid);

    // [PENGGUNA JASA] Post Booking
    app.post('/api/bookings', contr.sendBooking);

    // [PLATFORM] [PENGGUNA JASA] Retrieve all available Offers with Booking Number bn
    app.get('/api/offers/:bn', contr.offersBn);

    // [PLATFORM] [PENGGUNA JASA] Retrieve Offer detail with Offer number on
    app.get('/api/offers/:on', contr.offerOn);

    // [PLATFORM] Post Offers for Booking number bn
    app.post('/api/offers/', contr.sendOffers);

};