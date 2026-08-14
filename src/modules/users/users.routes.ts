import { Router } from 'express';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { requireRole } from '../../middlewares/requireRole.js';
import { validate } from '../../middlewares/validate.js';
import { validateImageReferences } from '../../middlewares/validateImageReferences.js';
import { 
  updateProfileSchema, 
  updateUserDtoSchema, 
  updatePersonalInfoDtoSchema, 
  updatePassportInfoDtoSchema, 
  updateDriverLicenseDtoSchema, 
  updateProfilePhotoDtoSchema 
} from './users.schema.js';
import { 
  getProfileController, 
  updateProfileController, 
  updateBasicProfileController, 
  updateProfilePhotoController, 
  updatePersonalInfoController, 
  updatePassportInfoController, 
  updateDriverLicenseInfoController, 
  disableUserController 
} from './users.controller.js';

const router = Router();

const normalizePhotoField = (req: any, _res: any, next: any) => {
  const url = req.body?.avatarUrl || req.body?.avatar;
  if (url) {
    req.body.avatarUrl = url;
    req.body.avatar = url;
  }
  next();
};

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags: [Users]
 *     summary: Get current user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: User profile }
 *       401: { description: Authentication required }
 */
router.get('/me', requireAuth, getProfileController);
router.get('/profile', requireAuth, getProfileController);

/**
 * @swagger
 * /api/users/me:
 *   patch:
 *     tags: [Users]
 *     summary: Update basic user profile (name, phone, region, language)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDto'
 *     responses:
 *       200: { description: Profile updated }
 *       401: { description: Authentication required }
 */
router.patch('/me', requireAuth, validate({ body: updateUserDtoSchema }), updateBasicProfileController);
router.patch('/profile', requireAuth, validate({ body: updateUserDtoSchema }), updateBasicProfileController);

/**
 * Legacy/Full profile update endpoint
 */
router.put('/me', requireAuth, validate({ body: updateProfileSchema }), updateProfileController);
router.put('/profile', requireAuth, validate({ body: updateProfileSchema }), updateProfileController);

/**
 * @swagger
 * /api/users/me/photo:
 *   patch:
 *     tags: [Users]
 *     summary: Update profile photo / avatar
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfilePhotoDto'
 *     responses:
 *       200: { description: Photo updated }
 *       401: { description: Authentication required }
 */
router.patch(
  '/me/photo',
  requireAuth,
  normalizePhotoField,
  validate({ body: updateProfilePhotoDtoSchema }),
  validateImageReferences([{ bodyField: 'avatarUrl', kind: 'single' }]),
  updateProfilePhotoController
);
router.patch(
  '/profile/photo',
  requireAuth,
  normalizePhotoField,
  validate({ body: updateProfilePhotoDtoSchema }),
  validateImageReferences([{ bodyField: 'avatarUrl', kind: 'single' }]),
  updateProfilePhotoController
);
router.patch(
  '/me/avatar',
  requireAuth,
  normalizePhotoField,
  validate({ body: updateProfilePhotoDtoSchema }),
  validateImageReferences([{ bodyField: 'avatarUrl', kind: 'single' }]),
  updateProfilePhotoController
);
router.put(
  '/me/avatar',
  requireAuth,
  normalizePhotoField,
  validate({ body: updateProfilePhotoDtoSchema }),
  validateImageReferences([{ bodyField: 'avatarUrl', kind: 'single' }]),
  updateProfilePhotoController
);

/**
 * @swagger
 * /api/users/me/personal-info:
 *   patch:
 *     tags: [Users]
 *     summary: Update personal info (dateOfBirth, address, idNumber) and set personalInfo flag to true
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePersonalInfoDto'
 *     responses:
 *       200: { description: Personal info updated }
 *       401: { description: Authentication required }
 */
router.patch('/me/personal-info', requireAuth, validate({ body: updatePersonalInfoDtoSchema }), updatePersonalInfoController);
router.patch('/profile/personal-info', requireAuth, validate({ body: updatePersonalInfoDtoSchema }), updatePersonalInfoController);

/**
 * @swagger
 * /api/users/me/passport:
 *   patch:
 *     tags: [Users]
 *     summary: Update passport info (passportNumber, expiryDate) and set passport flag to true
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePassportInfoDto'
 *     responses:
 *       200: { description: Passport info updated }
 *       401: { description: Authentication required }
 */
router.patch('/me/passport', requireAuth, validate({ body: updatePassportInfoDtoSchema }), updatePassportInfoController);
router.patch('/profile/passport', requireAuth, validate({ body: updatePassportInfoDtoSchema }), updatePassportInfoController);

/**
 * @swagger
 * /api/users/me/driver-license:
 *   patch:
 *     tags: [Users]
 *     summary: Update driver license info (licenseNumber, expiryDate) and set driverLicense flag to true
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDriverLicenseDto'
 *     responses:
 *       200: { description: Driver license updated }
 *       401: { description: Authentication required }
 */
router.patch('/me/driver-license', requireAuth, validate({ body: updateDriverLicenseDtoSchema }), updateDriverLicenseInfoController);
router.patch('/profile/driver-license', requireAuth, validate({ body: updateDriverLicenseDtoSchema }), updateDriverLicenseInfoController);

/**
 * @swagger
 * /api/users/{id}/disable:
 *   put:
 *     tags: [Users]
 *     summary: Revoke all sessions for a user (disable/ban action)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Refresh token revoked immediately; any still-valid access token (up to 15 min) keeps working until natural expiry }
 *       404: { description: User not found }
 */
router.put('/:id/disable', requireAuth, requireRole('ADMIN'), disableUserController);

export default router;
