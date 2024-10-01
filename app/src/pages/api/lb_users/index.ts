import prisma  from '../prisma';

export default async function handler(req:any, res:any) {
  try {
    const users = await prisma.lb_users.findMany({
      orderBy: {
        'updated_at' : 'desc'
      },
      where : {
        'is_training' : false
      }
    }); 
    res.status(200).json(users); 
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Algo deu errado.' });
  } finally {
    await prisma.$disconnect();
  }
}
