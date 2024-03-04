const sequelize = require('../config/connection');
const User = require('../models/User');
const Post = require('../models/Post');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const postDataWithUserId = postData.map((post, index) => ({
       ...post,
       user_id: users[Math.floor(Math.random() * users.length)].id,
    }));

    await Post.bulkCreate(postDataWithUserId);

    console.log('Seeded Database Successfully');
    process.exit(0);
};

seedDatabase();