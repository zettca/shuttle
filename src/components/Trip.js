import React from 'react';
import { isPastTrip } from '../helpers';

class Trip extends React.PureComponent {
  render() {
    const { stations, isCurrent } = this.props;
    const ignoreStations = ['Praça de Londres', 'Sete-Rios'];

    // find past trips
    const time = stations[0].hour.replace(/\./g, ':');
    const isDone = isPastTrip(time.split(':').map(i => Number(i)));

    // create trip-stops string
    const filteredStations = stations
      .filter(st => ignoreStations.indexOf(st.station) === -1)
      .map(st => st.station)
      .join(' > ')
      .replace(/Taguspark/g, 'Tagus');

    return (
      <div className={`card${isDone && isCurrent ? ' done' : ''}`}>
        <span className={'entry'}>
          <strong>{time}</strong> {filteredStations}
        </span>
      </div>
    );
  }
}

export default Trip;
