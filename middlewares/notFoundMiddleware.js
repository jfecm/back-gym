const notFoundMiddleware = (req, res) => {
    res.status(404).json(
        {
            code: 404,
            error: "Resource not found",
            message: "The requested path does not exist on the server.",
        }
    );
};

module.exports = notFoundMiddleware;