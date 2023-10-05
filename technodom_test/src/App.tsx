import { Route, Routes } from "react-router-dom"
import MainPage from "./components/MainPage/MainPage"
import PageNotFound from "./components/PageNotFound/PageNotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import RecoverPassword from "./components/RecoverPassword/RecoverPassword"
import SignIn from "./components/SignIn/SignIn"
import SignUp from "./components/SignUp/SignUp"


function App() {
  return (
    <div>
      {/* <AuthContextProvider> */}
        <Routes>
          <Route path="/"
            element={<SignIn />} />
          <Route path="/signup"
          element={<SignUp />} />
        <Route path="/recover"
            element={<RecoverPassword />} />
          <Route
            path="/main"
            element={
              // <ProtectedRoute>
                <MainPage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <PageNotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      {/* </AuthContextProvider> */}
    </div>
  )
}

export default App
