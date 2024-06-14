import db from '../(components-root)/db';

export async function GET(req) {
  try {
    // const { searchParams } = new URL(req.url)
    // const address = searchParams.get('address')
    const result = await db.query(`SELECT * FROM notification`);
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
    const getId = await db.query(`SELECT id from users WHERE address='${request?.address}'`)
    const getGrpId = await db.query(`SELECT group_id from groups WHERE address='${request?.groupAdd}'`)
    const result = await db.query(`INSERT INTO notification(notify_to,notify_head,notify_body,group_id,req_idx,notify_time,notify_clear)
    VALUES(${getId.rows[0].id},'${request?.head}','${request?.body}',${getGrpId.rows[0].group_id},${request?.reqIdx},current_timestamp,false)`);
    const data = result;
    console.log(request);
    return Response.json({resMessage: "Successfully added"});
  } catch (error) {
    console.log('Error fetching data:', error);
    Response.json(error);
  }
}