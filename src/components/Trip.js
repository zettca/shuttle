import React from 'react';

class Trip extends React.PureComponent {
  render() {
    const { stations, useFilter, isDone } = this.props;
    const ignoreStations = ['Praça de Londres', 'Sete-Rios'];
    const time = stations[0].hour.replace(/\./g, ':');

    // create trip-stops string
    const filteredStations = stations
      .filter(st => ignoreStations.indexOf(st.station) === -1)
      .map(st => st.station)
      .join(' > ')
      .replace(/Taguspark/g, 'Tagus');

    return (
      <div className={`card${isDone && useFilter ? ' done' : ''}`}>
        <span className={'entry'}>
          <strong>{time}</strong> {filteredStations}
        </span>
      </div>
    );
  }
}

export default Trip;
