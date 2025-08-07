const generateAccesAndRefreshTokens = async (userId) => {
    try {

        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeState: false }); //updates the changed field without asking for filling other fields

        return { accessToken, refreshToken }
    }
    catch (error) {
        console.error("something went wrong while genrating access and refresh tokens", error);
        throw error
    }
}

export {generateAccesAndRefreshTokens};