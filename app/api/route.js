import db from '../(components-root)/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const address = searchParams.get('address')
    const result = await db.query(`SELECT message FROM users WHERE address = '${address}'`);
    const data = result.rows;
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    Response.json(error);
  }
}

export async function POST(req){
  try{
    const request = await req.json();
    const result = await db.query(`INSERT INTO users(address, message)
    SELECT '${request?.address}', '${request?.messageData}'
    WHERE
    NOT EXISTS (
    SELECT address FROM users WHERE address = '${request?.address}'
    )`);
    const data = result;
    console.log(request);
    return Response.json({resMessage: "Successfully added"});
  } catch (error) {
    console.error('Error fetching data:', error);
    Response.json(error);
  }
}