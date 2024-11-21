// src/routes/Router.jsx
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Authenticator from "../components/auth/Authenticator";
import Logout from "../components/auth/Logout";
import Header from "../components/Header";
import ClientH from "../pages/ClientHeader";
import CompanyH from "../pages/CompanyHeader";
import Home from "../pages/Home";
import Login from "../pages/Login";

import Chat from '../components/chat/Chat';  // Asegúrate de que la ruta del componente sea correcta


import Admin from "../pages/Admin";
import UserList from "../components/admin/UserList";
import RoleList from "../components/admin/RoleList";
import PermissionList from '../components/admin/PermissionList';

import CreateUser from "../components/admin/CreateUser";
import CreateRole from "../components/admin/CreateRole";
import CreatePermission from "../components/admin/CreatePermission";
import EditUser from "../components/admin/EditUser";
import EditRole from "../components/admin/EditRole";
import EditPermission from "../components/admin/EditPermission";
import EditContractor from '../components/contractor/EditContractor';

// Componentes de servicios, solicitudes y contratistas para el cliente
import Profile from "../components/client/ClientProfile";
import ServiceList from '../components/service/ServiceList';
import BillingHistory from '../components/billingHistory/BillingHistory';
import RequestList from '../components/request/RequestList';
import NewRequestForm from '../components/request/NewRequestForm';
import ClientHome from '../components/client/ClientHome';
import RegisterClient from '../components/client/RegisterClient';
import RegisterCompany from '../components/company/RegisterCompany';
import RegisterContractor from "../components/contractor/RegisterContractor";
import RegisterService from "../components/service/RegisterService";
import ErrorBoundary from '../pages/ErrorBoundary';
import Register from '../pages/Register';
import ServiceDetails from '../components/service/ServiceDetails';
import CompanyDetails from '../components/company/CompanyDetails';
import RequestForm from '../components/request/RequestForm';

import CompanyMenu from '../components/company/CompanyMenu';
import CompanyProfile from '../components/company/CompanyProfile';
import CompanyRequests from '../components/request/CompanyRequestList';
import ContractorManagement from '../components/contractor/ContractorList';
import CompanyServices from '../components/service/ServiceList';
import CompanyHome from '../components/company/CompanyHome';
import AddComment from '../components/company/AddComment';
import Notifications from '../components/notification/NotificationHistory';

const admin = 'ALL-ADMIN';
const company = 'ALL-COMPANY';
const client = 'ALL-CLIENT';


const routes = createRoutesFromElements(
  <Route path="/" element={<Header />} errorElement={<ErrorBoundary />}>
    <Route path="/login" element={<Login />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/register" element={<Register />} />
    <Route path="/register/client" element={<RegisterClient />} />
    <Route path="/register/company" element={<RegisterCompany />} />


    <Route path="/admin" element={
      <Authenticator allowedRoles={[admin]}>
        <Admin />
      </Authenticator>
    }>
      <Route path="users" element={
        <Authenticator allowedRoles={['READ-USER', 'WRITE-USER', 'EDIT-USER', 'DELETE-USER']}>
          <UserList />
        </Authenticator>
      } />
      <Route path="create-user" element={
        <Authenticator allowedRoles={['WRITE-USER']}>
          <CreateUser />
        </Authenticator>
      } />
      <Route path="edit-user/:id" element={
        <Authenticator allowedRoles={['EDIT-USER']}>
          <EditUser />
        </Authenticator>
      } />
      <Route path="roles" element={
        <Authenticator allowedRoles={['READ-ROLE', 'WRITE-ROLE', 'EDIT-ROLE', 'DELETE-ROLE']}>
          <RoleList />
        </Authenticator>
      } />
      <Route path="create-role" element={
        <Authenticator allowedRoles={['WRITE-ROLE']}>
          <CreateRole />
        </Authenticator>
      } />
      <Route path="edit-role/:id" element={
        <Authenticator allowedRoles={['EDIT-ROLE']}>
          <EditRole />
        </Authenticator>
      } />
      <Route path="permissions" element={
        <Authenticator allowedRoles={['READ-PERMISSION', 'WRITE-PERMISSION', 'EDIT-PERMISSION', 'DELETE-PERMISSION']}>
          <PermissionList />
        </Authenticator>
      } />
      <Route path="create-permission" element={
        <Authenticator allowedRoles={['WRITE-PERMISSION']}>
          <CreatePermission />
        </Authenticator>
      } />
      <Route path="edit-permission/:id" element={
        <Authenticator allowedRoles={['EDIT-PERMISSION']}>
          <EditPermission />
        </Authenticator>
      } />
    </Route>

    <Route path="/client" element={
      <Authenticator allowedRoles={[client]}>
        <ClientH />
      </Authenticator>
    }>
      <Route path="notifications" element=
        {<Authenticator allowedRoles={[client]}>
          <Notifications />
        </Authenticator>} />
      <Route path="chat/:solicitudId" element=
        {<Authenticator allowedRoles={[client]}>
          <Chat />
        </Authenticator>} />
      <Route path="home" element={
        <Authenticator allowedRoles={[client]}>
          <ClientHome />
        </Authenticator>
      } />
      <Route path="profile" element={
        <Authenticator allowedRoles={[client]}>
          <Profile />
        </Authenticator>
      } />
      <Route path="services" element={
        <Authenticator allowedRoles={[client]}>
          <ServiceList />
        </Authenticator>
      } />
      <Route path="requests" element={
        <Authenticator allowedRoles={[client]}>
          <RequestList />
        </Authenticator>
      } />
      <Route path="billing-history" element={
        <Authenticator allowedRoles={[client]}>
          <BillingHistory />
        </Authenticator>
      } />
      <Route path="create-request" element={
        <Authenticator allowedRoles={[client]}>
          <NewRequestForm />
        </Authenticator>
      } />
      <Route path="service/:serviceId" element={
        <Authenticator allowedRoles={[client]}>
          <ServiceDetails />
        </Authenticator>
      } />
      <Route path="company-details/:companyId/:serviceId" element={
        <Authenticator allowedRoles={[client]}>
          <CompanyDetails />
        </Authenticator>
      } />
      <Route path="request-form/:companyId/:serviceId" element={<Authenticator allowedRoles={[client]}>
        <RequestForm />
      </Authenticator>} />
      <Route path="comment/:contractorId" element={
        <Authenticator allowedRoles={[client]}>
          <AddComment />
        </Authenticator>
        
      } />

    </Route>



    <Route path="/company" element={
      <Authenticator allowedRoles={[company]}>
        <CompanyH />
      </Authenticator>
    }>
      <Route path="notifications" element=
        {<Authenticator allowedRoles={[company]}>
          <Notifications />
        </Authenticator>} />
      <Route path="chat/:solicitudId" element=
        {<Authenticator allowedRoles={[company]}>
          <Chat />
        </Authenticator>} />
      <Route path="menu" element={
        <Authenticator allowedRoles={[company]}>
          <CompanyMenu />
        </Authenticator>
      } />
      <Route path="profile" element={
        <Authenticator allowedRoles={[company, client]}>
          <CompanyProfile />
        </Authenticator>
      } />
      <Route path="requests" element={
        <Authenticator allowedRoles={[company]}>
          <CompanyRequests />
        </Authenticator>
      } />
      <Route path="contractor" element={
        <Authenticator allowedRoles={[company]}>
          <ContractorManagement />
        </Authenticator>
      } />
      <Route path="services" element={
        <Authenticator allowedRoles={[company]}>
          <CompanyServices />
        </Authenticator>
      } />
      <Route path="home" element={
        <Authenticator allowedRoles={[company]}>
          <CompanyHome />
        </Authenticator>
      } />
      <Route path="create-contractor" element={
        <Authenticator allowedRoles={[company]}>
          <RegisterContractor />
        </Authenticator>
      } />
      <Route path="edit-contractor/:id" element={
        <Authenticator allowedRoles={[company]}>
          <EditContractor />
        </Authenticator>
      } />
      <Route path="create-service" element={
        <Authenticator allowedRoles={[company]}>
          <RegisterService />
        </Authenticator>
      } />
    </Route>
    <Route path="/home" element={<Home />} />
  </Route>
);

export const router = createBrowserRouter(routes, { basename: '' });