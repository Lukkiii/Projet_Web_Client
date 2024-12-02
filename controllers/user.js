const User = require('../models/User');

const handleRegister = async (wsConnection, data) => {
    console.log('received data', data);
    try {
        const user = await User.findOne({ username: data.username });
        if (!user) {     
            await User.create({
                username: data.username,
                password: data.password,
            });
            wsConnection.sendUTF(JSON.stringify({
                success: true,
                message: 'Registration successful',
            }));
        } else {
            wsConnection.sendUTF(JSON.stringify({
                success: false,
                message: 'Username already exists',
            }));
        }
    } catch (error) {
        wsConnection.sendUTF(JSON.stringify({
            success: false,
            message: 'Registration failed',
        }));
    }
}

const handleLogin = async (wsConnection, data) => {
    console.log('received data', data);
    try {
        const user = await User.findOne({ username: data.username });
        if (!user) {
            wsConnection.sendUTF(JSON.stringify({
                success: false,
                message: 'User not found',
            }));
            return;
        }

        const isMatch = await user.comparePassword(data.password); 
        if (isMatch) {
            wsConnection.sendUTF(JSON.stringify({
                success: true,
                message: 'Authentication successful',
            }));
        } else {
            wsConnection.sendUTF(JSON.stringify({
                success: false,
                message: 'Password incorrect',
            }));
        }
    } catch (error) {
        wsConnection.sendUTF(JSON.stringify({
            success: false,
            message: 'Authentication failed',
        }));
    }

}

module.exports = {
    handleRegister,
    handleLogin,
};

