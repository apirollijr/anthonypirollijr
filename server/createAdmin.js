// server/createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/anthonypirollijr', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to MongoDB...');

    const name = 'Anthony';       // Change as needed
    const email = 'apirollijr@gmail.com'; // Change as needed
    const password = 'UKa9efup';     // Change as needed

    let user = await User.findOne({ email });
    if (user) {
      console.log('Admin user already exists');
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: true,
    });

    await user.save();
    console.log('Admin user created:', email);
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
