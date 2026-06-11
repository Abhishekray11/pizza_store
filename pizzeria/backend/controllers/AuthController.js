const AuthService = require('../services/AuthService');

class AuthController {

    async register(req, res) {
        try {
            const user = await AuthService.register(req.body);

            res.status(201).json({
                message: 'Registration successful',
                user
            });

        } catch (err) {
            res.status(400).json({
                error: err.message
            });
        }
    }

    async login(req, res) {
        try {
            const result = await AuthService.login(req.body);

            res.json({
                token: result.token,
                user: result.user
            });

        } catch (err) {
            res.status(400).json({
                error: err.message
            });
        }
    }
}

module.exports = new AuthController();