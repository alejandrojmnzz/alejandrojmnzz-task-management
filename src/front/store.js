export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    token: localStorage.getItem("token") || null,
    tasks: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };


    case 'add_token':
      const token = action.payload
      localStorage.setItem("token", token)

      return {
        ...store,
        token: token
      }

    case 'sign_up': 
      const user = action.payload
      console.log(user)

    case 'get_tasks':
      const tasks = action.payload
      return {
        ...store,
        tasks: tasks
      }
    
      case 'log_out':
        localStorage.removeItem("token")
        return {
          ...store,
          token: null
        }
    
    default:
      throw Error('Unknown action.');
  }    
}
