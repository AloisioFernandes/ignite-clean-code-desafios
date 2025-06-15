// Nomenclatura de variáveis

const userCategories = [
  {
    title: 'User',
    minimumFollowers: 5
  },
  {
    title: 'Friendly',
    minimumFollowers: 50,
  },
  {
    title: 'Famous',
    minimumFollowers: 500,
  },
  {
    title: 'Super Star',
    minimumFollowers: 1000,
  },
]

export default async function getUserData(req, res) {
  const username = String(req.query.username)

  if (!username) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const response = await fetch(`https://api.github.com/users/${username}`);

  if (response.status === 404) {
    return res.status(400).json({
      message: `User with username "${username}" not found`
    })
  }

  const userData = await response.json()

  const orderedCategories = userCategories.sort((categoryA, categoryB) =>  categoryB.minimumFollowers - categoryA.minimumFollowers); 

  const category = orderedCategories.find(category => userData.minimumFollowers > category.minimumFollowers)

  const result = {
    username,
    category: category?.title || ""
  }

  return result
}

getUserData({ query: {
  username: 'josepholiveira'
}}, {})