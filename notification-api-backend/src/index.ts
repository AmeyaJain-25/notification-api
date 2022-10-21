import mongoose from 'mongoose';
import app from './app';
import config from './config';

(async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('DB CONNECTED');

    app.on('error', (err: any) => {
      console.error('ERROR: ', err);
      throw err;
    });

    const onListening = () => {
      console.log(`Listening on ${config.PORT}`);
    };

    app.listen(config.PORT || 4000, onListening);
  } catch (err) {
    console.error('ERROR: ', err);
    throw err;
  }
})();
