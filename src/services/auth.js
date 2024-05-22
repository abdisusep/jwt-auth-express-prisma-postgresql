require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../utils/db');

const { JWT_SECRET } = process.env;

const login = async ({ email, password }) => {
    try {
        const user = await db.user.findUnique({ where: { email } });

        if (!user) {
            return {
                status: 'error',
                code: 404,
                message: 'User not found',
            };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return {
                status: 'error',
                code: 401,
                message: 'Invalid password',
            };
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        const expirationTime = jwt.decode(token)?.exp;

        return {
            message: 'Login successful',
            data: {
                email: user.email,
                name: user.name,
                token,
                expired: expirationTime ? new Date(expirationTime * 1000).toISOString() : null,
            },
        };
    } catch (err) {
        throw new Error(err);
    }
};

const register = async ({ email, password, name }) => {
    try {
        const existingUser = await db.user.findUnique({ where: { email } });

        if (existingUser) {
            return {
                status: 'error',
                code: 409,
                message: 'User already exists',
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        return {
            status: 'success',
            code: 201,
            message: 'User created successfully',
            data: newUser,
        };
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = { login, register };