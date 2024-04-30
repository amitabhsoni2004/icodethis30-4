let loader =document.querySelector(".loader");
window.addEventListener("load",()=>{
    loader.style.display = "none";
})



// Data object containing friend information
const divElement = {
    first: {
        url: 'https://images.unsplash.com/photo-1572496458684-fc84d7e01631?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDR8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D',
        name: 'Alina Rai',
        mutual: '8 mutual friends'
    },
    second: {
        url: 'https://images.unsplash.com/photo-1714120171905-d297401d612c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D',
        name: 'Hello Gjri',
        mutual: '8 mutual friends'
    },
    third: {
        url: 'https://images.unsplash.com/photo-1714085164244-e748705d3fd4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D',
        name: 'Rahul Dravid',
        mutual: '8 mutual friends'
    }
};

// DOM elements
let white = document.querySelector(".white");
let addedFriendInfos = [];
let isHidden = true;
let friendsContainer = document.querySelector(".friends");
const initialFriendsHeight = friendsContainer.offsetHeight;

// Function to create friend information elements dynamically
function createFriendInfoElement(value) {
    const friendInfoDiv = document.createElement('div');
    friendInfoDiv.classList.add('friendInfo', 'flex', 'flex-row', 'justify-between', 'align-center', 'hidden');
    friendInfoDiv.innerHTML = `
      <div class="flex flex-row gap8 align-center">
        <img src="${value.url}" alt="" class="img">
        <div class="flex flex-column gap0">
          <p class="p1">${value.name}</p>
          <small class="small">${value.mutual}</small>
        </div>
      </div>
      <button class="btn">Confirm</button>
    `;
    return friendInfoDiv;
}

// Toggle view for friend list on clicking the white button
white.addEventListener("click", () => {
    let friendList = document.querySelector(".friendList");
    if (friendList) {
        if (isHidden) {
            white.textContent = "Hide All";
            const friendInfos = Object.entries(divElement).map(([key, value]) => createFriendInfoElement(value));
            addedFriendInfos = friendInfos;
            friendsContainer.style.height = `${initialFriendsHeight + addedFriendInfos.length * 80}px`;
            addedFriendInfos.forEach(friendInfo => {
                friendList.appendChild(friendInfo);
                setTimeout(() => friendInfo.classList.remove('hidden'), 10);
            });
            isHidden = false;
        } else {
            white.textContent = "View All";
            addedFriendInfos.forEach(friendInfo => {
                friendInfo.classList.add('hidden');
                setTimeout(() => friendInfo.remove(), 300);
            });
            friendsContainer.style.height = `${initialFriendsHeight}px`;
            addedFriendInfos = [];
            isHidden = true;
        }
    } else {
        console.log("friendList element not found");
    }
});

// Event delegation to handle clicks on dynamically added buttons
let loginmess = document.querySelector(".loginmess");
let greenTimer = document.querySelector(".greenTimer");
let messageP = document.querySelector(".message p");
friendsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains('btn')) { // Check if the clicked element is a button
        if (event.target.textContent === "Confirm") {
            event.target.textContent = "Reject";
            loginmess.style.display = "flex";

            messageP.textContent = "You have Accepted a Request";
        } else {
            loginmess.style.display = "flex"

            messageP.textContent = "You have Rejected a Request";
            event.target.textContent = "Confirm";
        }
    }
});
greenTimer.addEventListener("animationend", () => {
    loginmess.style.display = "none";
});
