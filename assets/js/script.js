var data;
var view;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(xhttp.responseText);
    }
    createGridView();
};
xhttp.open("GET", "https://my-json-server.typicode.com/fred7francis/ToggleCard/data");
xhttp.send();

function createGridView() {
    view = true;
    const gridView = document.getElementById('grid');
    gridView.innerHTML = " ";
    if (data) {
        if (data.length) {
            data.forEach((x) => {
                const card = `<div class="card" id="card-${x.id}">
                <button class="card-close close-button" id="close-${x.id}" onclick="del(${x.id})"><i class="fas fa-times-circle"></i></button>
                <img src="./assets/images/${(x.gender == 'Male') ? "male" : "female"}.jpg" alt="img-${x.id}">
                <span>Name :</span><input type="text" id="input-Name-${x.id}" value="${x.name}" disabled><br>
                <span>ID :</span><input type="text" id="input-id-${x.id}" value="${x.id}" disabled><br>
                <span>Skills :</span><input type="text" id="input-skills-${x.id}" value="${x.skills}" disabled><br>
                <span>Project :</span><input type="text" id="input-project-${x.id}" value="${x.project}" disabled><br>
                <span>HCM :</span><input type="text" id="input-hcm-${x.id}" value="${x.hcm}" disabled><br>
                <button class="option" id="edit-button-${x.id}" onclick="edit(${x.id})">Edit</button>
                <button class="option save-button" id="save-button-${x.id}" onclick="save(${x.id})">Save</button>
                </div>`;
                gridView.innerHTML += card;
            });
        }
        else
            gridView.innerHTML = "<p>No Records to Show</p>";
    }
    else
        gridView.innerHTML = "<p>Cannot Fetch Data</p>";
}

function createListView() {
    view = false;
    const gridView = document.getElementById('grid');
    gridView.innerHTML = " ";
    if (data) {
        if (data.length) {
            var strtable = `<table><thead><tr>
                                <th>Name</th><th>ID</th><th>Skills</th><th>Project</th><th>HCM</th><th>Options</th>
                            </tr></thead><tbody>`;
            data.forEach((x) => {
                const row = `<tr id="card-${x.id}">
                                <td><input type="text" id="input-Name-${x.id}" value="${x.name}" disabled></td>
                                <td><input type="text" id="input-id-${x.id}" value="${x.id}" disabled></td>
                                <td><input type="text" id="input-skills-${x.id}" value="${x.skills}" disabled></td>
                                <td><input type="text" id="input-project-${x.id}" value="${x.project}" disabled></td>
                                <td><input type="text" id="input-hcm-${x.id}" value="${x.hcm}" disabled></td>
                                <td>
                                    <button class="row-close close-button" id="close-${x.id}" onclick="del(${x.id})"><i class="fas fa-times-circle"></i></button>
                                    <button class="option" id="edit-button-${x.id}" onclick="edit(${x.id})"><i class="far fa-edit"></i></button>
                                    <button class="option save-button" id="save-button-${x.id}" onclick="save(${x.id})"><i class="far fa-save"></i></button>
                                </td>
                            </tr>
                            `;
                strtable += row;
            });

            strtable += `</tbody></table>`;
            gridView.innerHTML += strtable;

        }
        else
            gridView.innerHTML = "<p>No Records to Show</p>";
    }
    else
        gridView.innerHTML = "<p>Cannot Fetch Data</p>";
}

function edit(id) {
    document.getElementById(`edit-button-${id}`).style.display = "none";
    document.getElementById(`save-button-${id}`).style.display = "block";
    document.getElementById(`input-skills-${id}`).disabled = false;
}

function save(id) {
    document.getElementById(`save-button-${id}`).style.display = "none";
    document.getElementById(`edit-button-${id}`).style.display = "block";
    var index = data.findIndex(x => x.id == id);
    data[index].skills = document.getElementById(`input-skills-${id}`).value;
    view ? createGridView() : createListView();
}

function del(id) {
    var index = data.findIndex(x => x.id == id);
    data.splice(index, 1);
    view ? createGridView() : createListView();
}

function showview() {
    if (view) {
        document.getElementById("toggle-button").innerHTML = `LIST <i class="fas fa-bars"></i>`;
        createListView();
    }
    else {
        document.getElementById("toggle-button").innerHTML = `GRID <i class="fas fa-th-large"></i>`;
        createGridView();
    }
}
