const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming your app.js is one level up

chai.use(chaiHttp);
const expect = chai.expect;

describe('Task Manager API', () => {
  // Define a variable to hold the task ID
  let taskId;

  // Test adding a task
//  it('should add a new task', async () => {
//  const res = await chai
//    .request(app)
 //   .post('/tasks')
   // .send({ task: 'Sample Task' });

 // expect(res).to.have.status(201); // Expect a successful response status

  // Check that the response has a body (payload)
 // expect(res.body).to.exist;

  // You can further inspect the response body based on your actual API response format
  // For example, if the API returns an object with 'message' and 'id' properties:
//  expect(res.body).to.have.property('message', 'Task added successfully');
//  expect(res.body).to.have.property('id'); // Ensure there is an 'id' property

  //taskId = res.body.id; // Store the task ID for deletion test
 // });

  // Test getting all tasks
  it('should get all tasks', async () => {
    const res = await chai
      .request(app)
      .get('/tasks');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });

  // Test deleting a task
  it('should delete a task', async () => {
    const res = await chai
      .request(app)
      .delete(`/tasks/${taskId}`); // Use the stored task ID

    expect(res).to.have.status(204);
  });

  // Test deleting a non-existent task
  it('should return 204 for non-existent task', async () => {
    const res = await chai
      .request(app)
      .delete('/tasks/999'); // Use an arbitrary non-existent ID

    expect(res).to.have.status(204);
  });
});

