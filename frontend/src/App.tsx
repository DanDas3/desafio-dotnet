import './App.css'
import AppRoutes from './routes/AppRoutes'
import { Provider } from 'react-redux'
import store from './store'
import AppMenu from './components/AppMenu/AppMenu'
import { BrowserRouter } from 'react-router-dom'
import { UtilsProvider } from './context/utilsContext'
import { AuthProvider } from './context/authContext'
import Private from './private/private'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <UtilsProvider>
          <AuthProvider>
            <Private>
              <AppMenu>
                <AppRoutes />
              </AppMenu>
            </Private>
          </AuthProvider>
        </UtilsProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
