import { Router, Request, Response } from 'express';

const router = Router();
 
router.get('/tienda', (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: 'Todo esta bien'
  });
});

router.get('/tienda/:id', (req: Request, res: Response) => {
  
  const id: number = Number(req.params.id); 
  res.json({
    ok: true,
    id,
    message: 'Todo esta bien'
  });
});




export default router;