import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('IssuesController (e2e)', () => {
  let app: INestApplication;

  let randomId: string;
  let invalidId: string;

  beforeAll(async () => {
    randomId = '2bb33a97-28a3-47b6-967f-92948888c561';
    invalidId = '123';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  describe('/issues (POST)', () => {
    it('should return 201', () => {
      return request(app.getHttpServer())
        .post('/issues')
        .send({
          title: 'Test issue',
          description: 'Test issue description',
        })
        .expect(201);
    });

    it('should return 400, because the description is missing', () => {
      return request(app.getHttpServer())
        .post('/issues')
        .send({
          title: 'Test issue',
        })
        .expect({
          statusCode: 400,
          message: [
            'description should not be empty',
            'description must be a string',
          ],
          error: 'Bad Request',
        });
    });

    it('should return 400, because the title is missing', () => {
      return request(app.getHttpServer())
        .post('/issues')
        .send({
          description: 'Test issue description',
        })
        .expect({
          statusCode: 400,
          message: ['title should not be empty', 'title must be a string'],
          error: 'Bad Request',
        });
    });

    it('should return 400, because both title and description is missiong', () => {
      return request(app.getHttpServer())
        .post('/issues')
        .send({})
        .expect({
          statusCode: 400,
          message: [
            'title should not be empty',
            'title must be a string',
            'description should not be empty',
            'description must be a string',
          ],
          error: 'Bad Request',
        });
    });
  });

  describe('/issues (GET)', () => {
    it('should return 200 and an array', async () => {
      const response = await request(app.getHttpServer())
        .get('/issues')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return 200 and an array with one issue', async () => {
      const response = await request(app.getHttpServer())
        .get('/issues?title=Test issue')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(1);
    });

    it('should return 200 and an empty array', async () => {
      const response = await request(app.getHttpServer())
        .get('/issues?title=Test issue 2')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(0);
    });
  });

  describe('/issues/:id (GET)', () => {
    it('should return 200', async () => {
      const response = await request(app.getHttpServer()).get('/issues');

      return request(app.getHttpServer())
        .get(`/issues/${response.body[0].id}`)
        .expect(200);
    });

    it('should return 404, because issue not found', () => {
      return request(app.getHttpServer())
        .get(`/issues/${randomId}`)
        .expect({
          statusCode: 404,
          message: `Issue #${randomId} not found`,
          error: 'Not Found',
        });
    });

    it('should return 400, because invalid uuid', () => {
      return request(app.getHttpServer()).get(`/issues/${invalidId}`).expect({
        statusCode: 400,
        message: 'Validation failed (uuid is expected)',
        error: 'Bad Request',
      });
    });
  });

  describe('/issues/:id (PATCH)', () => {
    let response: request.Response;
    let issue;

    beforeEach(async () => {
      response = await request(app.getHttpServer()).get('/issues');
      issue = response.body[0];
    });

    it('should return 200', async () => {
      return request(app.getHttpServer())
        .patch(`/issues/${issue.id}`)
        .send({
          title: 'Test issue updated',
          description: 'Test issue description updated',
          state: 'closed',
        })
        .expect(200);
    });

    it('should return 400, because invalid state', () => {
      return request(app.getHttpServer())
        .patch(`/issues/${issue.id}`)
        .send({
          title: 'Test issue updated',
          description: 'Test issue description updated',
          state: 'invalid',
        })
        .expect({
          statusCode: 400,
          message: [
            'state must be one of the following values: pending, closed',
          ],
          error: 'Bad Request',
        });
    });

    it('should return 400, once an issue is closed it cannot be set back to pending', () => {
      return request(app.getHttpServer())
        .patch(`/issues/${issue.id}`)
        .send({
          state: 'pending',
        })
        .expect({
          statusCode: 400,
          message: 'Once an issue is closed it cannot be set back to pending',
          error: 'Bad Request',
        });
    });

    it('should return 400, once an issue is closed it cannot be set back to open', () => {
      return request(app.getHttpServer())
        .patch(`/issues/${issue.id}`)
        .send({
          state: 'open',
        })
        .expect({
          statusCode: 400,
          message: [
            'state must be one of the following values: pending, closed',
          ],
          error: 'Bad Request',
        });
    });

    it('should return 400, once an issue is pending it cannot be set back to open', () => {
      return request(app.getHttpServer())
        .patch(`/issues/${issue.id}`)
        .send({
          state: 'open',
        })
        .expect({
          statusCode: 400,
          message: [
            'state must be one of the following values: pending, closed',
          ],
          error: 'Bad Request',
        });
    });

    it('should return 404, because issue not found', () => {
      return request(app.getHttpServer())
        .patch(`/issues/${randomId}`)
        .send({
          title: 'Test issue updated',
          description: 'Test issue description updated',
        })
        .expect({
          statusCode: 404,
          message: `Issue #${randomId} not found`,
          error: 'Not Found',
        });
    });

    it('should return 400, because invalid uuid', () => {
      return request(app.getHttpServer())
        .patch(`/issues/${invalidId}`)
        .send({
          title: 'Test issue updated',
          description: 'Test issue description updated',
        })
        .expect({
          statusCode: 400,
          message: 'Validation failed (uuid is expected)',
          error: 'Bad Request',
        });
    });
  });

  describe('/issues/:id (DELETE)', () => {
    it('should return 200', async () => {
      const response = await request(app.getHttpServer()).get('/issues');

      return request(app.getHttpServer())
        .delete(`/issues/${response.body[0].id}`)
        .expect(200);
    });

    it('should return 404, because issue not found', () => {
      return request(app.getHttpServer())
        .delete(`/issues/${randomId}`)
        .expect({
          statusCode: 404,
          message: `Issue #${randomId} not found`,
          error: 'Not Found',
        });
    });

    it('should return 400, because invalid uuid', () => {
      return request(app.getHttpServer())
        .delete(`/issues/${invalidId}`)
        .expect({
          statusCode: 400,
          message: 'Validation failed (uuid is expected)',
          error: 'Bad Request',
        });
    });
  });
});
