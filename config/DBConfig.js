// import sql from "mssql";

// const config = {
//     server: 'localhost\\SQLEXPRESS',
//     database: 'pokemons',
//     options: {
//         encrypt: false, // למקרים שבהם את מתחברת ל-Azure
//         trustServerCertificate: true, // למקרים של חיבור מקומי
//         authentication: {
//             type: 'default',
//             options: {
//                 userName: '', // שם המשתמש שלך אם נדרש, ריק במקרה של אימות Windows
//                 password: '' // סיסמה שלך אם נדרש, ריק במקרה של אימות Windows
//             }
//         }
//     }
// };

// export async function connectToDB(query) {
//     let context
//     try {
//         context = await sql.connect(config)
//         console.log(context);
//         let result = await context.request().query(query)
//         context.close()
//         return result.recordset
//     }
//     catch (err) {
//         console.log(`error from ${err.message}`);
//     }
// }
//---------------------------------
// import sql from "mssql";

// const config = {
//     server: 'YAELAPTOP\\SQLEXPRESS',
//     database: 'pokemons',
//     options: {
//         encrypt: false,
//         trustServerCertificate: true,
//         enableArithAbort: true,
//         trustedConnection: true,
//         integratedSecurity: true 
//     },
//     port: 1433,
// };


// export async function connectToDB(query) {
//     let pool;
//     try {
//         pool = await sql.connect(config);
//         console.log("Connected to database");
//         let result = await pool.request().query(query);
//         return result.recordset;
//     } catch (err) {
//         console.error(`Error: ${err.message}`);
//         throw err;
//     } finally {
//         if (pool) {
//             await pool.close();
//             console.log("Connection closed");
//         }
//     }
// }





import sql from 'msnodesqlv8';

export function connectToDB(connectionString,query, params) {
    //const connectionString = `Driver=${process.env.DRIVER};Server=${process.env.SERVER};Database=${process.env.DB_NAME};Trusted_Connection=${process.env.TRUSTED_CONNECTION};`
    
    sql.open(connectionString, (err, conn) => {
        if (err) {
            console.error('Failed to open SQL Server connection:', err);
            return;
        }

        conn.query(query, params, (err) => {
            if (err) {
                console.error('Failed to execute query:', err);
                return;
            }

            console.log('The query was executed successfully');

            // Close the connection
            conn.close();
        });
    });
}
