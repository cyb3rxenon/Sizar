module.exports = async function (context, req) {
    context.log('API function triggered');
    
    if (req.method === 'GET') {
        context.res = {
            status: 200,
            body: { message: "API is working! Use POST to create an account." }
        };
        return;
    }
    
    if (req.method === 'POST') {
        const { username, email, password } = req.body;
        
        context.res = {
            status: 200,
            body: { 
                success: true,
                message: "Account created!",
                username: username,
                email: email
            }
        };
        return;
    }
    
    context.res = {
        status: 405,
        body: { error: "Method not allowed. Use GET or POST." }
    };
};
