const request =   require('supertest');
const app = require('../server');

describe(
    'Dashboard API',
    () => {

        it(
            'should deny access without token',
            async () => {

                const res =
                    await request(app)
                    .get(
                        '/api/dashboard/stats'
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