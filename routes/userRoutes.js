const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json({ error: err }));
});

router.route('/register').post((req, res) => {
  const { username, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      const newUser = new User({ username, password: hashedPassword });
      newUser
        .save()
        .then(() => res.status(200).json('User created'))
        .catch((err) => res.status(400).json({ error: err }));
    });
  });
});

router.route('/login').post(async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send('User not found. Please register.');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send('Incorrect password.');
    }

    res.send('Login successful');
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
