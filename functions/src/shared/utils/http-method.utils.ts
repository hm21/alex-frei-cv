import { Response } from 'express';
import { Request } from 'firebase-functions/v2/https';

export function validateHttpMethod(
  req: Request,
  res: Response,
  methods: Method[],
): boolean {
  const allowed = [...methods, 'OPTIONS'];

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', methods.join(', '));
    res.status(200).end();
    return false;
  }

  if (!allowed.includes(req.method)) {
    res.setHeader('Allow', allowed.join(', '));
    res.status(405).json({ error: 'Method Not Allowed' });
    return false;
  }

  return true;
}

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
