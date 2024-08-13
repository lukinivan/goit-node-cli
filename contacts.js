import * as fs from "node:fs/promises";
import * as url from "url";
import * as path from "node:path";
import { v4 as uuidv4 } from "uuid";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const contactsPath = path.join(__dirname, "./db/contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const getContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

export const getContactById = async (contactId) => {
  const contacts = await getContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

export const addContact = async (name, email, phone) => {
  const contacts = await getContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
};

export const removeContact = async (contactId) => {
  const contacts = await getContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;

  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);

  return result;
};

// addContact("Alex", "dfdf@sdsd.ds", "12345");

removeContact("e41621d6-9df6-4483-8b5c-dbc9e6181f73");
