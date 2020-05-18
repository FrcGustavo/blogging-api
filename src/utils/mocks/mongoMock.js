const sinon = require('sinon');
const { PostsMock } = require('./postsMock');

/**
 * list of stubs
 */
const findStub = sinon.stub();
const limitStub = sinon.stub();
const sortStub = sinon.stub();
const skipStub = sinon.stub();
const countDocumentsStub = sinon.stub();
const createStub = sinon.stub();

/**
 * stubs by posts
 */
skipStub.withArgs(0).resolves(PostsMock);
skipStub.withArgs(20).resolves([]);
sortStub.withArgs('-_id').returns({ skip: (query) => skipStub(query) });
sortStub.withArgs('title').returns({ skip: (query) => skipStub(query) });
limitStub.withArgs(10).returns({ sort: (query) => sortStub(query) });
limitStub.withArgs(20).returns({ sort: (query) => sortStub(query) });
findStub.withArgs({ isPublic: true, isActive: true })
  .returns({ limit: (query) => limitStub(query) });

countDocumentsStub.withArgs({ isPublic: true, isActive: true }).resolves(PostsMock.length);
createStub.withArgs({
  title: '',
  description: '',
  cover: '',
  body: '',
  keywords: '',
  slug: 'this-my-posts',
  views: 0,
  timeShared: 0,
  likes: 0,
  isPublic: false,
}).resolves(PostsMock[0]);


const find = (query) => findStub(query);
const countDocuments = (query) => countDocumentsStub(query);
const create = (query) => createStub(query);

module.exports = {
  findStub,
  countDocumentsStub,
  createStub,
  mongoMock: {
    find,
    countDocuments,
    create,
  },
};
