import prisma  from '../prisma';

function serializeBigInt(obj:any) {
  return JSON.parse(JSON.stringify(obj, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  ));
}

export default async function handler(req:any, res:any) {
  try {
    const { id } = req.query;
    const post = await prisma.lb_posts.findFirst({
      where: {
        id: id
      },
      include: {
        comments: true
      },
    });
    const serializedUser = serializeBigInt(post);
    res.status(200).json(serializedUser); 
  } catch (err) {
  console.log(err)
    res.status(500).json({ error: err });
 } finally {
    await prisma.$disconnect();
 }
}