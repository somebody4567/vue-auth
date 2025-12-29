const MailService = require('../service/mail-service');

class MailController {
    async sendMail(req, res, next) {
        const {to, link} = req.body;
        await MailService.sendActivationMail(to, link);
        res.status(200).json({
            success: "true"
        })
    }

}

module.exports = new MailController()