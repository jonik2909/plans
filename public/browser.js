console.log('FrontEnd JS is running!');

function template(item) {
    return `<li
    class="list-group-item list-group-item-info d-flex align-items-center justify-content-between"
  >
    <span class="item-text"> ${item.reja} </span>
    <div>
      <button
        data-id="${item._id}"
        class="edit-me btn btn-secondary btn-sm mr-1"
      >
        Ozgartirish
      </button>
      <button
        data-id="${item._id}"
        class="delete-me btn btn-danger btn-sm"
      >
        Ochirish
      </button>
    </div>
  </li>`;
}

const createField = document.getElementById('create-field');

document.getElementById('create-form').addEventListener("submit", (e) => {
    e.preventDefault();
    
    axios.post('/create-item', {
        reja: createField.value
    }).then((response) => {
        document.getElementById('item-list').insertAdjacentHTML('beforeend', template(response.data));
        createField.value = "";
        createField.focus();
    }).catch((err) => {
        console.log('Iltimos qaytdan urinib ko\'ring!');
    })
}) 