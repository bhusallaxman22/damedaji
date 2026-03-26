import * as mariadb from "mariadb";

let pool;

function hasDbConfig() {
    return Boolean(
        process.env.MARIADB_HOST &&
        process.env.MARIADB_PORT &&
        process.env.MARIADB_USER &&
        process.env.MARIADB_PASSWORD &&
        process.env.MARIADB_DATABASE
    );
}

export function getPool() {
    if (!hasDbConfig()) {
        return null;
    }

    if (!pool) {
        pool = mariadb.createPool({
            host: process.env.MARIADB_HOST,
            port: Number(process.env.MARIADB_PORT),
            user: process.env.MARIADB_USER,
            password: process.env.MARIADB_PASSWORD,
            database: process.env.MARIADB_DATABASE,
            connectionLimit: 5,
            acquireTimeout: 12000,
            multipleStatements: true,
        });
    }

    return pool;
}

export async function withConnection(callback) {
    const activePool = getPool();
    if (!activePool) {
        throw new Error("MariaDB environment variables are not configured.");
    }

    const connection = await activePool.getConnection();
    try {
        return await callback(connection);
    } finally {
        connection.release();
    }
}

export async function closePool() {
    if (pool) {
        await pool.end();
        pool = undefined;
    }
}
