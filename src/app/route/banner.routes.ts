// routes/banner.routes.ts
import express from 'express';
import { bannerController } from '../controller/banner.controller';

const router = express.Router();

// GET /api/banner/search?type=house&rooms=3&minPrice=1000&maxPrice=5000&location=Dhaka
router.get('/search', bannerController.searchBannerProperties);

export const bannerRoutes = router;
