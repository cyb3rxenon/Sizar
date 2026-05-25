module.exports = async function (context, req) {
    const { username, email, password } = req.body;
    
    // For now, just return a success message
    // You'll add SQL database connection here later
    
    context.res = {
        status: 200,
        body: { 
            message: `Account created for ${username}!`,
            email: email
        }
    };
};
