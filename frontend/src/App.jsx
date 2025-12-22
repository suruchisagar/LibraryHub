import './App.css'
import Home2 from './Home2'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

import Admin from './pages/Admin'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import Report from './pages/admin/Report'
import Seats from './pages/admin/Seats'
import Setting from './pages/admin/Setting'
import Users from './pages/admin/Users'
import Layout from './layout/Layout';
import Branches from './pages/admin/Branches'
import Booking from './pages/admin/Booking'
import Payments from './pages/admin/Payments'

import SuperAdmin from './pages/SuperAdmin'
import SuperDashboard from './pages/SuperAdmin/SuperDashboard'
import SuperReport from './pages/SuperAdmin/SuperReport'
import SuperPlan from './pages/SuperAdmin/SuperPlan'
import SuperBooking from './pages/SuperAdmin/SuperBooking'
import SuperLogout from './pages/SuperAdmin/SuperLogout'
import SuperPayment from './pages/SuperAdmin/SuperPayment'
import SuperSetting from './pages/SuperAdmin/SuperSetting'
import SuperUsers from './pages/SuperAdmin/SuperUsers'
import SuperLayout from './layout/SuperLayout' 

import Student from './pages/Student'
import StudentLayout from './layout/StudentLayout'
import StudentDashboard from './pages/student/StudentDashboard'
import BookASeat from './pages/student/BookASeat'
import HelpAndSupport from './pages/student/HelpAndSupport'
import MyBookings from './pages/student/MyBookings'
import PaymentAndInvoices from './pages/student/PaymentAndInvoices'
import PlanAndSubscription from './pages/student/PlanAndSubscription'
import StudentSetting from './pages/student/StudentSetting'
import StudentLogout from './pages/student/StudentLogout'
import Me from './pages/admin/me'

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/> }/>
            <Route path='/signin' element={<Signin/> }/>
            <Route path='/signup' element={<Signup/> }/>

            
             <Route path='/admin' element={<Layout/>}>
                  <Route path='me' element={<Me/>}/>
                  <Route path='admin' element={<Admin/>}/>
                  <Route path='dashboard' element={<Dashboard/>}/>
                  <Route path='report' element={<Report/>}/>
                  <Route path='seats' element={<Seats/>}/>
                  <Route path='setting' element={<Setting/>}/>
                  <Route path='branches' element={<Branches/>}/>
                  <Route path='booking' element={<Booking/>}/>
                  <Route path='payments' element={<Payments/>}/>
                  <Route path='users' element={<Users/>}/>
             </Route>

             
             <Route path='/superadmin' element={<SuperLayout/>}>
                  <Route path='superadmin' element={<SuperAdmin/>}/>
                  <Route path='dashboard' element={<SuperDashboard/>}/>
                  <Route path='report' element={<SuperReport/>}/>
                  <Route path='plan' element={<SuperPlan/>}/>
                  <Route path='setting' element={<SuperSetting/>}/>
                  <Route path='booking' element={<SuperBooking/>}/>
                  <Route path='payment' element={<SuperPayment/>}/>
                  <Route path='user' element={<SuperUsers/>}/>
                  <Route path='logout' element={<SuperLogout/>}/>
                  
             </Route>
             
             <Route path='/student' element={<StudentLayout/>}>
             <Route path='student' element={<Student/>}/>
                  <Route path='dashboard' element={<StudentDashboard/>}/>
                  <Route path='bookaseat' element={<BookASeat/>}/>
                  <Route path='help' element={<HelpAndSupport/>}/>
                  <Route path='bookings' element={<MyBookings/>}/>
                  <Route path='payment' element={<PaymentAndInvoices/>}/>
                  <Route path='plan' element={<PlanAndSubscription/>}/>
                  <Route path='setting' element={<StudentSetting/>}/>
                  <Route path='logout' element={<StudentLogout/>}/>
             
             </Route>
            
            
          </Routes>
        
    </BrowserRouter>
  )
}

export default App
