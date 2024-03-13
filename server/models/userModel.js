const users = [
    { id: 1, username: 'asif.shaik9032@gmail.com', password: 'test$1234' },
    { id: 2, username: 'shaikasif', password: 'test2' },
    // Add more users as needed
  ];
  
const getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
      const user = users.find((u) => u.username === username);
      user ? resolve(user) : reject(new Error('User not found'));
    });
  };

export const userModel = {
  getUserByUsername
}


  
  