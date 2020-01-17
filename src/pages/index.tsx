import React, { memo, useCallback } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';

import { connect } from 'dva';
import { IGlobalState, IUmiComponent } from '@/interfaces';
import { FormComponentProps } from 'antd/es/form';
import './index.less';
import { loginAsync } from '@/actions/authActions';
import Auth from '@/components/Auth';

const mapStateToProps = ({ auth }: IGlobalState) => ({
  auth,
});

type AuthStateProps = ReturnType<typeof mapStateToProps>;

interface IAppProps extends IUmiComponent, FormComponentProps, AuthStateProps {}

const App: React.FunctionComponent<IAppProps> = ({ form, dispatch }) => {
  // form manipulation
  const { getFieldDecorator, validateFields, resetFields } = form;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    e => {
      e.preventDefault();
      validateFields(async (error, values) => {
        if (!error) {
          // collect data
          const { email, password } = values;
          dispatch(loginAsync({ email, password }));
          resetFields();
        } else {
          console.log(`validation failed`);
          console.error(error);
        }
      });
    },
    [validateFields],
  );
  return (
    <div className={'login'}>
      <Auth dispatch={dispatch} />
      <section className={`login-content`}>
        <h2>Login</h2>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email Address"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              LOG IN
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

const WrappedApp = Form.create({ name: 'normal_login' })(App);
export default memo(connect(mapStateToProps)(WrappedApp));
