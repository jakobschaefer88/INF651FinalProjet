/*
Function 1 createElemWithText

1.The function createElemWithText should exist.
2. The function should create and return the requested HTML element.
3. The function should apply the correct textContent to the returned element.
4. The function should create an element with the default tag name 'p' if no tag name is specified.
5. The function should create an element with an empty string as text content if no text is provided.
6. The function should not apply a class to the element if className parameter is not provided.
7. The function should apply a class to the element if className parameter is provided.
*/

function createElemWithText(elementType = "p", textContent = "", className) {
    const elem = document.createElement(elementType);
    elem.textContent = textContent;
    if (className) {
        elem.className = className;
    }
    return elem;
}

/*
Function 2 createSelectOptions

1. Function CreateSelectOptions should exist
2. The function should return undefined if no parameter is provided.
3. The function should return an array.
4. The function should return an array of options with the same length as the users array
5. The function should return an array of option elements
6. The function should assign the related user id to the value attibute of the options elements
7. The function should assign the related user name to the textContent attribute of the options elements
*/

function createSelectOptions(users) {
    if (users === undefined) {
        return undefined;
    }

    if (!Array.isArray(users)) {
        return [];
    }

    const options =[];

    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        options.push(option);
    });

    return options;
}

/*
Function 3 toggleCommentSection

1. The function toggleCommentSection should exist
2. The function should return undefined if postId parameter is not provided
3. The function should return null if passed a parameter that does not match a postId
4. The function should select and return the correct section element.
5. The function should toggle the 'hide' class on the section element.
*/

function toggleCommentSection(postID) {
    if (postID === undefined) {
        return undefined;
    }

    const section = document.querySelector(`section[data-post-id="${postID}"]`);

    if (!section) {
        return null;
    }

    section.classList.toggle('hide');

    return section;
}

/*
Function 4 toggleCommentButton

1. The function toggleCommentButton should exist
2. The function should return undefined if not passed a postId parameter.
3. The function should return null if passed a parameter that does not match a post id
4. The function should select and return the correct button element
5. The function should change textContent to 'Hide comments" if it had "Show comments".
*/

function toggleCommentButton(postID) {
    if (postID === undefined) {
        return undefined;
    }

    const button = document.querySelector(`button[data-post-id="${postID}"]`);

    if (!button) {
        return null;
    }

    if (button.textContent === "Show Comments") {
        button.textContent = "Hide Comments";
    } else {
        button.textContent = "Show Comments";
    }
    return button;
}

/*
Function 5 deleteChildElements

1. The function deleteChildElements should exist.
2. The function should return undefined if an HTML element is not received as a parameter.
3. The function should return the same HTML element it receives as parameter.
4. The function should return the HTML element with all child elements deleted.
*/

function deleteChildElements(element) {
    if (!(element instanceof HTMLElement)) {
        return undefined;
    }

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    return element;
}

/*
Function 6 addButtonListeners

1. The function addButtonListeners should exist.
2. The function should return an empty NodeList if there are no buttons found within the main element.
3. The function should select and return all button elements found within the main element
4. The function should skip adding a click event listener to a button without postId data attribute.
5. The function should add a click listener that calls the toggleComments function to each button element found within the main element.
*/

function addButtonListeners() {
    const buttons = document.querySelectorAll("main button");
    if (buttons.length === 0) return buttons;

    function handler(event) {
        const postId = event.target.dataset.postId;
        toggleComments(event, postId);
    }

    for (const button of buttons) {
        if (button.dataset.postId) {
            button.addEventListener("click", handler);
        }
    }

    return buttons;
}

/*
Function 7 removeButtonListeners

1. The function removeButtonListeners should exist.
2. The function should return an empty NodeList if there are no buttons found within the main element.
3. The function should select and return all button elements found within the main element.
4. The function should remove all click listeners that call the toggleComments function for all button elements found within the main element.
*/

function removeButtonListeners() {
    const buttons = document.querySelectorAll("main button");

    if (buttons.length === 0) {
        return buttons;
    }
    function handler(event) {
        const postId = event.target.dataset.postId;
        toggleComments(event, postId);
    }

    for (const button of buttons) {
        const handler = button._toggleHandler;
        if (button.dataset.postId) {
            button.removeEventListener("click", handler);
        }
    }

    return buttons;
}

/*
Function 8 createComments

1. The function createComments should exist.
2. The function should return undefined if it does not receive a parameter.
3. The function should create and return a document fragment.
4. The function should create and append one article element to the fragment for each comment.
5. The function should create one h3 element and two paragraph elements and append them to their article parent element.
6. The function should assign accurate data to the h3 (name) and paragraph elements (body and From: email.)
*/

function createComments(comments) {
    if (comments === undefined) {
        return undefined;
    }

    const fragment = document.createDocumentFragment();

    for(const comment of comments) {
        const article = document.createElement('article');

        const h3 = createElemWithText('h3', comment.name);
        const p1 = createElemWithText('p', comment.body);
        const p2 = createElemWithText('p', `From: ${comment.email}`);

        article.append(h3, p1, p2);
        fragment.append(article);

    }
    return fragment;
}

/*
Function 9 populateSelectMenu

1. The function populateSelectMenu should exist.
2. The function should return undefined if it does not receive a parameter with JSON users data.
3. The function selects and returns the select menu.
4. The function receives the option elements from createSelectOptions and appends them to the select element
*/

function populateSelectMenu(users) {
    if (!users) {
        return undefined;
    }

    const selectMenu = document.getElementById('selectMenu');
    const options = createSelectOptions(users);

    if(!options) {
        return undefined;
    }

    for(const option of options) {
        selectMenu.append(option);
    }
    return selectMenu;
}

/*
Function 10 getUsers

1. The function getUsers should exist
2. The function should use async / await to retrieve and return users data.
3. The function should return accurate JSON users data.
*/

async function getUsers() {
    try {
        const respone = await fetch('https://jsonplaceholder.typicode.com/users');
        return await respone.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

/*
Function 11 getUserPosts

1. The function getUserPosts should exist
2. The function should return undefined if no user ID parameter is provided.
3. The function should use async / await to retrieve and return user posts data.
4. The function should return accurate JSON user posts data.
*/

async function getUserPosts(userId) {
    if (!userId) {
        return undefined;
    }

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

/*
Function 12 getUser

1. The function getUser should exist.
2. The function should return undefined if no user ID parameter is provided.
3. The function should use async / await to retrieve and return data for a specific user ID.
4. The function should return accurate JSON user data.
*/

async function getUser(userId) {
    if (!userId) {
        return undefined;
    }
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

/*
Function 13 getPostComments

1. The function getPostComments should exist.
2. The function should return undefined if no post ID parameter is provided.
3. The function should use async / await to retrieve and return data for a specific post ID.
4. The function getPostComments should return accurate JSON post comment data.
*/

async function getPostComments(postId) {
    if (!postId) {
        return undefined;
    }
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

/*
Function 14 displayComments

1. The function displayComments should exist.
2. The function should return undefined if no postId parameter is provided.
3. The function should create and return a section element.
4. The function should return a section element with the postId as dataset attribute.
5. The function should return a section element with 'comments' and 'hide' classes when postId is provided.
6. The function should create and return a section element with all comments for the given post ID appended.
*/

async function displayComments(postId) {
    if (!postId) {
        return undefined;
    }
    const section = document.createElement('section');
    section.dataset.postId = postId;
    section.classList.add('comments', 'hide');

    const comments = await getPostComments(postId);
    const fragment = createComments(comments);

    if (fragment) {
        section.append(fragment);
    }

    return section;
}

/*
Function 15 createPosts

1. The function createPosts should exist.
2. The function should return undefined if no posts data parameter is provided.
3. The function should create and return a document fragment.
4. The function should create an article element for each post and append each to the document fragment.
5. The function should create an h2, 4 paragraphs, a button, and a section element, and then append each element to the parent article element in that specific order.
6. The function should create an h2, 4 paragraphs, a button, and a section element, and assign the desired textContent and attributes per the project instructions.
*/

async function createPosts(posts) {
    if (!posts) {
        return undefined;
    }

    const fragment = document.createDocumentFragment();
    for(const post of posts) {
        const article = document.createElement('article');
        const h2 = createElemWithText('h2', post.title);
        const pBody = createElemWithText('p', post.body);
        const pId = createElemWithText('p', `Post ID: ${post.id}`);
        const author = await getUser(post.userId);
        const pAuthor = createElemWithText('p',`Author: ${author.name} with ${author.company.name}`);
        const pCompany = createElemWithText("p", author.company.catchPhrase);
        const button = createElemWithText('button', 'Show Comments');
        button.dataset.postId = post.id;
        const section = await displayComments(post.id);

        article.append(h2, pBody, pId, pAuthor, pCompany, button, section);
        fragment.append(article);
    }
    return fragment;
}

/*
Function 16 displayPosts

1. The function displayPosts should exist.
2. The function should return a paragraph element with the default-text class if no posts data is provided.
3. The function should return a document fragment if posts data is provided.
4. The function should append a document fragment containing article elements (the posts) to the main element.
*/

async function displayPosts(posts) {
    const main = document.querySelector('main');
    const element = posts ? await createPosts(posts) : createElemWithText('p', 'Select an Employee to display their posts.', 'default-text');
    main.append(element);
    return element;
}

/*
Function 17 toggleComments

1. The function toggleComments should exist.
2. The function should return undefined if it does not receive the required event and postId parameters.
3. The function should return an array containing the section element returned by toggleCommentSection and the button element returned by toggleCommentButton.
*/

function toggleComments(event, postId) {
    if (!event || !postId) {
        return undefined;
    }
    const section = toggleCommentSection(postId);
    const button = toggleCommentButton(postId);
    return [section, button];
}

/*
Function 18 refreshPosts

1. The function refreshPosts should exist.
2. The function should return undefined if it does not receive a posts data parameter.
3. The function should return an array of the results from the functions it calls.
4. The function should return an array of results with accurate data.
*/

async function refreshPosts(posts) {
    if (!posts) {
        return undefined;
    }

    const removeButtons = removeButtonListeners();
    const main = deleteChildElements(document.querySelector('main'));
    const fragment = await displayPosts(posts);
    const addButtons = addButtonListeners();
    return [removeButtons, main, fragment, addButtons];
}

/*
Function 19 selectMenuChangeEventHandler

1. The function selectMenuChangeEventHandler should exist.
2. The function should return undefined if it does not receive a change event parameter.
3. The function should return an array.
4. The function should contain the userId, the posts array and the refreshPostsArray.
5. The function should return arrays with accurate data.
*/

async function selectMenuChangeEventHandler(event) {
    if (!event) {
        return undefined;
    }

    let selectMenu;

    if (event instanceof HTMLElement) {
        selectMenu = event;
    } else if (event.target instanceof HTMLElement) {
        selectMenu = event.target;
    } else if (event.currentTarget instanceof HTMLElement) {
        selectMenu = event.currentTarget;
    } else {
        selectMenu = document.getElementById("selectMenu");
    }

    if (!selectMenu) {
        return undefined;
    }

    selectMenu.disabled = true;

    const userId = Number(selectMenu.value);
    const posts = await getUserPosts(userId);
    const refreshPostsArray = await refreshPosts(posts);

    selectMenu.disabled = false;

    return [
        userId,
        Array.isArray(posts) ? posts : [],
        Array.isArray(refreshPostsArray) ? refreshPostsArray : []
    ];
}

/*
Function 20 initPage

1. The function initPage should exist.
2. The function should return an array.
3. The function should return an array that contains the users data.
4. The function should return an array that contains a select element.
*/

async function initPage() {
    const users = await getUsers();
    const selectMenu = populateSelectMenu(users);
    return [users, selectMenu];
}

/*
Function 21 initApp

1. The function initApp should exist.
*/

function initApp() {
    initPage();
    document.getElementById('selectMenu').addEventListener('change', selectMenuChangeEventHandler);
}

document.addEventListener('DOMContentLoaded', initApp);