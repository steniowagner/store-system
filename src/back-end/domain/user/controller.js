const { User } = require('../../models');

exports.create = async () => {
  try {
    const user = await User.create({
      name: 'Stenio Wagner',
      username: 'swmyself',
      password: '123456',
    });

    return user;
  } catch (e) {
    return e.message;
  }
};
