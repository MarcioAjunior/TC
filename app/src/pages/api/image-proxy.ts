// pages/api/image-proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL missing' });
  }

  try {
    const response = await fetch(url as string);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar a imagem');
    }
    const arrayBuffer = await response.arrayBuffer();

    const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
    
    res.setHeader('Content-Type', contentType);
    
    res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    res.status(500).json({ error: 'Failed to load image' });
  }
}
