const minus = document.querySelectorAll(".minus");
const plus = document.querySelectorAll(".plus");
let change = false;


//vote increase and decrease


const voteChange = (btn, voteText) => {
  if (btn.classList.contains("plus")) {
    if (change) return;
    voteText.innerText = parseFloat(voteText.innerText) + 1;   
    change = true;
  }
  if (btn.classList.contains("minus")) {
    if (!change) return;
    voteText.innerText = parseFloat(voteText.innerText) - 1;
    change = false;
  }
};

minus.forEach((btn) => {
  btn.onclick = () => {
    const voteText = btn.previousElementSibling;
    voteChange(btn, voteText);
  };
});

plus.forEach((btn) => {
  btn.onclick = () => {
    const voteText = btn.nextElementSibling;
    voteChange(btn, voteText);
  };
});

// Reply
const replyButtons = document.querySelectorAll(".reply");

replyButtons.forEach((btn) => {
  btn.onclick = () => {
    const card = btn.parentElement.parentElement;
    const comment = card.lastElementChild;
    const name = card.children[1].children[1].innerText;
    let textArea = comment.children[1];
    comment.classList.toggle("active");

    const cardParent = card.parentElement;
    const subCardparent = card.parentElement.parentElement;
    const replyButton = comment.lastElementChild;
    replyButton.onclick = () => {
      let subCard = document.createElement("div");
      subCard.className = "sub-card";
      subCard.innerHTML = `<div class="line"></div>
          <div class="card">
            <div class="vote">
              <div class="vote-icon plus">
                <img src="images/icon-plus.svg" alt="icon-plus" />
              </div>
              <p class="vote-text">0</p>
              <div class="vote-icon minus">
                <img src="images/icon-minus.svg" alt="icon-minus" />
              </div>
            </div>
            <div class="header">
              <div class="avatar">
                <img src="images/avatars/image-juliusomo.png" alt="" />
              </div>
              <p class="name">juliusomo <span class="user-label">you</span></p>
              <p class="date">just now</p>
            </div>
            <div class="icon">
              <div class="delete" onclick="showModule()">
                <img src="images/icon-delete.svg" alt="" />
                <p>Delete</p>
              </div>
              <div class="edit" onclick="editComment()">
                <img src="images/icon-edit.svg" alt="" />
                <p>Edit</p>
              </div>
            </div>
            <div class="content">
              <span class="initial">@${name}</span> ${textArea.value}
            </div>
          </div>`;
      if (card.parentNode.classList.contains("row")) {
        cardParent.append(subCard);
        textArea.value = "";
      }
      if (card.parentNode.classList.contains("sub-card")) {
        subCardparent.append(subCard);
        textArea.value = "";
      }
      comment.classList.remove("active");
    };
  };
});

// DELETE MODULE
const module = document.querySelector(".module-delete");

function showModule() {
  module.classList.add("show-module");
}

const btnCancelModule = document.querySelector(".btn-cancel");
const btnDeleteModule = document.querySelector(".btn-delete");

btnCancelModule.onclick = () => {
  module.classList.remove("show-module");
};

btnDeleteModule.onclick = () => {
  const deletebutton = document.querySelector(".delete");
  const card = deletebutton.parentElement;
  card.parentElement.remove();
  module.classList.remove("show-module");
};

function editComment() {
  const editbutton = document.querySelector(".edit");
  const deletebutton = document.querySelector(".delete");
  const content = editbutton.parentElement.nextElementSibling;
  const textArea = content.innerText;
  editbutton.style.opacity = "0.6";
  deletebutton.style.opacity = "0.6";
  editbutton.style.cursor = "not-allowed";
  deletebutton.style.cursor = "not-allowed";
  content.innerHTML = `<textarea rows="4" cols="50" class="editedComment">${textArea} </textarea>
  <div class="btn-update-wrapper" ><button class="btn btn-update">UPDATE</button></div>`;

  const updateButton = document.querySelector(".btn-update");
  const newTextArea = document.querySelector(".editedComment");
  updateButton.onclick = () => {
    content.innerHTML = `${newTextArea.value}`;
    editbutton.style.opacity = "1";
    deletebutton.style.opacity = "1";
    editbutton.style.cursor = "pointer";
    deletebutton.style.cursor = "pointer";
  };
}

const btnSendComment = document.querySelector(".btn-send");
btnSendComment.onclick = () => {
  const newRow = document.createElement("div");
  const textArea = btnSendComment.previousElementSibling;
  if (textArea.value == "") return;
  newRow.className = "row";
  newRow.innerHTML = `<div class="card">
          <div class="vote">
            <div class="vote-icon plus">
              <img src="images/icon-plus.svg" alt="icon-plus" />
            </div>
            <p class="vote-text">0</p>
            <div class="vote-icon minus">
              <img src="images/icon-minus.svg" alt="icon-minus" />
            </div>
          </div>
          <div class="header">
            <div class="avatar">
              <img src="images/avatars/image-juliusomo.png" alt="" />
            </div>
            <p class="name">juliusomo</p>
            <p class="date">just now</p>
          </div>
          <div class="icon">
              <div class="delete" onclick="showModule()">
                <img src="images/icon-delete.svg" alt="" />
                <p>Delete</p>
              </div>
              <div class="edit" onclick="editComment()">
                <img src="images/icon-edit.svg" alt="" />
                <p>Edit</p>
              </div>
          </div>
          <div class="content">
            ${textArea.value}
          </div>
          
        </div>`;

  const btnParrent = btnSendComment.parentElement.parentElement;
  const cardWrapper = document.querySelector(".card-wrapper");

  cardWrapper.insertBefore(newRow, btnParrent);
  textArea.value = "";
};