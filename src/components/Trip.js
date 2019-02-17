import React from 'react';

class Trip extends React.PureComponent {
  render() {
    const { stations } = this.props;
    const d = new Date(2019, 1, 18, 16, 20, 20); // TODO: fix this

    const time = stations[0].hour.replace(/\./g, ':');

    const ignoreStations = ['Praça de Londres', 'Sete-Rios'];
    const filteredStations = stations.filter(st => ignoreStations.indexOf(st.station) === -1);

    const t = time.split(':').map(i => Number(i));
    const done = d.getHours() > t[0] || (d.getHours() === t[0] && d.getMinutes() >= t[1]);

    return (
      <div className={`card${done ? ' done' : ''}`}>
        {
          //<h3>{stations[0].station} ⟶ {stations[stations.length - 1].station}</h3>}
        }
        {filteredStations.map((st, i) => (
          <span key={i} className={'entry'}>
            <strong>{st.hour.replace(/\./g, ':')}</strong> {st.station}
          </span>
        ))}
      </div>
    );
  }
}

export default Trip;
