import { query } from "../db.js";


export const getClients = async () => {
    const { rows } = await query('select * from client_db');
    return rows;
}

export const createClient = async (clientData) => {

    const { name, email, job, rate, isactive } = clientData;
    const { rows } = await query(
        `insert into client_db(name,email,job,rate,isactive)
      values($1,$2,$3,$4,$5) returning *`,
      [name,email,job,rate,isactive]  
    );

    return rows[0];
    
}


export const updateClient = async (clientId, clientData) => {

    const { name, email, job, rate, isactive } = clientData;
    const { rows } = await query(
        `update client_db set name =$1 ,email=$2,job=$3,rate=$4,isactive=$5
      where id=$6 returning *`,
        [name, email, job, rate, isactive,clientId]
    );

    return rows[0];
    
};

export const deleteClient = async (clientId) => {
    const { rowCount } = await query(`delete from client_db where id=$1`, [clientId]);
    return rowCount > 0;
};

export const searchClient = async (searchTerm) => {
    const { rows } = await query(
        `select * from client_db where name ILIKE $1 or email ILIKE $1`,[`%${searchTerm}%`]
    )
    return rows[0];
}