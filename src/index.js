 /**
 * Function seachr that contains the errors 
 * 
 * @param {string} event (triger that does de search)
 * 
 * @returns {Error} Error if the user does not exist or you need credentials to search for it 
 * @returns {Promise} data of the wanted user
 */
const retrieveUser = require('./retrieveUser.js')
document.getElementById('search').addEventListener('submit', search)

async function search(event){
    event.preventDefault()
    const query = document.getElementById('query').value
    try{
        const response = await retrieveUser(query)
        paintUser(response)
    }catch({ message }){
        await feedback(message)
    }
}

 /**
 * Function that paints the results of the search
 * 
 * @param {string} response (all the data of the user)
 *  
 * @returns {innerHTML} painted data components of the wanted user
 */

function paintUser(response) {
    const { user, repos } = response
    document.getElementById('feedback').classList.remove('panel-show')
    document.getElementById('feedback').classList.add('panel-hide')
    document.getElementById('results').classList.remove('panel-hide')
    document.getElementById('results').classList.add('panel-show')
    let output = `<div class='panel_results_div'>`

    output += `<img class='panel_results_img' src='${user.avatar_url}'>
        <div class='panel_results-user'>
        <h5 class='panel_results-user_nickname'>${user.login}</h5>
        ${user.name ? `<h2 class='panel_results-user_name'>${user.name}</h2>`: ''}
        ${user.bio ? `<p class='panel_results-user_bio'>${user.bio}</p>`: ''}</div>
        </div>`

    output += `<div class='panel_results_info'>
        <h4 class='panel_results_repo'>Repositories</h4>`
    repos.forEach(function(repo){ 
        output += `<ul class='panel_results_name'>
        <li class='panel_results_name_li'>${repo.name}</li>
        <div class='panel_results_name_div'>
        <li class='panel_results_name_li'>${repo.stargazers_count} <svg class="star" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg> </li>
        <li class='panel_results_name_li'>${repo.forks_count} <svg class="forked" viewBox="0 0 10 16" version="1.1" width="10" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg> </li>
        <div>
        </ul>`
    })
    output += `</div>`
    document.getElementById('results').innerHTML = output
}

 /**
 * Function that paints the results of the search
 * 
 * @param {string} message (error message)
 *  
 * @returns {innerHTML} painted error message
 */

function feedback(message){
    document.getElementById('results').classList.remove('panel-show')
    document.getElementById('results').classList.add('panel-hide')
    document.getElementById('feedback').classList.remove('panel-hide')
    document.getElementById('feedback').classList.add('panel-show')
    let output = `<h3 class='panel_feedback-message'>${message}</h3>`
    document.getElementById('feedback').innerHTML = output
}
