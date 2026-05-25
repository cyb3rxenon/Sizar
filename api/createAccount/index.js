module.exports = async function (context, req) {
    context.log('Create account function called');
    
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        context.res = {
            status: 400,
            body: { error: "Please provide username, email, and password" }
        };
        return;
    }
    
    context.res = {
        status: 200,
        body: { 
            success: true,
            message: "Account created successfully!",
            username: username,
            email: email
        }
    };
};
