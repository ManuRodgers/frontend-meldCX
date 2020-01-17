import { actionCreatorFactory } from 'dva-model-creator';
import { LoginDto } from '@/dto/login.dto';
import { NotifyDto } from '@/dto/notify.dto';

const authActionCreator = actionCreatorFactory('auth');

// async action creators
export const loginAsync = authActionCreator<LoginDto>('loginAsync');
export const notifyAsync = authActionCreator<NotifyDto>('notifyAsync');
