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


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-me')) {
        if (confirm("aniq o'chirmoqchimisiz?")) {
            axios.post('/delete-item', {id: e.target.getAttribute("data-id")}).then(response => {
                e.target.parentElement.parentElement.remove();
            }).catch(err => {
                console.log(err)
            })
        }
    }

    if (e.target.classList.contains('edit-me')) {
        
        let userInput = prompt("o'zgartirishni kiriting", e.target.parentElement.parentElement.querySelector('.item-text').innerHTML);

        if (userInput) {
            axios.post('/edit-item', {id: e.target.getAttribute("data-id"), new_reja: userInput}).then(response => {
                e.target.parentElement.parentElement.querySelector('.item-text').innerHTML = userInput;
            }).catch(err => {
                console.log(err);
            })
        }

    }
})

document.getElementById('clean-all').addEventListener('click', (e) => {
    if (confirm("Hammasini o'chirmoqchimisiz?")) {
        axios.post('/delete-all', {delete_all: true}).then(response => {
            const item_list = document.getElementById('item-list');
            item_list.removeChild(document.getElementById('item-all-lists'))
        }).catch(err => {
            console.log(err);
        })
    }
})