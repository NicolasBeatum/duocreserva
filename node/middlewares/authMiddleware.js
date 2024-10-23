import jwt from 'jsonwebtoken';

const secretKey = 'zKuL0Nehvm'; // Cambia esto por una clave secreta segura

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

//const secretKey = 'zKuL0Nehvm'; // Cambia esto por una clave secreta segura
