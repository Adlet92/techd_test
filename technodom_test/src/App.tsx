import { Route, Routes } from "react-router-dom"
import PageNotFound from "./components/PageNotFound/PageNotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import SignIn from "./components/SignIn/SignIn"
import SignUp from "./components/SignUp/SignUp"
import { AuthContextProvider } from "./components/context/AuthContext"


function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <PageNotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
