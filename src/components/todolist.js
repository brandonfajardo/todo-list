import React, { Component } from 'react'
import { connect } from 'react-redux'
import { inputChange, addTodo, getTodos, toggleTodo, removeTodo, removeSelectedTodos, editInputChange, updateTodoText } from '../actions' 

class TodoList extends Component {
    constructor(props){
        super(props)

        this.state = {
            editId: null
        }

        this.onInputChange = this.inputChange.bind(this)
        this.onAdd = this.onAdd.bind(this)
        this.onCheckboxChange = this.onCheckboxChange.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.onRemoveSelected = this.onRemoveSelected.bind(this)
        this.onEditKeyPress = this.onEditKeyPress.bind(this)
        this.onEditBlur = this.onEditBlur.bind(this)
    }

    componentWillMount(){
        this.props.getTodos()
    }

    inputChange(e){
        this.props.inputChange(e.target.value)
    }

    onAdd(){
        this.props.addTodo(this.props.inputVal)
    }

    onCheckboxChange(id, completed){
        this.props.toggleTodo({id, completed})
    }

    onRemove(id){
        this.props.removeTodo({id})
    }

    onRemoveSelected(){
        this.props.removeSelectedTodos()
    }

    onEditInputChange(e){
        this.props.editInputChange(e.target.value)
    }

    onEditKeyPress(e, id, text){
        if (e.key == "Enter"){
            this.props.updateTodoText({id, text: e.target.value || text})
            this.setState({ editId: null })
        }
    }

    onEditBlur(e, id, text){
        this.props.updateTodoText({id, text: e.target.value || text})
        this.setState({ editId: null })
    }

    render() {
        return (
            <div>
                <h1>Todos</h1>
                <input
                    type="text"
                    value={this.props.inputVal}
                    onChange={(e) => this.onInputChange(e)}
                />
                <button onClick={this.onAdd}>Add</button> <br /><br />
                <button onClick={this.onRemoveSelected}>Remove Selected</button>
                <ul>
                    {this.props.todoList && this.props.todoList.map((todo) => {
                        return (
                            <li>
                                <input 
                                    checked={todo.completed}
                                    type="checkbox"
                                    onChange={() => this.onCheckboxChange(todo._id, todo.completed)}
                                />
                                {this.state.editId == todo._id ? 
                                    <input 
                                        onChange={(e) => this.onEditInputChange(e)}
                                        value={this.props.inputEditVal || todo.text}
                                        onKeyPress={(e) => this.onEditKeyPress(e, todo._id, this.props.inputEditVal)}
                                        onBlur={(e) => this.onEditBlur(e, todo._id, this.props.inputEditVal)}
                                        autoFocus 
                                    /> 
                                    : 
                                    <span onClick={() => this.setState({ editId: todo._id })} style={{cursor: 'pointer'}}>{todo.text}</span>
                                }
                                <span onClick={() => this.onRemove(todo._id)} style={{marginLeft: '20px', cursor: 'pointer'}}>x</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    inputVal: state.todolist.inputVal,
    todoList: state.todolist.todoList,
    inputEditVal: state.todolist.editInputVal,
})

const mapDispatchToProps = {
    inputChange,
    addTodo,
    getTodos,
    toggleTodo,
    removeTodo,
    removeSelectedTodos,
    editInputChange,
    updateTodoText
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)