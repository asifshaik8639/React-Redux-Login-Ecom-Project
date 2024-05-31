import db from '../database/mySQLClientConnect.js';
  
  // Express.js route handler
    const getUserProfileData = async (req, res) => {
        const userId = req.params.id;
        try {

            await db.query('SELECT * FROM user_profile WHERE id = ?' , userId, (err, results, fields) => {
                if (!err) {
                    const userDetails =  results[0];

                    if(userDetails) {
                        const userProfileJson = {
                            id: userDetails.id,
                            username: userDetails.username,
                            email: userDetails.email,
                            first_name: userDetails.first_name,
                            last_name: userDetails.last_name,
                            phone_number: userDetails.phone_number,
                            dob: userDetails.dob,
                            gender: userDetails.gender
                            // Add other relevant fields here
                        };
                        res.status(200).json({ data : userProfileJson });
                        
                    } else {
                        console.log('User not found ');
                        res.status(404).json({ error: 'User not found' });
                        return;
                    }

                } else {
                    console.log('in error case => ', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
  };
  

export const userController = {
    getUserProfileData
};