import { exit } from 'process';
import { db } from './db';
import { posts, users } from './schema';

const dummyUsers = [
  {
    firstName: 'Zafeer',
    lastName: 'Hafeez',
    email: 'contact@zafeer.pk',
  },
  {
    firstName: 'Fatima',
    lastName: 'Khan',
    email: 'fatima.khan@example.com',
  },
  {
    firstName: 'Omar',
    lastName: 'Ahmed',
    email: 'omar.ahmed@example.com',
  },
  {
    firstName: 'Aisha',
    lastName: 'Rashid',
    email: 'aisha.rashid@example.com',
  },
  {
    firstName: 'Mohammed',
    lastName: 'Ali',
    email: 'mohammed.ali@example.com',
  },
  {
    firstName: 'Amira',
    lastName: 'Saeed',
    email: 'amira.saeed@example.com',
  },
  {
    firstName: 'Khalid',
    lastName: 'Abdullah',
    email: 'khalid.abdullah@example.com',
  },
  {
    firstName: 'Jamilah',
    lastName: 'Hassan',
    email: 'jamilah.hassan@example.com',
  },
  {
    firstName: 'Rashid',
    lastName: 'Ibrahim',
    email: 'rashid.ibrahim@example.com',
  },
  {
    firstName: 'Sara',
    lastName: 'Mohammed',
    email: 'sara.mohammed@example.com',
  },
  {
    firstName: 'Ahmed',
    lastName: 'Abdelrahman',
    email: 'ahmed.abdelrahman@example.com',
  },
  {
    firstName: 'Yasmin',
    lastName: 'Ali',
    email: 'yasmin.ali@example.com',
  },
];

const dummyPosts = [
  {
    title: 'The best IDE for web development',
    content:
      'Visual Studio Code is the best IDE for web development. It provides a wide range of features and extensions that make the development process more efficient and enjoyable.',
    imageUrl: 'https://avatars.githubusercontent.com/u/108928776?s=200&v=4',
  },
  {
    title: 'The best programming language',
    content:
      'JavaScript is the best programming language. It is versatile, easy to learn, and widely used in web development.',
    imageUrl: 'https://avatars.githubusercontent.com/u/108928776?s=200&v=4',
  },
  {
    title: 'The future of Artificial Intelligence',
    content:
      'AI is going to revolutionize the way we live and work. It has the potential to automate tasks, improve decision making, and create new products and services.',
    imageUrl: 'https://avatars.githubusercontent.com/u/108928776?s=200&v=4',
  },
  {
    title: 'The benefits of using Docker for containerization',
    content:
      'Docker makes it easy to deploy and manage applications. It provides a consistent environment, reduces conflicts, and improves scalability.',
    imageUrl: 'https://avatars.githubusercontent.com/u/108928776?s=200&v=4',
  },
  {
    title: "The importance of cybersecurity in today's world",
    content:
      'Cybersecurity is crucial for protecting our personal and professional data. It helps prevent unauthorized access, data breaches, and identity theft.',
    imageUrl: 'https://avatars.githubusercontent.com/u/108928776?s=200&v=4',
  },
  {
    title: 'The role of DevOps in modern software development',
    content:
      'DevOps helps bridge the gap between development and operations teams. It improves collaboration, automation, and efficiency in the software development lifecycle.',
    imageUrl: 'https://avatars.githubusercontent.com/u/108928776?s=200&v=4',
  },
  {
    title: 'The advantages of using GraphQL for API development',
    content:
      'GraphQL provides a flexible and efficient way to build APIs. It allows clients to request only the data they need, reducing over-fetching and under-fetching.',
    imageUrl: 'https://avatars.githubusercontent.com/u/108928776?s=200&v=4',
  },
  {
    title: 'The impact of 5G on mobile app development',
    content:
      '5G is going to enable faster and more reliable mobile app development. It will support new technologies like augmented reality, virtual reality, and the Internet of Things.',
    imageUrl: 'https://avatars.githubusercontent.com/u/108928776?s=200&v=4',
  },
  {
    title: 'The benefits of using Kubernetes for cloud management',
    content:
      'Kubernetes provides a scalable and efficient way to manage cloud resources. It automates the deployment, scaling, and management of containerized applications.',
    imageUrl: 'https://avatars.githubusercontent.com/u/108928776?s=200&v=4',
  },
  {
    title: 'The role of machine learning in data analysis',
    content:
      'Machine learning helps uncover insights and patterns in data. It can be used for predictive analytics, recommendation systems, and fraud detection.',
    imageUrl: 'https://avatars.githubusercontent.com/u/108928776?s=200&v=4',
  },
  {
    title: 'The importance of accessibility in web development',
    content:
      'Accessibility is crucial for ensuring that websites are usable by everyone. It helps people with disabilities navigate, understand, and interact with web content.',
    imageUrl: 'https://avatars.githubusercontent.com/u/108928776?s=200&v=4',
  },
  {
    title: 'The benefits of using TypeScript for JavaScript development',
    content:
      'TypeScript provides a more robust and maintainable way to write JavaScript code. It adds static types, interfaces, and other features to help catch errors and improve code quality.',
    imageUrl: 'https://avatars.githubusercontent.com/u/108928776?s=200&v=4',
  },
];

async function seedDb() {
  // delete all users
  console.log('Deleting all previous users....');
  await db.delete(users);

  console.log('Seeding new users....');
  await db.insert(users).values(dummyUsers);

  //   select the user
  const allUsers = await db.select().from(users);

  const newPosts = dummyPosts.map((post) => {
    // select a random user from allUsers
    const user = allUsers[Math.floor(Math.random() * allUsers.length)];

    return {
      ...post,
      userId: user.id,
    };
  });

  await db.insert(posts).values(newPosts);

  console.log('Done.');
  exit(0);
}

seedDb();
