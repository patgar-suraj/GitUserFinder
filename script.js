let btn = document.querySelector(".search");
let usernameinp = document.querySelector(".usernameinp");
let card = document.querySelector(".card");

function getProfileData(user) {
    return fetch(`https://api.github.com/users/${user}`).then(raw => {
        if (!raw.ok) throw new Error("User not Found!");
        return raw.json();
    });
};

function getRepos(userrepo) {
    fetch(`htpps://api.github.com/users/${userrepo}/repos?sort=updated`).then(raw => {
        if (!raw.ok) throw new Error("Failed to fetch repos!!!")
        return raw.json();
    });
};

function decorateProfileData(details) {
    let data = `<div class="flex justify-center md:justify-start">
                    <img src="${details.avatar_url}" alt="User Avatar"
                        class="w-32 h-32 rounded-full object-cover border-4 border-indigo-500" />
                </div>

                <!-- Basic Info -->
                <div class="md:col-span-2 space-y-2">
                    <h2 class="text-2xl font-bold text-gray-900">${details.name}</h2>
                    <p class="text-gray-500">@${details.login}</p>
                    <p class="text-gray-700">${details.bio ? details.bio : "There is no bio"}</p>

                    <!-- Stats -->
                    <div class="flex gap-6 mt-4">
                        <div>
                            <span class="block text-xl font-bold text-gray-900">${details.public_repos ? details.public_repos : "No repos created"}</span>
                            <span class="text-gray-500">Repos</span>
                        </div>
                        <div>
                            <span class="block text-xl font-bold text-gray-900">${details.followers}</span>
                            <span class="text-gray-500">Followers</span>
                        </div>
                        <div>
                            <span class="block text-xl font-bold text-gray-900">${details.following}</span>
                            <span class="text-gray-500">Following</span>
                        </div>
                    </div>

                    <!-- Extra Details -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 mt-4 text-sm text-gray-600">
                        <div><strong>Company:</strong> ${details.company ? details.company : "N/A"}</div>
                        <div><strong>Location:</strong> ${details.location ? details.location : "N/A"}</div>
                        <div><strong>Blog:</strong> <a href="${details.blog ? details.blog : "N/A"}"
                                class="text-indigo-600 hover:underline">github.blog</a></div>
                        <div><strong>Joined:</strong> ${details.created_at}</div>
                    </div>
                </div>`;
    card.innerHTML = data;
}

btn.addEventListener("click", function () {
    let username = usernameinp.value.trim();
    if (username.length > 0) {
        getProfileData(username).then((data) => {
            decorateProfileData(data);
        });
    } else {
        alert("Invalid User Name!");
    };
});