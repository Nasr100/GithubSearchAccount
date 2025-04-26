let userName = document.getElementById('userName');
let avatar = document.getElementById('avatar');
let accountLink = document.getElementById('accountLink');
let accountBio = document.getElementById('accountBio');
let userLocationBirth = document.getElementById('userLocationBirth');
let userLink = document.getElementById('userLink');
let followersCount = document.getElementById('followersCount');
let followingCount = document.getElementById('followingCount');
let reposCount = document.getElementById('reposCount');
let reposContainer = document.getElementById('repos');
let followersConatiner = document.getElementById("followers");
let container = document.getElementById("container");
const options = {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  };

 
render();


async function render(){
    let userInfo;
    let reposInfo ;
    let followersInfo;
    try{
        userInfo = await fetchUser(getFromLocalStorage("userUrl"));
        followersInfo = await fetchFollowers(getFromLocalStorage('followersUrl'));
        reposInfo = await fetchRepos(getFromLocalStorage("reposUrl"));
        avatar.setAttribute("src",userInfo.avatar_url);
        userName.textContent = userInfo.name;
        accountLink.textContent = "@"+userInfo.login;
        accountLink.setAttribute("href",userInfo.html_url);
        accountBio.textContent = userInfo.bio;
        if(userInfo.blog){
            userLink.innerHTML =`<i class="fa-solid fa-link text-xs"></i><p class="text-sm text-green-600"><a href="${userInfo.blog}" >${userInfo.blog}</a></p>` ;
        }
        if(userInfo.location){
            userLocationBirth.innerHTML = `<i class="fa-solid fa-location-dot text-lg"></i><p class="text-sm" >${userInfo.location}</p>`
        }
        followersCount.textContent = userInfo.followers;
        followingCount.textContent = userInfo.following;
        reposCount.textContent = userInfo.public_repos;
        reposInfo.forEach(repo=>{
            let diff = new Date(repo.pushed_at.split('T')[0]).getTime() - new Date().getTime();
            reposContainer.innerHTML += `  <div class="mb-3 border-b-[1px] border-gray-300 pb-5  ">
                            <div class="">
                                <p class="text-green-600 text-xl hover:text-green-500 duration-100"><a href="${repo.html_url}">${repo.name}</a></p>
                            </div>
                            <div class="mb-5 mt-2">
                                <p class="text-sm">${repo.description}</p>
                            </div>
                            <div class="flex justify-between">
                               <div class="flex gap-x-5 items-center">
                                <div class="flex gap-x-1 items-center"><i class="fa-solid fa-star text-sm"></i><p>${repo.stargazers_count}</p></div>
                                <div class="flex gap-x-1 items-center"><i class="fa-solid fa-code-branch text-sm"></i><p>${repo.forks_count}</p></div>
                               </div>
                               <p class="text-sm  text-gray-600">last push ${((diff / (24*60*60*1000)) * -1).toFixed(0)} days ago</p>
                            </div>
                        </div>`
        });
         followersInfo.forEach(follower=>{
            followersConatiner.innerHTML += `
                            <div class="mb-3 border-b-[1px] border-gray-300 pb-5  flex items-start      gap-x-2">
                           <img src="${follower.avatar_url}" alt="" class="w-24 rounded-lg object-cover object-center">
                           <p class="text-2xl">${follower.login}</p>
                        </div>`;
         })
    
    }catch(error){
        console.log(1)
        container.innerHTML = `<div class="infos-container flex justify-center w-full"><p class = "text-red-500 text-2xl">API rate limit exceeded</p></div>`;
    }
   
   

}

function getFromLocalStorage(key){
    return localStorage.getItem(key);
}


function fetchUser(url){
    return fetch(url,options).then(data=>{return data.json()});
}
function fetchRepos(url){
    return fetch(url,options).then(data=>{return data.json()});
}
function fetchFollowers(url){
    return fetch(url,options).then(data=>{return data.json()});
}


