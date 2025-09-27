import { RequestHandler } from 'express';

export const parseJsonData: RequestHandler = (req, res, next): void => {
  console.log('👉 Before parsing:', req.body);

  if (req.body.data) {
    try {
      const parsed = JSON.parse(req.body.data);
      req.body = { ...parsed, ...req.body };
      delete (req.body as any).data;

      console.log('👉 After parsing:', req.body); // ✅ after merge
    } catch (err) {
      console.error('❌ JSON parse error:', err);
      res.status(400).json({ status: 'fail', message: 'Invalid JSON data' });
      return;
    }
  } else {
    console.log('👉 No data key to parse, body remains:', req.body);
  }

  next();
};
