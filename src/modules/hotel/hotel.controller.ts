import type { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { localize } from '../../utils/localize.js';
import * as hotelService from './hotel.service.js';
import { incrementUserInterest } from '../home/home.service.js';

// ── Hotels ─────────────────────────────────────────────────────────────

export const getHotelsController = catchAsync(async (req: Request, res: Response) => {
  const hotels = await hotelService.getHotels(req.validatedQuery as Record<string, string>);
  res.status(200).json({ success: true, data: localize(hotels, req.lang!) });
});

export const getHotelByIdController = catchAsync(async (req: Request, res: Response) => {
  const hotel = await hotelService.getHotelById(req.params.id as string, req.user?.userId);
  if (req.user) {
    void incrementUserInterest(req.user.userId, 'HOTEL').catch(() => {});
  }
  res.status(200).json({ success: true, data: localize(hotel, req.lang!) });
});

export const createHotelController = catchAsync(async (req: Request, res: Response) => {
  const hotel = await hotelService.createHotel(req.body);
  res.status(201).json({ success: true, data: localize(hotel, req.lang!) });
});

export const updateHotelController = catchAsync(async (req: Request, res: Response) => {
  const hotel = await hotelService.updateHotel(req.params.id as string, req.body);
  res.status(200).json({ success: true, data: localize(hotel, req.lang!) });
});

export const deleteHotelController = catchAsync(async (req: Request, res: Response) => {
  const result = await hotelService.deleteHotel(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});

// ── Rooms ──────────────────────────────────────────────────────────────

export const getRoomsController = catchAsync(async (req: Request, res: Response) => {
  const rooms = await hotelService.getRooms(req.params.id as string, req.validatedQuery as Record<string, string>);
  res.status(200).json({ success: true, data: localize(rooms, req.lang!) });
});

export const createRoomController = catchAsync(async (req: Request, res: Response) => {
  const room = await hotelService.createRoom(req.body);
  res.status(201).json({ success: true, data: localize(room, req.lang!) });
});

export const updateRoomController = catchAsync(async (req: Request, res: Response) => {
  const room = await hotelService.updateRoom(req.params.id as string, req.body);
  res.status(200).json({ success: true, data: localize(room, req.lang!) });
});

export const deleteRoomController = catchAsync(async (req: Request, res: Response) => {
  const result = await hotelService.deleteRoom(req.params.id as string);
  res.status(200).json({ success: true, data: result });
});
