const BillingService = require('../services/BillingService');
const Bill = require('../models/Bill');
const PdfInvoiceService = require('../services/PdfInvoiceService');

class BillController {

    async generateBill(req, res) {
        try {
            const bill = await BillingService.generateBill(req.params.orderId);

            res.status(201).json(bill);

        } catch (err) {
            res.status(400).json({
                error: err.message
            });
        }
    }

    async getMyBills(req, res) {
        try {
            const bills = await BillingService.getBills(req.user.id);

            res.json(bills);

        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }

    async downloadInvoice(req, res) {
        try {
            const bill = await Bill.findById(req.params.billId)
                .populate('customerId')
                .populate('orderId');

            if (!bill) {
                return res.status(404).json({
                    error: 'Bill not found'
                });
            }

            if (req.user.role === 'customer') {
                if (bill.customerId._id.toString() !== req.user.id) {
                    return res.status(403).json({
                        error: 'Access denied'
                    });
                }
            }

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader(
                'Content-Disposition',
                `attachment; filename=invoice-${bill._id}.pdf`
            );

            PdfInvoiceService.generateInvoice(bill, res);

        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    }
}

module.exports = new BillController();