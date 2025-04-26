
let form = document.getElementById("form");
let accountInput = document.getElementById("accountInput");
let containerDiv = document.getElementById("container");
let resultCountElem = document.getElementById("resultCount");
let paginationElem = document.getElementById("pagination");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let currPage = document.getElementById("currPage");

let page = parseInt(localStorage.getItem("page")) ?? 1;

// let clickedUser = null;
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/vnd.github.v3+json'
  }
};

  if(getLocalSotrage().length > 0){
    renderFromLocalStorage();
  }
prevBtn.addEventListener('click',()=>{
  prev();
  currPage.textContent = page;
  clear(containerDiv);
  render(localStorage.getItem("user"),page);})
nextBtn.addEventListener("click",()=>{
  next();
  currPage.textContent = page;
  clear(containerDiv);
  render(localStorage.getItem("user"),page)
  ;})


form.addEventListener('submit',e=>{
  e.preventDefault();
    if(accountInput.value != null){
      if(localStorage.getItem("user")){
        localStorage.removeItem("user");
      }
      localStorage.setItem("user",accountInput.value)
      resultCountElem.innerHTML = "";
      clear(containerDiv);
      page = 1;
      currPage.textContent = page;
      render(accountInput.value,page);
    }else{
      
    }
})

async function render(user,page){
  clearLocalstorage();
  const apiUrl = `https://api.github.com/search/users?q=${user}+in:login&per_page=20&page=${page}`;
  let data =  await search(apiUrl);
  resultCountElem.innerHTML = `<div role="alert" class=" relative  w-[200px] p-3 text-sm text-center text-white bg-gradient-to-tr from-slate-800 to-slate-700 rounded-3xl">
    <p>found ${data.total_count} result</p></div> `;
    localStorage.setItem('accountsCount',data.total_count);
    if(data.total_count >= page * 20){
        data.items.forEach(user=>{
          let elem = document.createElement("div");
          elem.className="col-span-1 text-center justify-center flex flex-col items-center hover:bg-gray-50  bg-white shadow-sm border border-slate-200 rounded-lg h-[300px] w-[300px] max-w-full max-h-[300px]";
          elem.innerHTML += createCard(user);
          elem.addEventListener('click',(e)=>{
            console.log(1)
            setUrlsToLocalStrorage(user);
          })
          containerDiv.appendChild(elem);  
          addToLocalStorage(user.avatar_url,user.login,user.url,user.followers_url,user.repos_url);

      });
    }
    localStorage.setItem("page",page);
    if(page > 1){
      prevBtn.removeAttribute("disabled")
    }
      paginationElem.classList.remove("hidden");
      paginationElem.classList.add("flex");

}


function clear(elem){
  elem.innerHTML = "";
}


 async function search(url){
  let users = fetch(url,options).then(
    response => {
        if (!response.ok) throw new Error("Network error")
        else return response.json();
    })
    return users;
}
    

function createCard(user){
  return ` <a href="./account.html" >
                    <div class=" flex flex-col gap-y-5 h-auto max-w-[3000px]  ">
                        <div class="h-auto"> 
                            <img src="${user.avatar_url}" alt="avatar" class="relative inline-block object-cover object-center  rounded-full max-h-[150px] max-w-full "/>
                        </div> 
                        <div class=" ">
                                <h5 class=" text-slate-800 text-lg font-semibold  ">
                                    <p class="text-wrap">${user.login}</p>
                                </h5>                           
                        </div>
                    </div>
                    </a>`
}

function prev(){
  page = page - 1;
}
function next(){
  page = page + 1;
}

function addToLocalStorage(avatar_url,login,url,followers_url,repos_url){
  let user = {avatar_url,login,url,followers_url,repos_url}
  let users = getLocalSotrage();
  users.push(user);
  localStorage.setItem("list",JSON.stringify(users));
}
function getLocalSotrage(){
  return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")): [];
}
function clearLocalstorage(){
  localStorage.clear();
}

function renderFromLocalStorage(){
  let users = getLocalSotrage();
    resultCountElem.innerHTML = `<div role="alert" class=" relative  w-[200px] p-3 text-sm text-center text-white bg-gradient-to-tr from-slate-800 to-slate-700 rounded-3xl">
    <p>found ${localStorage.getItem("accountsCount")} result</p></div> `;
    users.forEach(user=>{
      let elem = document.createElement("div");
          elem.className="col-span-1 text-center justify-center flex flex-col items-center hover:bg-gray-50  bg-white shadow-sm border border-slate-200 rounded-lg h-[300px] w-[300px] max-w-full max-h-[300px]";
          elem.innerHTML += createCard(user);
          elem.addEventListener('click',(e)=>{
            setUrlsToLocalStrorage(user);
      })
          containerDiv.appendChild(elem);  
    })
    if(page > 1){
      prevBtn.removeAttribute("disabled")
    }
      paginationElem.classList.remove("hidden");
      paginationElem.classList.add("flex"); 
    
}

function setUrlsToLocalStrorage(user){
  localStorage.setItem('userUrl',user.url);
  localStorage.setItem('followersUrl',user.followers_url);
  localStorage.setItem('reposUrl',user.repos_url);
}