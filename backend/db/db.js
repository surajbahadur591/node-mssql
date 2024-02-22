const sql = require("mssql");

const createConnectionPool = (poolConfig) => {
    const pool = new sql.ConnectionPool(poolConfig);
    return pool
        .connect()
        .then(() => {
            console.log("Connected to the database");
            return pool;
        })
        .catch((err) => {
            console.error("Error connecting to the database:", err);
            throw err;
        });
};

const executeQuery = async (pool, query, params) => {
    try {
        const request = pool.request();

        if (params) {
            for (const paramName in params) {
                request.input(paramName, params[paramName]);
            }
        }

        const result = await request.query(query);

        return result.recordset;
    } catch (error) {
        console.error("Error executing SQL query:", error);
        throw new Error("Failed to load data");
    }
};


const poolotc = {
    user: "sql6685903",

    password: "11bNWuL9bi",

    server: "sql6.freesqldatabase.com",

    database: "sql6685903",

    port: 3306,

    trustServerCertificate: true,
    options: {
        encrypt: true,
        enableArithAbort: true,
        connectionTimeout: 15000,
        requestTimeout: 25000,
        pool: {
            max: 20,
            min: 0,
            idleTimeoutMillis: 30000,
        },
    },
};

const pool2 = createConnectionPool(poolotc);

const getData2 = async (query, params) => {
    const pool = await pool2;
    return executeQuery(pool, query, params);
};

module.exports = { getData2 };