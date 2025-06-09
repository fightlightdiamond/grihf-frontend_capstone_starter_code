import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import AuthLayout from "./features/auth/layouts/AuthLayout";
import {Provider} from "react-redux";
import {store} from "./app/stores";
import {Login} from "./features/auth/pages/Login";
import {Register} from "./features/auth/pages/Register";
import NotFound from "./common/pages/404";
import Protected from "./common/components/Protected";
import Home from "./features/home/pages/Home";
import BaseLayout from "./common/components/layout/BaseLayout";
import BestServices from "./features/home/pages/BestServices";
import Review from "./features/reviews/pages/Review";
import ViewReport from "./features/reviews/pages/ViewReport";
import {Profile} from "./features/auth/pages/Profile";
import HealthTipsAndGuidance from "./features/home/pages/HealthTipsAndGuidance";
import FindDoctor from './features/find-doctors/pages/FindDoctor';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <Routes>
                  <Route element={<Protected><BaseLayout/></Protected>}>
                      <Route index path="/started" element={<Home />} />
                      <Route index path="/" element={<BestServices />} />
                      <Route index path="/find-doctor" element={<FindDoctor />} />
                      <Route index path="/review" element={<Review />} />
                      <Route index path="/view-report" element={<ViewReport />} />
                      <Route index path="/profile" element={<Profile />} />
                      <Route index path="/health-tips-and-guidance" element={<HealthTipsAndGuidance />} />
                  </Route>
                  <Route element={<AuthLayout/>}>
                      <Route path="/login" element={<Login/>}/>
                      <Route path="/register" element={<Register/>}/>
                  </Route>
                  <Route element={<BaseLayout/>}>
                      <Route path="/landing" element={<Home/>}/>
                  </Route>
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </BrowserRouter>
      </Provider>
  // </StrictMode>,
)
