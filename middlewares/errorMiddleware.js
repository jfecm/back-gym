const errorMiddleware = (err, req, res) => {
    res.status(500).json(
        {
            error: 'Something went wrong!',
            code: 500
        }
        );
};

module.exports = errorMiddleware;