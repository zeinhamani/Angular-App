// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  SERVER_URL:'http://localhost:8000',
  AUTH_URL: 'http://localhost:8000/api/login',
  USERS_URL: 'http://localhost:8000/api/users',
  HABITATS_URL: 'http://localhost:8000/api/habitats',
  RESERVATIONS_URL: 'http://localhost:8000/api/reservations',
  CATEGORIES_URL: 'http://localhost:8000/api/categories',
  DESTINATIONS_URL: 'http://localhost:8000/api/destinations',
  COMENTAIRES_URL: 'http://localhost:8000/api/commentaires',
  SERVICES_URL: 'http://localhost:8000/api/services',
  EQUIPEMENTS_URL: 'http://localhost:8000/api/equipements',
  MEDIAS_URL: 'http://localhost:8000/api/media',
  NOTIF_URL: 'http://localhost:8000/api/notifications'


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
