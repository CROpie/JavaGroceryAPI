function editGrocery(groceries, id) {
  // in case of 2 sequential edits: resets the first
  renderGroceries(groceries)

  const itemNameTD = document.getElementById(`itemName-${id}`)
  const amountTD = document.getElementById(`amount-${id}`)
  const editItemTD = document.getElementById(`editItemTd-${id}`)

  itemNameTD.innerHTML = `<input id="editItemName" type="text" value=${itemNameTD.textContent} />`
  amountTD.innerHTML = `<input id="editAmount" type="text" value=${amountTD.textContent} />`
  editItemTD.innerHTML = `
    <button id="cancelBtn" type="text">Cancel</button>
    <button id="saveBtn" type="text">Save</button>    
    `

  document.getElementById('cancelBtn').addEventListener('click', () => renderGroceries(groceries))
  document.getElementById('saveBtn').addEventListener('click', () => putGrocery(id))
}

function renderGroceries(groceries) {
  const TBODY = document.getElementById('tableBody')
  TBODY.innerHTML = ''

  for (let i = 0; i < groceries.length; i++) {
    const { id, itemName, amount } = groceries[i]

    const TR = document.createElement('tr')
    const template = `
      <td>${id}</td>
      <td id='itemName-${id}'>${itemName}</td>
      <td id='amount-${id}'>${amount}</td>
      <td id='editItemTd-${id}'><button id=editItem-${id}>E</button></td>
      <td id='delItemId-${id}'><button id=delItem-${id}>X</button></td>
    `
    TR.innerHTML = template
    TBODY.appendChild(TR)

    document
      .getElementById(`editItem-${id}`)
      .addEventListener('click', () => editGrocery(groceries, id))
    document.getElementById(`delItem-${id}`).addEventListener('click', () => deleteGrocery(id))
  }
}

async function putGrocery(id) {
  const editData = {
    itemName: document.getElementById('editItemName').value,
    amount: document.getElementById('editAmount').value,
  }

  const formData = new FormData()
  formData.append('itemName', editData.itemName)
  formData.append('amount', editData.amount)

  const response = await fetch(`http://localhost:8080/api/groceries/${id}`, {
    method: 'PUT',
    body: formData,
  })

  // const response = await fetch(`http://localhost:8080/api/groceries/${id}`, {
  //   method: 'PUT',
  //   body: JSON.stringify(editData),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })

  if (!response.ok) {
    console.log('Something went wrong during PUT...')
    return
  }

  const json = await response.json()
  console.log(json)

  const groceries = await getGroceries()
  renderGroceries(groceries)
}

async function deleteGrocery(id) {
  const response = await fetch(`http://localhost:8080/api/groceries/${id}`, {
    method: 'DELETE',
  })

  console.log(response)

  if (!response.ok) {
    console.error('Error during DELETE')
    return
  }

  const groceries = await getGroceries()
  renderGroceries(groceries)
}

async function postGrocery(event) {
  event.preventDefault()

  const formData = new FormData(event.target)

  const response = await fetch(`http://localhost:8080/api/groceries`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    console.error('Error during POST')
    return
  }

  const json = await response.json()

  console.log(json)

  const groceries = await getGroceries()
  renderGroceries(groceries)
}

async function getGroceries() {
  const response = await fetch('http://localhost:8080/api/groceries')
  console.log(response)

  if (!response.ok) {
    console.error('Error during GET')
    return
  }

  const json = await response.json()

  return json
}

async function init() {
  document.getElementById('postForm').addEventListener('submit', postGrocery)
  const groceries = await getGroceries()
  renderGroceries(groceries)
}

init()
