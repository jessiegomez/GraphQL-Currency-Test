import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from "react-apollo";
import gql from 'graphql-tag';

const ExchangeRates = () => (
  <Query
          query={gql`
            {
            rates(currency: "USD") {
                    currency
                    rate
                  }
                }
              `}
                >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p> Error </p>;

              return data.rates.map(({ currency, rate }) => (
                <div key={currency}>
                  <p>{`${currency}: ${rate}`}</p>
                </div>
            ));
          }}
    </Query>
);

class App extends Component {
  render() {

    const client = new ApolloClient({ uri: "https://w5xlvm3vzz.lp.gql.zone/graphql" });
   
    return (
      <ApolloProvider client={client}>
        <ExchangeRates />
      </ApolloProvider >
    );
  }
}

export default App;
