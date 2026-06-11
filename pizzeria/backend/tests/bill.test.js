const request = require('supertest');

const app = require('../server');

describe(
    'Bill API',
    () => {

        it(
            'should require authentication',
            async () => {

                const res =
                    await request(app)
                    .get(
                        '/api/bills/my-bills'
                    );

                if (
                    res.status !== 401
                ) {

                    throw new Error(
                        'Expected 401'
                    );

                }

            }
        );

    }
);