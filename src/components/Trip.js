import React from 'react';

class Trip extends React.PureComponent {
  render() {
    const { stations } = this.props;
    const d = new Date();

    const time = stations[0].hour.replace(/\./g, ':');

    const ignoreStations = ['Praça de Londres', 'Sete-Rios'];
    const filteredStations = stations
      .filter(st => ignoreStations.indexOf(st.station) === -1)
      .map(st => st.station);

    const t = time.split(':').map(i => Number(i));
    const done = d.getHours() > t[0] || (d.getHours() === t[0] && d.getMinutes() >= t[1]);

    return (
      <div className={`card${done ? ' done' : ''}`}>
        <span className={'entry'}>
          <strong>{time}</strong> {filteredStations.join(' > ')}
        </span>
      </div>
    );
  }
}

export default Trip;
