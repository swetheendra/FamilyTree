const CosmosClient = require('@azure/cosmos').CosmosClient
const config = require('./config')
console.log('config....', config);
const endpoint = config.endpoint
const key = config.key

const databaseId = config.database.id
const containerId = config.container.id

const options = {
      endpoint: endpoint,
      key: key,
      userAgentSuffix: 'CosmosDBJavascriptQuickstart'
    };

const client = new CosmosClient(options)

async function createDatabase() {
    const { database } = await client.databases.createIfNotExists({
      id: databaseId
    })
    console.log(`Created database:\n${database.id}\n`)
  }

async function readDatabase() {
    await client
    .database(databaseId)
    .read()
}

async function readPersons() {
    const querySpec = {
      query: 'SELECT * FROM Persons',
    }
  
    const { resources: results } = await client
      .database(databaseId)
      .container(containerId)
      .items.query(querySpec)
      .fetchAll()
  
    const persons = {};

    for (const queryResult of results) {
      persons[queryResult["personId"]] = queryResult;
    }

    return persons;
  }

  const updatePerson = async (person) => {
    const {item} = await client
    .database(databaseId)
    .container(containerId)
    .item(person.id)
    .replace(person);
    return item;
  }

  
  async function createPerson(itemBody) {
    const ob = await client
      .database(databaseId)
      .container(containerId)
      .items.upsert(itemBody);
    const {item} = ob;
    return item;
  }

  async function deletePerson(itemBody) {
    await client
      .database(databaseId)
      .container(containerId)
      .item(itemBody.id)
      .delete(itemBody)
    console.log(`Deleted item:\n${itemBody.id}\n`)
  }

  export { createDatabase, readPersons, readDatabase, updatePerson, createPerson, deletePerson }