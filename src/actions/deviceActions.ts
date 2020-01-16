import { actionCreatorFactory } from 'dva-model-creator';
import { IDevice } from '@/interfaces';

const deviceActionCreator = actionCreatorFactory('device');

// sync action creators
export const setDevices = deviceActionCreator<{ devices: IDevice[] }>('setDevices');
