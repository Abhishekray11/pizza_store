class MessageService {

    sendOrderCreated(
        customerEmail,
        orderId
    ) {

        console.log(
            `
================================
ORDER CREATED
Customer : ${customerEmail}
Order ID : ${orderId}
================================
`
        );

    }

    sendOrderStatus(
        customerEmail,
        status
    ) {

        console.log(
            `
================================
ORDER STATUS UPDATE
Customer : ${customerEmail}
Status : ${status}
================================
`
        );

    }

}

module.exports = new MessageService();