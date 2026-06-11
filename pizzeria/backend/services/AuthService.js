const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {

    async register(data) {

        const { name, email, password, role } = data;

        let user = await User.findOne({ email });

        if (user) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'customer'
        });

        await user.save();

        return user;
    }

    async login(data) {

        const { email, password } = data;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error(
                'Invalid credentials'
            );
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            throw new Error(
                'Invalid credentials'
            );
        }

        const token =
            jwt.sign(
                {
                    id: user._id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '8h'
                }
            );

        return {
            token,
            user
        };
    }

}

module.exports = new AuthService();