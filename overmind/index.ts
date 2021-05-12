import {IConfig, IOnInitialize, IAction, IOperator} from 'overmind';
import {createHook} from 'overmind-react';
import {namespaced} from 'overmind/config';
import * as Example from './Example';

export const config = namespaced({
  Example,
});

export interface Config
  extends IConfig<{
    state: typeof config.state;
    actions: typeof config.actions;
  }> { }

export interface OnInitialize extends IOnInitialize<Config> { }

export interface Action<Input = void, Output = void>
  extends IAction<Config, Input, Output> { }

export interface AsyncAction<Input = void, Output = void>
  extends IAction<Config, Input, Promise<Output>> { }

export interface Operator<Input = void, Output = Input>
  extends IOperator<Config, Input, Output> { }

export const useOvermind = createHook<typeof config>();
