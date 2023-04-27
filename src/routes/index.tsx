import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '../pages/Home/home'
import Repository from '../pages/Repository/repository'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/repository/:id/:userName/:repoName"
          element={<Repository />}
        />
      </Routes>
    </BrowserRouter>
  )
}
