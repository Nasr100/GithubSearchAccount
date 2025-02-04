let userName = document.getElementById('userName');
let avatar = document.getElementById('avatar');
let accountLink = document.getElementById('accountLink');
let accountBio = document.getElementById('accountBio');
let userLocationBirth = document.getElementById('userLocationBirth');
let userLink = document.getElementById('userLink');
let followersCount = document.getElementById('followersCount');
let followingCount = document.getElementById('followingCount');
let reposCount = document.getElementById('reposCount');
const options = {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  };

 
render();


async function render(){
    let userInfo;
    try{
       userInfo = await fetchUser(getFromLocalStorage("userUrl"));
        // let followersInfo = await fetchFollowers();
        // let reposInfo = await fetchRepos();
    }catch(error){
        console.log(error);
    }
   
    avatar.setAttribute("src",userInfo.avatar_url);
    userName.textContent = userInfo.name;
    accountLink.textContent = "@"+userInfo.login;
    accountLink.setAttribute("href",userInfo.html_url);
    accountBio.textContent = userInfo.bio;
 
    userLink.textContent = userInfo.blog;
    userLink.setAttribute("href",userInfo.blog);

}

function getFromLocalStorage(key){
    return localStorage.getItem(key);
}


function fetchUser(url){
    return fetch(url,options).then(data=>{return data.json()});
}
function fetchRepos(url){
    return fetch(url,options).then(data=>data.json());
}
function fetchFollowers(url){
    return fetch(url,options).then(data=>{return data.json()});
}

