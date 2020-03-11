module.exports = (app) => {
    const contr = require('./controller.js');

    // [PLATFORM] Retrieve all available Bookings from Platform :id
    app.get('/api/bookings', contr.bookings);

    // [PLATFORM] [PENGGUNA JASA] Retrieve Booking detail with user id uid
    app.get('/api/bookings/:uid', contr.bookingUid);

    // [PENGGUNA JASA] Post Booking
    app.post('/api/bookings', contr.sendBooking);

    // [PLATFORM] Post Offers for Booking number bn
    app.post('/api/offers', contr.sendOffers);

    // [PENGGUNA JASA] Post Selected Offer
    app.post('/api/selectOffer', contr.sendSelectedOffer);

    // [PLATFORM] Retrieve Selected Offer
    app.get('/api/selectOffer', contr.sendSelectedOffer);
};