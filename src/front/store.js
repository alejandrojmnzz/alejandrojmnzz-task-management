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

        // try {
        // fetch(`https://zany-xylophone-r4r9rg4w447g2p9qv-3001.app.github.dev/api/sign-up`,
        // {
        //   method: 'POST',
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify(user)
        // }).then((response) => console.log(response.json()))
        // console.log(data)
        // } catch (error) {
        //     return error
        // }

    
    default:
      throw Error('Unknown action.');
  }    
}
