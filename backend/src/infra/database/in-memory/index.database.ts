import { InMemoryDatabase } from "./inmemory.database.js";
import { InMemoryDatabaseRepository } from "./repository.database.js";

const database = InMemoryDatabase.getInstance();
const inMemoryRepository = new InMemoryDatabaseRepository(database);

export { inMemoryRepository };