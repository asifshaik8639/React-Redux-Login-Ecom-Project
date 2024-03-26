const users = [
    { id: 1, username: '', password: '' },
    { id: 2, username: '', password: '' },
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


  
  