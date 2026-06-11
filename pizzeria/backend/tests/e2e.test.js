const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server');

let customerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMjdiNzg4ZDc5NjE3MWQyNWE4ODE2YSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc4MTA2NTA0NiwiZXhwIjoxNzgxMDkzODQ2fQ.WT-cd_Ri-D2AnfWKtpDnWrm-lZQKNe51Ohi9ENRKLk8";

let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMjdiNzhlZDc5NjE3MWQyNWE4ODE2YiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MTA2NTA1OSwiZXhwIjoxNzgxMDkzODU5fQ.QhVeONSuwG0aJafSpdb-apU7V33MWIVyCvkUGkBrjf0";

let orderId = "6a289a90889a8b80d1846410";
let billId = '6a2866a8a200a93faddeaae2';

describe(
    'End To End Flow',
    () => {

        it(
            'Customer Login',
            async () => {

                const res =
                    await request(app)
                    .post(
                        '/api/auth/login'
                    )
                    .send({

                        email:
                        'customer@gmail.com',

                        password:
                        '123456'

                    });

                expect(
                    res.status
                ).to.equal(
                    200
                );

                customerToken =
                    res.body.token;

            }
        );

        it(
           'Admin Login',
        async () => {

        const res =
            await request(app)
            .post(
                '/api/auth/login'
            )
            .send({

                email:
                'admin@gmail.com',

                password:
                '123456'

            });

        expect(
            res.status
        ).to.equal(
            200
        );

        adminToken =
            res.body.token;

    }
);

it(
    'Create Order',
    async () => {

        const res =
            await request(app)
            .post(
                '/api/orders'
            )
            .set(
                'Authorization',
                `Bearer ${customerToken}`
            )
            .send({

                items: [
                    {
                        name:
                        'Veg Pizza',
                        quantity: 2
                    }
                ],

                totalAmount: 500,

                deliveryMode:
                    'Delivery',

                paymentOption:
                    'UPI'

            });

        expect(
            res.status
        ).to.equal(
            201
        );

        orderId =
            res.body.id ||
            res.body._id;

    }
);

it(
    'Generate Bill',
    async () => {

        const res =
            await request(app)
            .post(
                `/api/bills/generate/${orderId}`
            )
            .set(
                'Authorization',
                `Bearer ${adminToken}`
            );

        expect(
            res.status
        ).to.equal(
            201
        );

        billId =
            res.body.id ||
            res.body._id;

    }
);

it(
    'View Bills',
    async () => {

        const res =
            await request(app)
            .get(
                '/api/bills/my-bills'
            )
            .set(
                'Authorization',
                `Bearer ${customerToken}`
            );

        expect(
            res.status
        ).to.equal(
            200
        );

    }
);

it(
    'Download Invoice',
    async () => {

        const res =
            await request(app)
            .get(
                `/api/bills/invoice/${billId}`
            )
            .set(
                'Authorization',
                `Bearer ${customerToken}`
            );

        expect(
            res.status
        ).to.equal(
            200
        );

    }
);});