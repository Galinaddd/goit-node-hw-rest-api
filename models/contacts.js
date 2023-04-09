const { nanoid } = require("nanoid");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);

  return contactsList;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }

  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const indx = contacts.findIndex((contact) => contact.id === contactId);
  if (indx === -1) {
    return null;
  }
  const deleteContact = contacts.splice(indx, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts));

  return deleteContact;
}

async function addContact({name, email, phone}) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(21),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const indx = contacts.findIndex((contact) => contact.id === contactId);
  if (indx === -1) {
    return null;
  }
  contacts[indx] = { ...contacts[indx], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[indx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
