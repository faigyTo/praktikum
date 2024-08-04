import sql from 'msnodesqlv8';

export function connectToDB(connectionString, query, params) {

    return new Promise((resolve, reject) => {
        sql.open(connectionString, (err, conn) => {
            if (err) {
                console.error('Failed to open SQL Server connection:', err);
                reject(err)
                return;
            }

            conn.query(query, params, (err, result) => {
                if (err) {
                    console.error('Failed to execute query:', err);
                    reject(err)
                    return;
                }
                resolve(result);

                console.log('The query was executed successfully');

                // Close the connection
                conn.close();
                return result;
            });
        });
    })
}
