import { REQUEST_CURRENCIES, NEW_EXPENSE,
  DELETE_EXPENSE, EDIT_EXPENSE, SAVE_EDIT } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  case NEW_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };
  case SAVE_EDIT:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        const { value, description, currency, method, tag } = action.payload;
        const saveExpense = expense.id === action.payload.id
          ? ({
            ...expense,
            value,
            description,
            currency,
            method,
            tag,
          })
          : expense;

        return saveExpense;
      }),
      editor: false,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
