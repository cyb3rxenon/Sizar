const mysql = require('mysql2/promise');

module.exports = async function (context, req) {
    context.log('Creating account with MySQL...');
    
    const { username, email, password, dateOfBirth } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
        context.res = {
            status: 400,
            body: { error: "Please provide username, email, and password" }
        };
        return;
    }
    
    // MySQL connection configuration
    const dbConfig = {
        host: 'kingdomheroes-db.mysql.database.azure.com',
        user: 'mapleadmin',
        password: 'YOUR_PASSWORD_HERE',  // Replace with your actual password
        database: 'YOUR_DATABASE_NAME',   // Replace with your database name
        ssl: {
            ca: process.env.MYSQL_SSL_CA || '/path/to/cert'  // We'll handle this differently
        },
        connectTimeout: 30000,
        enableKeepAlive: true
    };
    
    let connection;
    
    try {
        // Create connection
        connection = await mysql.createConnection(dbConfig);
        
        // Simple password hash (use bcrypt in production!)
        const passwordHash = Buffer.from(password).toString('base64');
        
        // Insert user
        const [result] = await connection.execute(
            'INSERT INTO user_accounts (username, email, password_hash, date_of_birth) VALUES (?, ?, ?, ?)',
            [username, email, passwordHash, dateOfBirth || null]
        );
        
        context.res = {
            status: 200,
            body: { 
                success: true,
                message: "Account created successfully!",
                userId: result.insertId
            }
        };
        
    } catch (error) {
        context.log.error('Database error:', error);
        
        // Handle duplicate entry errors
        if (error.code === 'ER_DUP_ENTRY') {
            context.res = {
                status: 409,
                body: { error: "Username or email already exists!" }
            };
        } else {
            context.res = {
                status: 500,
                body: { error: "Database error: " + error.message }
            };
        }
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};
