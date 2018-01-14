import React from 'react';
import { Grid } from 'semantic-ui-react';
import CoinRequester from './CoinRequester';
import CoinListDisplayer from './CoinListDisplayer';
import { getCoin } from '../utils/coinGenerator';
import Coin from '../../lib/Coin';
import { params } from '../config';

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
    };
  }

  handleCoinSubmit = (value) => {
    const [sk, pk] = Coin.keygen(params);
    const coin = getCoin(pk, value);
    this.setState(prevState => ({
      coins: prevState.coins.concat([{ sk, coin }]),
    }));
  };

  render() {
    return (
      <Grid>
        <Grid.Row centered={true}>
          <CoinRequester handleCoinSubmit={this.handleCoinSubmit} />
        </Grid.Row>

        <Grid.Row centered={true}>
          <CoinListDisplayer coins={this.state.coins} />
        </Grid.Row>
      </Grid>
    );
  }
}

export default MainView;
