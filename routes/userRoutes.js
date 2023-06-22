const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json({ error: err }));
});

router.route('/register').post((req, res) => {
  const { gmail, firstname, lastname, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      const newUser = new User({ gmail, firstname, lastname, password: hashedPassword });
      newUser
        .save()
        .then(() => res.status(200).json('User created'))
        .catch((err) => res.status(400).json({ error: err }));
    });
  });
});

router.route('/login').post(async (req, res) => {
  try {
    const { gmail, password } = req.body;
    const user = await User.findOne({ gmail });

    if (!user) {
      return res.status(400).json({ error: 'User not found. Please register.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Incorrect password.' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
