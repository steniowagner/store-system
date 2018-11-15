const { User } = require('../../models');

exports.create = async () => {
  try {
    const user = await User.create({
      name: 'Pereira',
      username: 'swpdf',
      password: '654321',
    });

    return user.id;
  } catch (e) {
    return e.message;
  }
};
