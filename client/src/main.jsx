import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { store } from './redux/store.js'
import { Provider } from'react-redux'
import { ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <ToastContainer transition = {Bounce} autoClose={2000} />
      <App />
    </Provider>
  </StrictMode>,
)
