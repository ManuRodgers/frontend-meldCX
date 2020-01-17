import { DvaModelBuilder } from 'dva-model-creator';
import { IGlobalState } from '@/interfaces';
import { loginAsync, notifyAsync } from '@/actions/authActions';
import { Redirect, router } from 'umi';
import store from 'store';
import { notification, message } from 'antd';
import { reqLogin, reqNotify } from '@/api';
import { ACCESS_TOKEN } from '@/util/constant';

const initState: IGlobalState['auth'] = {
  accessToken: '',
};
const authBuilder = new DvaModelBuilder(initState, 'auth')
  .takeEvery(loginAsync, function*({ email, password }, { select, put }) {
    try {
      const res = yield reqLogin({ email, password });
      if (res) {
        yield store.set(ACCESS_TOKEN, res);
        yield router.push('/devices');
        yield message.success('login successfully');
      }
    } catch (error) {
      console.error(error);
    }
  })
  .takeEvery(notifyAsync, function*({ name, email, repoUrl, message }, { select, put }) {
    try {
      const res = yield reqNotify({ name, email, repoUrl, message });
      console.log(`res`, res);
      if (res) {
        notification.success({ message: res });
      }
    } catch (error) {
      console.error(error);
    }
  });

export default authBuilder.build();
