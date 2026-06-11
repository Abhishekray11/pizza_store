class PaymentService {

    getValidModes() {

        return [
            'COD',
            'UPI',
            'Card'
        ];

    }

    validateMode(
        paymentOption
    ) {

        return this
            .getValidModes()
            .includes(
                paymentOption
            );

    }

}

module.exports = new PaymentService();