import { HOC } from '../types';
import { asBigList, BigListConfig } from './asBigList';

const withBigListConfig = (config: BigListConfig<any>) => {
  return function createBigList(WrappedComponent: HOC<any, any>) {
    return asBigList(WrappedComponent, config);
  };
};

export default withBigListConfig;
