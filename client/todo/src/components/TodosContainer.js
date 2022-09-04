import React, { Component } from 'react';
import Todo from './Todo.js';
import { connect } from 'react-redux';
import { loadTodosRequest, loadTodosSuccess } from '../actions/todos.js';
import { LOAD_TODO_REQUEST } from '../constants.js';

class TodosContainer extends Component {
  constructor() {
    super();
    this.state = {
      editing: {
        targetId: '',
        inputValue: '',
      },
    };
  }

  componentDidMount() {
    const { loadTodosAction } = this.props;
    loadTodosAction();
  }

  handleKeyDown = () => {};

  editTodo = (e) => {
    const { editing } = this.state;
    const input = e.target;
    this.setState((prevState) => ({
      ...prevState,
      editing: { ...editing, inputValue: input.value.trim() },
    }));
  };

  handleTodoStatus = (todo) => {
    // eventEmitter.emit({
    //   type: UPDATE_TODO_REQUEST,
    //   payload: { _id: todo._id, active: !todo.active },
    // });
  };

  handleDeleteTodo = (todo) => {
    // eventEmitter.emit({ type: DELETE_TODO_REQUEST, payload: todo._id });
  };

  handeEditingMode = (e) => {
    const elementId = e.target.parentElement.id;
    const { editing } = this.state;
    const input = document.querySelector(`[data-input='${elementId}']`);
    const textLabel = document.querySelector(`[data-label='${elementId}']`);
    const edtiButton = e.target;
    input.value = input.name;
    input.classList.remove('todo__element--err');
    this.setState((prevState) => ({
      ...prevState,
      editing: { inputValue: input.name, targetId: elementId },
    }));

    const allInputs = document.querySelectorAll('.todo__element');
    const allTextLabels = document.querySelectorAll('.todo__element-text');
    if (elementId === editing.targetId || editing.targetId === '') {
      input.classList.toggle('todo__element--hidden');
      textLabel.classList.toggle('todo__element--hidden');
    }

    if (elementId !== editing.targetId && editing.targetId !== '') {
      [...allInputs].forEach((element) => element.classList.add('todo__element--hidden'));
      [...allTextLabels].forEach((element) => element.classList.remove('todo__element--hidden'));
      input.classList.remove('todo__element--hidden');
      textLabel.classList.add('todo__element--hidden');
    }

    if (editing.targetId === elementId) {
      this.setState((prevState) => ({
        ...prevState,
        editing: { ...editing, targetId: '' },
      }));
    }

    if (
      ![...input.classList].includes('todo__element--hidden') &&
      elementId !== editing.targetId &&
      editing.targetId !== ''
    ) {
      const allEditBtns = document.querySelectorAll('.todo__edit');
      [...allEditBtns].forEach((element) => {
        element.innerHTML = '&#9998;';
      });
    }

    if (![...input.classList].includes('todo__element--hidden')) {
      edtiButton.innerHTML = '&#10004;';
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          input.classList.add('todo__element--hidden');
          textLabel.classList.remove('todo__element--hidden');
          edtiButton.innerHTML = '&#9998;';
        }
      });

      if (editing.inputValue === '') {
        [...allInputs].forEach((element) => element.classList.add('todo__element--hidden'));
        [...allTextLabels].forEach((element) => element.classList.remove('todo__element--hidden'));
        input.classList.remove('todo__element--hidden');
        textLabel.classList.add('todo__element--hidden');
      }
    }

    if ([...input.classList].includes('todo__element--hidden')) {
      if (editing.inputValue.trim()) {
        edtiButton.innerHTML = '&#9998;';
        // eventEmitter.emit({
        //   type: UPDATE_TODO_REQUEST,
        //   payload: {
        //     _id: elementId,
        //     name: editing.inputValue,
        //   },
        // });
      } else {
        edtiButton.innerHTML = '&#10004;';
        input.value = '';
        input.classList.remove('todo__element--hidden');
        textLabel.classList.add('todo__element--hidden');
        input.classList.add('todo__element--err');
      }
    }
  };

  processFilterButtons = (filterButton) => {
    const todoFilterButtons = document.querySelector('.todo__filters-row--controls');
    [...todoFilterButtons.children].forEach((button) => button.classList.remove('todo__filtres-button--active'));
    filterButton.classList.add('todo__filtres-button--active');
  };

  showAllTodos = (e) => {
    e.preventDefault();
    const filterButton = e.target;
    this.processFilterButtons(filterButton);
    // eventEmitter.emit({ type: UPDATE_FILTER_REQUEST, payload: 'all' });
  };

  showActiveTodos = (e) => {
    e.preventDefault();
    const filterButton = e.target;
    this.processFilterButtons(filterButton);
    // eventEmitter.emit({ type: UPDATE_FILTER_REQUEST, payload: 'active' });
  };

  showDoneTodos = (e) => {
    e.preventDefault();
    const filterButton = e.target;
    this.processFilterButtons(filterButton);
    // eventEmitter.emit({ type: UPDATE_FILTER_REQUEST, payload: 'done' });
  };

  deleteAllTodos = () => {
    // eventEmitter.emit({ type: DELETE_ALL_TODOS_REQUEST });
  };

  changeTodoCounter = (num) => {
    const counterItem = document.querySelector('.todo__item-counter');
    if (counterItem) {
      counterItem.textContent = `Todos counter: ${num}`;
    }
  };

  render() {
    const { todos } = this.props;
    let todoElements = [];
    if (todos) {
      todoElements = todos.map((todo) => <Todo todo={todo} key={todo._id} />);
    }
    return (
      <>
        <div className="todo__filters">
          <div className="todo__filters-row todo__filters-row--controls">
            <button
              type="button"
              className="todo__filtres-button todo__filtres-button--active"
              data-sort="all"
              onClick={this.showAllTodos}
            >
              All todos
            </button>
            <button type="button" className="todo__filtres-button" data-sort="active" onClick={this.showActiveTodos}>
              Active todos
            </button>
            <button type="button" className="todo__filtres-button" data-sort="done" onClick={this.showDoneTodos}>
              Done todos
            </button>
          </div>
          <div className="todo__filters-row">
            <p className="todo__item-counter">All todos: 0</p>
            <button
              type="submit"
              className={todoElements.length ? 'todo__remove-all' : 'todo__remove-all todo__remove-all--hidden'}
              onClick={this.deleteAllTodos}
            >
              Remove all
            </button>
          </div>
        </div>
        <div className="todo__items-container">{todoElements}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { todos: state.todo.todos };
};

const mapDispatchToProps = (dispatch) => ({
  loadTodosAction: () => dispatch(loadTodosRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosContainer);
