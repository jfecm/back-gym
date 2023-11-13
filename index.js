const express = require('express');
const cors = require('cors');
const {mongoose} = require('./database');
const app = express();
const notFoundMiddleware = require('./middlewares/notFoundMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');
const apiV2Router = require('./routes/apiV2.route');
require('dotenv').config();

app.use(express.json());
app.use(cors({origin: '*'}));
app.use('/api/v2', apiV2Router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`Server started on port`, app.get('port'));
});