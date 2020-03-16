var booking = {
    name: 'Booking',
    type: 'record',
    fields: [{
        name: 'idRequestBooking',
        type: ['string', 'null']
    }, {
        name: 'booking_date',
        type: ['string', 'null']
    }, {
        name: 'destination',
        type: ['string', 'null']
    }, {
        name: 'depo',
        type: ['string', 'null']
    }, {
        name: 'plan_date',
        type: ['string', 'null']
    }, {
        name: 'bl_no',
        type: ['string', 'null']
    }, {
        name: 'bl_date',
        type: ['string', 'null']
    }, {
        name: 'sp2valid_date',
        type: ['string', 'null']
    }, {
        name: 'gross_weight',
        type: ['string', 'null']
    }, {
        name: 'id_User',
        type: ['string', 'null']
    }, {
        name: 'statusRequest',
        type: ['string', 'null']
    }, {
        name: 'id_platform',
        type: ['string', 'null']
    }, {
        name: 'pod_lat',
        type: ['string', 'null']
    }, {
        name: 'pod_lon',
        type: ['string', 'null']
    }, {
        name: 'destination_lat',
        type: ['string', 'null']
    }, {
        name: 'depo_lat',
        type: ['string', 'null']
    }, {
        name: 'depo_lon',
        type: ['string', 'null']
    }, {
        name: 'total_distance',
        type: ['string', 'null']
    }, {
        "name": "container",
        "type": {
            "type": 'array',
            "items": {
                "type": "record",
                "name": "container",
                "fields": [{
                    "name": "idContainer",
                    "type": ['long', 'null']
                }, {
                    "name": "container_no",
                    "type": ['string', 'null']
                }, {
                    "name": "container_size",
                    "type": ['string', 'null']
                }, {
                    "name": "container_type",
                    "type": ['string', 'null']
                }, {
                    "name": "idRequestBooking",
                    "type": ['string', 'null']
                }]
            }
        }
    }, {
        "name": "platform",
        "type": {
            "type": "record",
            "name": "platform",
            "fields": [{
                "name": "id_platform",
                "type": ['string', 'null']
            }, {
                "name": "nama_platform",
                "type": ['string', 'null']
            }, {
                "name": "desc_platform",
                "type": ["string", "null"]
            }, {
                "name": "kat_platform",
                "type": ["string", "null"]
            }, {
                "name": "company",
                "type": ['string', 'null']
            }]
        }
    }, {
        name: 'pod',
        type: ['string', 'null']
    }]
};

module.exports = {
    booking: booking
};