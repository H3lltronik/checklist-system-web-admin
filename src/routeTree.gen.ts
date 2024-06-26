/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as IndexImport } from './routes/index'
import { Route as AdminMyAssignationsIndexImport } from './routes/admin/my-assignations/index'
import { Route as AdminFileChecklistIndexImport } from './routes/admin/file-checklist/index'
import { Route as AdminEnterprisesIndexImport } from './routes/admin/enterprises/index'
import { Route as AdminAssignationsIndexImport } from './routes/admin/assignations/index'
import { Route as AdminMyAssignationsIdImport } from './routes/admin/my-assignations/$id'
import { Route as AdminFileChecklistCreateImport } from './routes/admin/file-checklist/create'
import { Route as AdminFileChecklistIdImport } from './routes/admin/file-checklist/$id'
import { Route as AdminEnterprisesCreateImport } from './routes/admin/enterprises/create'
import { Route as AdminEnterprisesIdImport } from './routes/admin/enterprises/$id'
import { Route as AdminAssignationsCreateImport } from './routes/admin/assignations/create'
import { Route as AdminAssignationsIdImport } from './routes/admin/assignations/$id'
import { Route as AdminCredentialsUsersIndexImport } from './routes/admin/credentials/users/index'
import { Route as AdminCredentialsProfilesIndexImport } from './routes/admin/credentials/profiles/index'
import { Route as AdminFileChecklistEditIdImport } from './routes/admin/file-checklist/edit/$id'
import { Route as AdminEnterprisesEditIdImport } from './routes/admin/enterprises/edit/$id'
import { Route as AdminCredentialsUsersCreateImport } from './routes/admin/credentials/users/create'
import { Route as AdminCredentialsUsersIdImport } from './routes/admin/credentials/users/$id'
import { Route as AdminCredentialsProfilesCreateImport } from './routes/admin/credentials/profiles/create'
import { Route as AdminCredentialsProfilesIdImport } from './routes/admin/credentials/profiles/$id'
import { Route as AdminAssignationsEditIdImport } from './routes/admin/assignations/edit/$id'
import { Route as AdminCredentialsUsersEditIdImport } from './routes/admin/credentials/users/edit/$id'
import { Route as AdminCredentialsProfilesEditIdImport } from './routes/admin/credentials/profiles/edit/$id'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AdminMyAssignationsIndexRoute = AdminMyAssignationsIndexImport.update({
  path: '/admin/my-assignations/',
  getParentRoute: () => rootRoute,
} as any)

const AdminFileChecklistIndexRoute = AdminFileChecklistIndexImport.update({
  path: '/admin/file-checklist/',
  getParentRoute: () => rootRoute,
} as any)

const AdminEnterprisesIndexRoute = AdminEnterprisesIndexImport.update({
  path: '/admin/enterprises/',
  getParentRoute: () => rootRoute,
} as any)

const AdminAssignationsIndexRoute = AdminAssignationsIndexImport.update({
  path: '/admin/assignations/',
  getParentRoute: () => rootRoute,
} as any)

const AdminMyAssignationsIdRoute = AdminMyAssignationsIdImport.update({
  path: '/admin/my-assignations/$id',
  getParentRoute: () => rootRoute,
} as any)

const AdminFileChecklistCreateRoute = AdminFileChecklistCreateImport.update({
  path: '/admin/file-checklist/create',
  getParentRoute: () => rootRoute,
} as any)

const AdminFileChecklistIdRoute = AdminFileChecklistIdImport.update({
  path: '/admin/file-checklist/$id',
  getParentRoute: () => rootRoute,
} as any)

const AdminEnterprisesCreateRoute = AdminEnterprisesCreateImport.update({
  path: '/admin/enterprises/create',
  getParentRoute: () => rootRoute,
} as any)

const AdminEnterprisesIdRoute = AdminEnterprisesIdImport.update({
  path: '/admin/enterprises/$id',
  getParentRoute: () => rootRoute,
} as any)

const AdminAssignationsCreateRoute = AdminAssignationsCreateImport.update({
  path: '/admin/assignations/create',
  getParentRoute: () => rootRoute,
} as any)

const AdminAssignationsIdRoute = AdminAssignationsIdImport.update({
  path: '/admin/assignations/$id',
  getParentRoute: () => rootRoute,
} as any)

const AdminCredentialsUsersIndexRoute = AdminCredentialsUsersIndexImport.update(
  {
    path: '/admin/credentials/users/',
    getParentRoute: () => rootRoute,
  } as any,
)

const AdminCredentialsProfilesIndexRoute =
  AdminCredentialsProfilesIndexImport.update({
    path: '/admin/credentials/profiles/',
    getParentRoute: () => rootRoute,
  } as any)

const AdminFileChecklistEditIdRoute = AdminFileChecklistEditIdImport.update({
  path: '/admin/file-checklist/edit/$id',
  getParentRoute: () => rootRoute,
} as any)

const AdminEnterprisesEditIdRoute = AdminEnterprisesEditIdImport.update({
  path: '/admin/enterprises/edit/$id',
  getParentRoute: () => rootRoute,
} as any)

const AdminCredentialsUsersCreateRoute =
  AdminCredentialsUsersCreateImport.update({
    path: '/admin/credentials/users/create',
    getParentRoute: () => rootRoute,
  } as any)

const AdminCredentialsUsersIdRoute = AdminCredentialsUsersIdImport.update({
  path: '/admin/credentials/users/$id',
  getParentRoute: () => rootRoute,
} as any)

const AdminCredentialsProfilesCreateRoute =
  AdminCredentialsProfilesCreateImport.update({
    path: '/admin/credentials/profiles/create',
    getParentRoute: () => rootRoute,
  } as any)

const AdminCredentialsProfilesIdRoute = AdminCredentialsProfilesIdImport.update(
  {
    path: '/admin/credentials/profiles/$id',
    getParentRoute: () => rootRoute,
  } as any,
)

const AdminAssignationsEditIdRoute = AdminAssignationsEditIdImport.update({
  path: '/admin/assignations/edit/$id',
  getParentRoute: () => rootRoute,
} as any)

const AdminCredentialsUsersEditIdRoute =
  AdminCredentialsUsersEditIdImport.update({
    path: '/admin/credentials/users/edit/$id',
    getParentRoute: () => rootRoute,
  } as any)

const AdminCredentialsProfilesEditIdRoute =
  AdminCredentialsProfilesEditIdImport.update({
    path: '/admin/credentials/profiles/edit/$id',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin/assignations/$id': {
      preLoaderRoute: typeof AdminAssignationsIdImport
      parentRoute: typeof rootRoute
    }
    '/admin/assignations/create': {
      preLoaderRoute: typeof AdminAssignationsCreateImport
      parentRoute: typeof rootRoute
    }
    '/admin/enterprises/$id': {
      preLoaderRoute: typeof AdminEnterprisesIdImport
      parentRoute: typeof rootRoute
    }
    '/admin/enterprises/create': {
      preLoaderRoute: typeof AdminEnterprisesCreateImport
      parentRoute: typeof rootRoute
    }
    '/admin/file-checklist/$id': {
      preLoaderRoute: typeof AdminFileChecklistIdImport
      parentRoute: typeof rootRoute
    }
    '/admin/file-checklist/create': {
      preLoaderRoute: typeof AdminFileChecklistCreateImport
      parentRoute: typeof rootRoute
    }
    '/admin/my-assignations/$id': {
      preLoaderRoute: typeof AdminMyAssignationsIdImport
      parentRoute: typeof rootRoute
    }
    '/admin/assignations/': {
      preLoaderRoute: typeof AdminAssignationsIndexImport
      parentRoute: typeof rootRoute
    }
    '/admin/enterprises/': {
      preLoaderRoute: typeof AdminEnterprisesIndexImport
      parentRoute: typeof rootRoute
    }
    '/admin/file-checklist/': {
      preLoaderRoute: typeof AdminFileChecklistIndexImport
      parentRoute: typeof rootRoute
    }
    '/admin/my-assignations/': {
      preLoaderRoute: typeof AdminMyAssignationsIndexImport
      parentRoute: typeof rootRoute
    }
    '/admin/assignations/edit/$id': {
      preLoaderRoute: typeof AdminAssignationsEditIdImport
      parentRoute: typeof rootRoute
    }
    '/admin/credentials/profiles/$id': {
      preLoaderRoute: typeof AdminCredentialsProfilesIdImport
      parentRoute: typeof rootRoute
    }
    '/admin/credentials/profiles/create': {
      preLoaderRoute: typeof AdminCredentialsProfilesCreateImport
      parentRoute: typeof rootRoute
    }
    '/admin/credentials/users/$id': {
      preLoaderRoute: typeof AdminCredentialsUsersIdImport
      parentRoute: typeof rootRoute
    }
    '/admin/credentials/users/create': {
      preLoaderRoute: typeof AdminCredentialsUsersCreateImport
      parentRoute: typeof rootRoute
    }
    '/admin/enterprises/edit/$id': {
      preLoaderRoute: typeof AdminEnterprisesEditIdImport
      parentRoute: typeof rootRoute
    }
    '/admin/file-checklist/edit/$id': {
      preLoaderRoute: typeof AdminFileChecklistEditIdImport
      parentRoute: typeof rootRoute
    }
    '/admin/credentials/profiles/': {
      preLoaderRoute: typeof AdminCredentialsProfilesIndexImport
      parentRoute: typeof rootRoute
    }
    '/admin/credentials/users/': {
      preLoaderRoute: typeof AdminCredentialsUsersIndexImport
      parentRoute: typeof rootRoute
    }
    '/admin/credentials/profiles/edit/$id': {
      preLoaderRoute: typeof AdminCredentialsProfilesEditIdImport
      parentRoute: typeof rootRoute
    }
    '/admin/credentials/users/edit/$id': {
      preLoaderRoute: typeof AdminCredentialsUsersEditIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  LoginRoute,
  AboutLazyRoute,
  AdminAssignationsIdRoute,
  AdminAssignationsCreateRoute,
  AdminEnterprisesIdRoute,
  AdminEnterprisesCreateRoute,
  AdminFileChecklistIdRoute,
  AdminFileChecklistCreateRoute,
  AdminMyAssignationsIdRoute,
  AdminAssignationsIndexRoute,
  AdminEnterprisesIndexRoute,
  AdminFileChecklistIndexRoute,
  AdminMyAssignationsIndexRoute,
  AdminAssignationsEditIdRoute,
  AdminCredentialsProfilesIdRoute,
  AdminCredentialsProfilesCreateRoute,
  AdminCredentialsUsersIdRoute,
  AdminCredentialsUsersCreateRoute,
  AdminEnterprisesEditIdRoute,
  AdminFileChecklistEditIdRoute,
  AdminCredentialsProfilesIndexRoute,
  AdminCredentialsUsersIndexRoute,
  AdminCredentialsProfilesEditIdRoute,
  AdminCredentialsUsersEditIdRoute,
])

/* prettier-ignore-end */
