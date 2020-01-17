import React, { useEffect, memo } from 'react';
import store from 'store';
import router from 'umi/router';
import withRouter from 'umi/withRouter';
import { IUmiComponent } from '@/interfaces';
import { ACCESS_TOKEN } from '@/util/constant';

interface IAuthProps extends IUmiComponent {}

export default memo(
  withRouter<IAuthProps, React.ComponentType<IAuthProps>>(({ location }) => {
    useEffect(() => {
      const publicList = ['/'];
      if (publicList.indexOf(location.pathname) > -1) {
        return;
      }
      const accessToken = store.get(ACCESS_TOKEN);

      if (accessToken) {
        router.push(`/devices`);
      } else {
        router.push(`/`);
      }
    }, []);
    return null;
  }),
);
