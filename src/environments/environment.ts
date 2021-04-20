/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const environment = {
  production: false,
  BASE_API_URL: 'https://localhost:5001/api/',
  LOCAL_STORAGE_ADMINISTRADOR : 'Admin',
  VERIFIFICAR_FORM_INVALIDO : 'Elementos inválidos en el formulario, verifique',
  LOCALE_STRING_DATEPICKER : 'es',
  IMAGEN_LOG: 'assets/operaciones/icons8-services-80.png',
  FORM_LIST_PRODUCTS: '/products',
  FORM_LIST_PROVIDERS: '/provider',
  FORM_LIST_PROFILES: '/profile',
  FORM_LIST_BRANDS: '/brands',
  FORM_LIST_LINES: '/lines',
  FORM_LIST_VARIETIES: '/varieties',
  FORM_LIST_CATEGORIES: '/categories',
  FORM_LIST_FAMILIES: '/families',
  FORM_LIST_USERS: '/users',
  FORM_LIST_MOVEMENTTYPES: '/movementtypes',
  FORM_LIST_UNITS: '/units',
  FORM_LIST_DEPOTS: '/depots',
  FORM_LIST_MOVEMENTS: '/movements',
  FORM_LIST_STATEOFDOCUMENTS: '/stateofdocuments',
  FORM_LIST_STATEOFACTORS: '/stateofactors',
  FORM_LIST_OFFICES: '/offices',
  FORM_LIST_TYPEOFACTORS: '/typeofactors',
  FORM_LIST_TYPEOFDOCUMENTS: '/typeofdocuments',
  DOMAIN_NAME_PRODUCTS: 'PRODUCTS',
  DOMAIN_NAME_PROVIDER: 'PROVIDER',
  DOMAIN_NAME_PROFILE: 'PROFILE',
  DOMAIN_NAME_BRANDS: 'BRANDS',
  DOMAIN_NAME_LINES: 'LINES',
  DOMAIN_NAME_VARIETIES: 'VARIETIES',
  DOMAIN_NAME_CATEGORIES: 'CATEGORIES',
  DOMAIN_NAME_FAMILIES: 'FAMILIES',
  DOMAIN_NAME_USERS: 'USERS',
  DOMAIN_NAME_MOVEMENTTYPES: 'MOVEMENTTYPE',
  DOMAIN_NAME_UNITS: 'UNITS',
  DOMAIN_NAME_DEPOTS: 'DEPOTS',
  DOMAIN_NAME_MOVEMENTS: 'MOVEMENTS',
  DOMAIN_NAME_STATEOFDOCUMENTS: 'STATEOFDOCUMENTS',
  DOMAIN_NAME_STATEOFACTORS: 'STATEOFACTORS',
  DOMAIN_NAME_OFFICES: 'OFFICES',
  DOMAIN_NAME_TYPEOFACTORS: 'TYPEOFACTORS',
  DOMAIN_NAME_TYPEOFDOCUMENTS: 'TYPEOFDOCUMENTS',
  FORM_CRUD_PROVIDER: '/provider',
  FORM_CRUD_PROFILE: '/profile',
  FORM_CRUD_PRODUCT: '/products',
  FORM_CRUD_BRAND: '/brands',
  FORM_CRUD_LINE: '/lines',
  FORM_CRUD_VARIETY: '/varieties',
  FORM_CRUD_CATEGORY: '/categories',
  FORM_CRUD_FAMILY: '/families',
  FORM_CRUD_USER: '/users',
  FORM_CRUD_MOVEMENTTYPE: '/movementtypes',
  FORM_CRUD_UNIT: '/units',
  FORM_CRUD_DEPOT: '/depots',
  FORM_CRUD_MOVEMENT: '/movements',
  FORM_CRUD_STATEOFDOCUMENT: '/stateofdocuments',
  FORM_CRUD_STATEOFACTORS: '/stateofactors',
  FORM_CRUD_OFFICES: '/offices',
  FORM_CRUD_TYPEOFACTORS: '/typeofactors',
  FORM_CRUD_TYPEOFDOCUMENTS: '/typeofdocuments',
  RUTA_HOME : '/',
  PAGINA_INICIAL: 0,
  MODO_UPDATE : 'UPD',
  MODO_CREATE : 'INS',
  MODO_DISPLAY : 'DSP',
  MODO_DELETE : 'DEL',
  END_POINT_MOVEMENT: 'movements',
  END_POINT_PRODUCTS: 'product',
  END_POINT_USERS: 'users',
  END_POINT_PROVIDER: 'provider',
  END_POINT_PROFILE: 'profile',
  END_POINT_PRODUCT: 'products',
  END_POINT_BRANDS: 'brands',
  END_POINT_LINES: 'lines',
  END_POINT_VARIETIES: 'varieties',
  END_POINT_CATEGORIES: 'categories',
  END_POINT_FAMILIES: 'families',
  END_POINT_UNITS: 'units',
  END_POINT_MOVEMENTTYPES: 'movementtypes',
  END_POINT_ADMINISTRADOR: 'administrator',
  END_POINT_STATEOFDOCUMENTS: 'stateofdocuments',
  END_POINT_DEPOTS: 'depots',
  END_POINT_STATEOFACTORS: 'stateofactors',
  END_POINT_OFFICES: 'offices',
  END_POINT_TYPEOFACTORS: 'typeofactors',
  END_POINT_TYPEOFDOCUMENTS: 'typeofdocuments',
  RUTA_LOGIN: '/login',
  END_POINT_LOGIN: 'login',
  BARRA_DE_PATH : '/',
  AUTH : 'auth',
  TITLE_FORM_DELETE: 'DELETE',
  TITLE_FORM_UPDATE: 'UPDATE',
  TITLE_FORM_DISPLAY: 'DISPLAY',
  TITLE_FORM_CREATE: 'CREATE',
  MENSAJE_ERROR_SERVIDOR_GENERICO : 'No se puede conectar con el servidor',
  IMAGEN_LOADER: 'loading4.gif',
  IMAGEN_ERROR_SERVIDOR: 'oops.jpg',
  UPLOAD_FILE: 'assets/operaciones/icons8-upload-to-the-cloud-144.png',
  MENSAJE_SIN_PUNTO_TURISTICO: '(Sin Punto Turístico)',
  MENSAJE_CONFIRMAR_ELIMINAR_FOTO : '¿Confirma eliminar la imagen?',
  MENSAJE_ERROR_AL_SUBIR_IMAGEN: 'Error al subir la imagen',
  REGION_POR_DEFECTO: {id: 1, nombre: ''},
  SEPARADOR_DE_CATEGORIAS_CONSULTA: ',',
  IMAGEN_EDITAR : 'assets/operaciones/icons8-edit-property-80.png',
  IMAGEN_VISUALIZAR: 'assets/operaciones/icons8-view-80.png',
  IMAGEN_ELIMINAR: 'assets/operaciones/icons8-delete-bin-96.png',
  IMAGEN_CREAR: 'assets/operaciones/icons8-plus-80.png',
  FORMULARIO_LISTA_ADMINISTRADORES: '/lista-administrador',
  PARAMETRO_RUTEO_ID: 'id',
  PARAMETRO_RUTEO_GUID: 'guid',
  PARAMETRO_RUTEO_MODO: 'mode',
  PARAMETRO_RUTEO_TAB: 'tab',
  NOMBRE_DOMINIO_ADMINISTRADOR : 'Administrador',
  CANTIDAD_DE_REGISTROS_POR_PAGINA : 5,
  ETIQUETA_CHECK_IN : 'Check In',
  ETIQUETA_CHECK_OUT : 'Check Out',
  PATH_RELATIVO: '~/',
  EMPTY_QUERY: '',
  PRODUCTS_MODAL_CATEGORY_FILTER: 'PRODUCT_MODAL_CATEGORY_FILTER',
  PRODUCTS_MODAL_BRAND_FILTER: 'PRODUCTS_MODAL_BRAND_FILTER',
  PRODUCTS_MODAL_FAMILY_FILTER: 'PRODUCTS_MODAL_FAMILY_FILTER',
  PRODUCTS_MODAL_LINE_FILTER: 'PRODUCTS_MODAL_LINE_FILTER',
  PRODUCTS_MODAL_VARIETY_FILTER: 'PRODUCTS_MODAL_VARIETY_FILTER',
  PRODUCTS_MODAL_USE_STOCK_FILTER: 'PRODUCTS_MODAL_USE_STOCK_FILTER',
  PRODUCTS_MODAL_PRODUCT_OR_SERVICE_FILTER: 'PRODUCTS_MODAL_PRODUCT_OR_SERVICE_FILTER'
};
