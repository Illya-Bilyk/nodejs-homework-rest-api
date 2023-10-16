const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./", "contacts.json");

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath);

  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find((item) => item.id === contactId);

  return contact || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();

  const contactIndex = allContacts.findIndex((item) => item.id === contactId);

  if (contactIndex !== -1) {
    const deletedContact = allContacts.splice(contactIndex, 1);

    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

    return deletedContact[0];
  }
  return null;
}

async function addContact(data) {
  const newContact = {
    id: nanoid(),
    ...data,
  };

  const allContacts = await listContacts();
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
}

async function updateById(id, data) {
  const allContacts = await listContacts();

  const index = allContacts.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const contactToUpdate = allContacts[index];

  allContacts[index] = { ...contactToUpdate, id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};

listContacts();
