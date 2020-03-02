module.exports = (app) => {
    const contr = require('./controller.js');

    // [PLATFORM] Retrieve all available Bookings
    app.get('/Booking', contr.bookings);

    // [PLATFORM] [PENGGUNA JASA] Retrieve Booking detail with user id uid
    app.get('/DetilBooking/idUser/:uid', contr.bookingUid);

    // [PENGGUNA JASA] Post Booking
    app.post('/Booking', contr.sendBooking);

    // [PLATFORM] [PENGGUNA JASA] Retrieve all available Offers with Booking Number bn
    app.get('/offers/:bn', contr.offersBn);

    // [PLATFORM] [PENGGUNA JASA] Retrieve Offer detail with Offer number on
    app.get('/offers/:bn', contr.offerOn);

    // [PLATFORM] Post Offers for Booking number bn
    app.post('/offers/', contr.sendOffers);

};