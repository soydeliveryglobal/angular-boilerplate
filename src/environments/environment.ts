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
  LOCAL_STORAGE_ADMINISTRADOR : "Admin",
  VERIFIFICAR_FORM_INVALIDO : "Elementos inválidos en el formulario, verifique",
  LOCALE_STRING_DATEPICKER : "es",
  IMAGEN_LOG: 'assets/operaciones/icons8-services-80.png',
  FORMULARIO_LISTA_TARIFAS: '/tarifa',
  DOMAIN_NAME_TARIFA: "TARIFA",
  FORMULARIO_CRUD_DEL_TARIFA: "/tarifa",
  FORMULARIO_CRUD_DEL_PROVIDER: "/provider",
  RUTA_HOME : "/",
  PAGINA_INICIAL: 0,
  MODO_UPDATE : 'UPD',
  MODO_CREATE : 'INS',
  MODO_DISPLAY : 'DSP',
  MODO_DELETE : 'DEL',
  END_POINT_PROVIDER: "provider",
  END_POINT_TARIFAS:"tarifa",
  END_POINT_ADMINISTRADOR: "administradores",
  RUTA_LOGIN:"/login",
  END_POINT_LOGIN: "login",
  BARRA_DE_PATH : '/',
  AUTH : 'auth',
  TITLE_FORM_DELETE:'DELETE',
  TITLE_FORM_UPDATE:'UPDATE',
  TITLE_FORM_DISPLAY:'DISPLAY',
  TITLE_FORM_CREATE:'CREATE',
  MENSAJE_ERROR_SERVIDOR_GENERICO :"No se puede conectar con el servidor",
  IMAGEN_LOADER: "loading4.gif",
  IMAGEN_ERROR_SERVIDOR: "oops.jpg",
  UPLOAD_FILE: "assets/operaciones/icons8-upload-to-the-cloud-144.png",
  MENSAJE_SIN_PUNTO_TURISTICO: "(Sin Punto Turístico)",
  MENSAJE_CONFIRMAR_ELIMINAR_FOTO :"¿Confirma eliminar la imagen?",
  MENSAJE_ERROR_AL_SUBIR_IMAGEN:'Error al subir la imagen',
  REGION_POR_DEFECTO: {id:1, nombre:""},
  SEPARADOR_DE_CATEGORIAS_CONSULTA: ",",
  FORM_CRUD_MI_ABM:'/miabm',
  IMAGEN_EDITAR : "assets/operaciones/icons8-edit-property-80.png",
  IMAGEN_VISUALIZAR: "assets/operaciones/icons8-view-80.png",
  IMAGEN_ELIMINAR: "assets/operaciones/icons8-delete-bin-96.png",
  IMAGEN_CREAR: "assets/operaciones/icons8-plus-80.png",
  FORMULARIO_LISTA_ADMINISTRADORES:'/lista-administrador',
  PARAMETRO_RUTEO_ID: "id",
  PARAMETRO_RUTEO_MODO: "mode",
  PARAMETRO_RUTEO_TAB: "tab",
  NOMBRE_DOMINIO_ADMINISTRADOR : 'Administrador',
  CANTIDAD_DE_REGISTROS_POR_PAGINA : 5,
  ETIQUETA_CHECK_IN : "Check In",
  ETIQUETA_CHECK_OUT : "Check Out",
  PATH_RELATIVO: "~/",
};
