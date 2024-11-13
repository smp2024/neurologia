/* eslint-disable @typescript-eslint/naming-convention */
export interface InfoAdviser {
  user_name?: string;
  user_Photo?: string;
  ventas_monto_unidades?: number;
  ventas_monto_vendidas?: string;
  ventas_unidad_meta?: string;
  ventas_monto_meta?: string;
  events?: [];
  nombre?: string;
  correo_electronico?: string;
  desarrollo?: string;
  telefono1?: string;
  status?: string;
  etapa?: string;
  name?: string;
  fecha?: string;
  direccion?: string;
  cliente?: string;
  cuentaId?: string;
  mensaje?: [];
}

export interface addEvent {
  clienteid?: string;
  fecha?: string;
  tipoevento?: string;
  ubicacion?: string;
  hora?: string;
  minutos?: string;
  recordatorio1?: string;
  recordatorio2?: string;
  cuenta?: string;
  user?: string;
}

export interface loginData {
  Ok?: string;
  user_id?: string;
  cuenta_id?: string;
  cuenta_logo?: string;
}

export interface clientList {
  clientList?: [];
  nombre?: string;
  correo_electronico?: string;
  desarrollo?: string;
  telefono1?: string;
  status?: string;
  etapa?: string;
  comentarios?: string;
  linea_contacto?: string;
  User?: string;
  id?: string;
  last_edit?: string;
  desarollo?: string;
}

export interface clientView {
  nombre?: string;
  correo_electronico?: string;
  telefono?: string;
  forma_contacto?: string;
  tipo_cliente?: string;
  status1?: string;
  status2?: string;
  progreso_cliente?: string;
  seguimiento_rapido?: [];
  mensaje?: string;
  asesor?: string;
  fecha?: string;
}

export interface recoverPassword {
  message?: string;
  usuario?: [];
  flag?: string;
}
export interface developments {
  desarrollos?: string;
  developments?: string;
  desarrollo?: string;
  cuentaId?: string;
  nombre?: string;
  email?: string;
  telefono?: string;
  inmueble?: string;
  cuenta?: string;
  etapa?: string;
  user?: string;
  contacto?: string;
  evento?: string;
  hora?: string;
  fecha?: string;
}
export interface events {
  id?: string;
  titulo?: string;
  fecha_inicio?: string;
  color?: string;
  icon?: string;
  url?: string;
  fecha_inicio_format?: string;
  tipo_tarea?: string;
  ubicacion?: string;
  id_evento?: string;
  hora?: string;
  nombre_evento?: string;
  textColor?: string;
}
export interface inmuebles {
  nombre?: string;
  etapa?: string;
  metros?: string;
  id?: string;
  portada?: string;
  recamaras?: string;
  banios?: string;
  estacionamiento?: string;
}
