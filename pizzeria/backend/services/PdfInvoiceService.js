const PDFDocument = require('pdfkit');

class PdfInvoiceService {

    generateInvoice(
        bill,
        res
    ) {

        const doc =
            new PDFDocument({
                margin: 50
            });

        doc.pipe(res);

        doc.fontSize(24)
           .text(
               'Pizzeria Invoice',
               {
                   align: 'center'
               }
           );

        doc.moveDown();

        doc.fontSize(12);

        doc.text(
            `Invoice ID: ${bill._id}`
        );

        doc.text(
            `Date: ${new Date(
                bill.generatedDate
            ).toLocaleDateString()}`
        );

        doc.moveDown();

        doc.text(
            `Customer: ${bill.customerId.name}`
        );

        doc.text(
            `Email: ${bill.customerId.email}`
        );

        doc.moveDown();

        doc.text(
            `Order Amount: ₹${bill.amount}`
        );

        doc.text(
            `Tax (18%): ₹${bill.tax}`
        );

        doc.text(
            `Total Bill: ₹${bill.totalBill}`
        );

        doc.moveDown();

        doc.fontSize(14)
           .text(
               'Thank you for ordering from Pizzeria!',
               {
                   align: 'center'
               }
           );

        doc.end();
    }

}

module.exports = new PdfInvoiceService();