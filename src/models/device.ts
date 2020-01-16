import { DvaModelBuilder } from 'dva-model-creator';
import { IGlobalState, IDevice } from '@/interfaces';
import { setDevices } from '@/actions/deviceActions';
import { message } from 'antd';

const initState: IGlobalState['device'] = {
  devices: [],
};
const deviceBuilder = new DvaModelBuilder(initState, 'device').case(
  setDevices,
  (state, { devices }) => ({ ...state, devices }),
);

export default deviceBuilder.build();
