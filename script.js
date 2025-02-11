const input = document.getElementById("input");
const select = document.getElementById("select");
const textarea = document.getElementById("textarea");
const checkbox = document.getElementById("checkbox");

const divData = document.getElementById("form");

let formdata = JSON.parse(localStorage.getItem("formdata")) || [
  {
    id: "c0ac49c5-871e-4c72-a878-251de465e6b4",
    type: "input",
    label: "Sample Input",
    placeholder: "Sample placeholder",
  },
  {
    id: "146e69c2-1630-4a27-9d0b-f09e463a66e4",
    type: "select",
    label: "Sample Select",
    options: ["Sample Option", "Sample Option", "Sample Option"],
  },
  {
    id: "45002ecf-85cf-4852-bc46-529f94a758f5",
    type: "textarea",
    label: "Sample Textarea",
    placeholder: "Sample Placeholder",
  },
  {
    id: "680cff8d-c7f9-40be-8767-e3d6ba420952",
    type: "checkbox",
    label: "Sample Checkbox",
  },
];

function saveToLocalStorage() {
  localStorage.setItem("formdata", JSON.stringify(formdata));
}

function fetchData() {
    divData.innerHTML = "";
    
    // console.log(formdata)

  formdata.forEach((elem, index) => {
    let inputBox = document.createElement("div");
    inputBox.classList.add("draggable");
    inputBox.setAttribute("draggable", "true");
    inputBox.dataset.index = index;

    if (elem.type === "input") {
      inputBox.innerHTML = `
        <h1>Input</h1>
        <div>
          <input class="hello" type="text" placeholder="input">
          <button onclick="handleDelete('${elem.id}')">Delete</button>
        </div>
      `;
    } else if (elem.type === "select") {
      inputBox.innerHTML = `
        <h1>Select</h1>
        <div>
          <select class="hello">
              <option>Select</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
          </select>
          <button onclick="handleDelete('${elem.id}')">Delete</button>
        </div>
      `;
    } else if (elem.type === "textarea") {
      inputBox.innerHTML = `
        <h1>Textarea</h1>
        <div>
            <textarea class="hello" style="padding: 10px;" placeholder="Textarea"></textarea>
            <button onclick="handleDelete('${elem.id}')">Delete</button>
        </div>
      `;
    } else if (elem.type === "checkbox") {
      inputBox.innerHTML = `
        <h1>Checkbox</h1>
        <div>
            <input type="checkbox" />
            <button onclick="handleDelete('${elem.id}')">Delete</button>
        </div>
      `;
    }

    divData.appendChild(inputBox);
  });

  saveToLocalStorage();
  addDragAndDrop(); 
}

fetchData();

function getRandomID() {
  return Math.random().toString(36).substring(2, 10);
}

function handleDelete(id) {
  formdata = formdata.filter((elem) => elem.id !== id);
  fetchData();
}

input.addEventListener("click", () => {
  formdata.push({
    id: getRandomID(),
    type: "input",
    label: "Added Input",
    placeholder: "Added placeholder",
  });
  fetchData();
});

select.addEventListener("click", () => {
  formdata.push({
    id: getRandomID(),
    type: "select",
    label: "Added Select",
    options: ["Added Option", "Added Option", "Added Option"],
  });
  fetchData();
});

textarea.addEventListener("click", () => {
  formdata.push({
    id: getRandomID(),
    type: "textarea",
    label: "Added Textarea",
    placeholder: "Added Placeholder",
  });
  fetchData();
});

checkbox.addEventListener("click", () => {
  formdata.push({
    id: getRandomID(),
    type: "checkbox",
    label: "Added Checkbox",
  });
  fetchData();
});




function addDragAndDrop() {
  let draggables = document.querySelectorAll(".draggable");
  let draggedItem = null;

  draggables.forEach((item) => {
    item.addEventListener("dragstart", (e) => {
      draggedItem = item;
      e.target.style.opacity = "0.5";
    });

    item.addEventListener("dragend", (e) => {
      e.target.style.opacity = "1";
    });

    item.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    item.addEventListener("drop", (e) => {
      e.preventDefault();

      let draggingIndex = draggedItem.dataset.index;
      let targetIndex = e.target.closest(".draggable")?.dataset.index;

      if (targetIndex !== undefined && draggingIndex !== targetIndex) {
        let temp = formdata[draggingIndex];
        formdata.splice(draggingIndex, 1);
        formdata.splice(targetIndex, 0, temp);

        fetchData(); 
      }
    });
  });
}

