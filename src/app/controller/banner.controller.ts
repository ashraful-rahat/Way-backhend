// controller/banner.controller.ts
import { Request, Response } from 'express';
import { FlatModel } from '../models/flat.model';
import { PropertyModel } from '../models/property.model';

export const bannerController = {
  searchBannerProperties: async (req: Request, res: Response) => {
    try {
      const { type, rooms, location, minPrice, maxPrice } = req.query;

      const propertyQuery: any = {};
      const flatQuery: any = {};

      if (type) propertyQuery.type = type;
      if (rooms) propertyQuery.rooms = Number(rooms);
      if (minPrice) propertyQuery.price = { ...propertyQuery.price, $gte: Number(minPrice) };
      if (maxPrice) propertyQuery.price = { ...propertyQuery.price, $lte: Number(maxPrice) };
      if (location) propertyQuery.location = { $regex: location, $options: 'i' };

      if (type === 'apartment' || !type) {
        if (rooms) flatQuery.rooms = Number(rooms);
        if (minPrice) flatQuery.price = { ...flatQuery.price, $gte: Number(minPrice) };
        if (maxPrice) flatQuery.price = { ...flatQuery.price, $lte: Number(maxPrice) };
        // location not in Flat directly
      }

      const properties = await PropertyModel.find(propertyQuery).limit(20);
      const flats = await FlatModel.find(flatQuery).limit(20);

      const results = [...properties, ...flats];

      res.json({ success: true, data: results });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  },
};
