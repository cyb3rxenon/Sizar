module.exports = async function (context, req) {
    context.log('Account creation called');
    
    const body = req.body;
    
    context.res = {
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: { message: "Success!", username: body.username }
    };
};
