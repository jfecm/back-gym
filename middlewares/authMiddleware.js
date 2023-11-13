exports.authorize = (requiredRoles) => {
    return (req, res, next) => {
        try {
            const userRole = req.user?.rol;

            if (!userRole || !requiredRoles.includes(userRole)) {
                return res.status(403).json({
                    message: 'Unauthorized. Insufficient privileges.'
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    };
};