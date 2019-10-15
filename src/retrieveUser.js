 /**
 * Function that retrieves the user of the search 
 * 
 * @param {string} query (the user we want to look for)
 * 
 * @returns {Error} Error if the user does not exist or you need credentials to search for it 
 * @returns {Promise} data of the wanted user
 * @returns {innerHTML} painted data components of the wanted user
 */
const fetch = require('node-fetch')

module.exports =function (query){

    return (async () => {
            const response = await fetch(`https://api.github.com/users/${query}`)
                if (response.status !== 200){
                    throw Error ("Does not exist")
                }
                else {
                    const user = await response.json()
                    const respons = await fetch(user.repos_url)
                    const repos = await respons.json() 
                    return {user, repos}
                }
    })()
} 
