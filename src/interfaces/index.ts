import { Dispatch } from 'dva';
import { RouterTypes } from 'umi';

export interface IUmiComponent extends RouterTypes<{}, { id: string }> {
  dispatch: Dispatch;
}

export interface IGlobalState {
  device: IDeviceModel;
}

export interface IDeviceModel {
  devices: IDevice[];
}

export interface IDevice {
  id: number;
  name: string;
}
export interface IDeviceSatellite {
  elt: HTMLElement | null;
  a: number; // in radian
  r: number; // radius
  da: number; // in radian
  x: number;
  y: number;
  // Center is actualy center (100, 100) minus
  // half the size of the orbiting object 15x15
  center: { x: number; y: number };
  move: Function;
}
