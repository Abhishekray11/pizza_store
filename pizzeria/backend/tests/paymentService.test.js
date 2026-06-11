const chai = require('chai');
const expect =chai.expect;
const PaymentService = require( '../services/PaymentService' );

describe(
    'Payment Service',
    () => {

        it(
            'should validate UPI',
            () => {

                expect(

                    PaymentService
                        .validateMode(
                            'UPI'
                        )

                ).to.equal(
                    true
                );

            }
        );

        it(
            'should reject invalid mode',
            () => {

                expect(

                    PaymentService
                        .validateMode(
                            'BITCOIN'
                        )

                ).to.equal(
                    false
                );

            }
        );

    }
);