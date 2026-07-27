import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Demli API',
      version: '1.0.0',
      description:
        'Multi-domain consumer API — rent-a-car, travel, hotel, food, booking flow, payments',
    },
    tags: [
      { name: 'Auth' },
      { name: 'Users' },
      { name: 'Wishlist' },
      { name: 'Services' },
      { name: 'Hotel' },
      { name: 'RentACar' },
      { name: 'Food' },
      { name: 'Travel' },
      { name: 'IncludedServices' },
      { name: 'Reviews' },
      { name: 'FlowBox' },
      { name: 'Payment' },
      { name: 'Admin' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            errorCode: { type: 'string', example: 'VALIDATION_ERROR' },
            message: { type: 'string', example: 'Invalid request body' },
          },
        },
      },
    },
    // Applied globally — public routes override with `security: []`
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/modules/**/*.routes.ts'],
};

/**
 * Generated OpenAPI specification from JSDoc annotations on route files.
 */
export const swaggerSpec = swaggerJSDoc(options);
