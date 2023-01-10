import React, { useState, useEffect } from "react"
import List from "./List"
import Alert from "./Alert"

function App() {
  const [name, setName] = useState("")
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  })

  const handleSubmit = e => {
    e.preventDefault()

    if (!name) {
      // display alert
      showAlert(true, "danger", "Please enter list item")
    } else if (name && isEditing) {
      // deal with editing
    } else {
      showAlert(true, "success", "Item added to list")
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName("")
    }
  }

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, "danger", "Clear all list items")
    setList([])
  }

  const removeItem = id => {
    showAlert(true, "danger", "Item removed")
    setList(list.filter(item => item.id !== id))
  }

  const editItem = id => {
    showAlert(true, "danger", "Item removed")
    const specificItem = list.find(item => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery List</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="add list item"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
