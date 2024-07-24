import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Models,
  Query,
} from 'react-native-appwrite'

export const appWriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.dsacorp.aora',
  projectId: '66a032da0028069adcf4',
  databaseId: '66a0c4b40015fd4942be',
  userCollectionId: '66a0c4db00095afa29d1',
  videoCollectionId: '66a0c511003432cfc020',
  storageId: '66a0c69d00075347d347',
}

interface User {
  email: string
  password: string
  name: string
}

const mockUserObject = {
  email: 'me@example.com',
  password: 'password',
  name: 'Jane Doe',
}

function initAppWriteClient() {
  const client = new Client()
  return client
    .setEndpoint(appWriteConfig.endpoint)
    .setProject(appWriteConfig.projectId)
    .setPlatform(appWriteConfig.platform)
}

function initAccount(client: Client) {
  return new Account(client)
}

function initAvatars(client: Client) {
  return new Avatars(client)
}

function initDB(client: Client) {
  return new Databases(client)
}

export async function createUser(args: User) {
  const { email, password, name } = args
  const client = initAppWriteClient()
  const account = initAccount(client)
  const avatars = initAvatars(client)
  const db = initDB(client)
  try {
    const newAccount = await account.create(ID.unique(), email, password, name)

    if (!newAccount) throw new Error()

    const avatarUrl = avatars.getInitials(name)
    const session = await signIn({ email, password })

    const newUser = await addUserToDB(db, {
      newAccount,
      email,
      username: name,
      avatarUrl,
    })

    return newUser
  } catch (error) {
    console.error(error)
    throw new Error('An error occurred while creating user')
  }
}

export async function signIn(args: { email: string; password: string }) {
  const client = initAppWriteClient()
  const account = initAccount(client)
  try {
    const session = await account.createEmailPasswordSession(
      args.email,
      args.password,
    )

    return session
  } catch (error) {
    console.error(error)
    throw new Error('An error occurred while signing in')
  }
}

async function addUserToDB(
  db: Databases,
  args: {
    newAccount: Models.User<Models.Preferences>
    email: string
    username: string
    avatarUrl: URL
  },
) {
  const { newAccount, email, username, avatarUrl } = args
  try {
    const dbId = appWriteConfig.databaseId
    const userCollectionId = appWriteConfig.userCollectionId
    const uniqueId = ID.unique()
    const accountId = newAccount.$id
    const newUser = await db.createDocument(dbId, userCollectionId, uniqueId, {
      accountId,
      email,
      username,
      avatar: avatarUrl,
    })

    return newUser
  } catch (error) {
    console.error(error)
  }
}

export async function getCurrentUser() {
  const db = initDB(initAppWriteClient())
  try {
    const account = initAccount(initAppWriteClient())
    const currentAccount = await account.get()

    if (!currentAccount) throw new Error('could not fetch current account')

    const currentUser = await db.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    )

    if (!currentUser) throw new Error('could not fetch current user')

    return currentUser.documents[0]
  } catch (error) {
    console.error(error)
  }
}
