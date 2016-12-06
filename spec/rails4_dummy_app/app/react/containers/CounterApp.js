import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from 'components/Counter';
import * as CounterActions from 'actions';

export default connect(
  state => ({
    counter: state.counter,
  }),
  dispatch => bindActionCreators(CounterActions, dispatch),
)(Counter);
